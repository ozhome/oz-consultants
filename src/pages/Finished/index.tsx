import React, { useRef, useCallback, useState, useMemo } from 'react';
import QRCode from 'react-qr-code';
import ReactLoading from 'react-loading';
import { FiCreditCard } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/StoreHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import IParamsOrder, { ICard } from '../../DTOS/IParamsOrder';

import { useInventory } from '../../hooks/inventory';
import { useToast } from '../../hooks/toast';
import { useCart } from '../../hooks/cart';
import { useStore } from '../../hooks/store';

import getValidationErrors from '../../utils/getValidationErrors';
import formatReal from '../../utils/formatReal';

import { Container, Modal, Content, Section, ContainerQRCoe } from './style';
import api from '../../services/api';

type IFormCard = Omit<ICard, 'card_expiration_date'> & {
  card_month: number;
  card_year: number;
};

interface IFinished {
  loading: boolean;
  finished: boolean;
}

const Finished: React.FC = () => {
  const infoForm = useRef<FormHandles>(null);
  const { categories, selectedCategory } = useInventory();
  const { store } = useStore();
  const { user, clearCart } = useCart();
  const { push } = useHistory();
  const { addToast } = useToast();
  const [pix, setPix] = useState('');
  const [finished, setFinished] = useState<IFinished>({
    finished: false,
    loading: false,
  });

  const updateCateg = (id: number) => {
    selectedCategory(id);
    push('/subcategories');
  };

  const sendWhats = useCallback(() => {
    const hello = `Olá, *${store.name}*!`;
    const describe = `Acabei de visitar seu catálogo e realizei o seguinte pedido:`;

    const list = user.products.reduce((acc: string, cur) => {
      const product = `*${cur.qty}${cur.to_weight ? 'g ' : ''}x* - ${
        cur.name
      };`;

      const price = `${formatReal(cur.price)} - ${
        cur.to_weight ? 'por kg' : 'a unidade.'
      }`;

      return `${acc}${product}\n${price}`;
    }, '');

    const amountText = `*Total: ${formatReal(user.amount / 100)}*`;

    const { client } = user;

    const infos = `Segue meus dados para a compra:
Nome: ${client.name}
Telefone: ${client.phone}
E-mail: ${client.email}
CPF: ${client.cpf}
Endereço: ${client.street}, ${client.street_number}, ${client.neighborhood}, ${client.city}, ${client.state} - ${client.zipcode}`;

    const finish = `Aguardo sua confirmação.`;

    const text = encodeURI(
      `${hello} ${describe}\n\n${list}\n${amountText}\n\n${infos}\n\n${finish}`,
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${store.phone}&text=${text}`,
    );

    clearCart();
    push(`store/${store.document.replace(/\D/g, '')}`);
  }, [clearCart, push, store.document, store.name, store.phone, user]);

  const sendOrder = useCallback(
    async (data: IParamsOrder) => {
      setFinished({
        finished: false,
        loading: true,
      });
      try {
        if (data.payment_type === 'pix') {
          const response = await api.post(
            '/consultant-orders/create/pix',
            data,
          );
          const metadata = JSON.parse(response.data.metadata);
          setPix(metadata.pix);
          addToast({
            title: 'Pix Gerado',
            description:
              'Finalize o pagamento, após o pagamento o vendendor irá entrar em contato',
            type: 'success',
          });
        } else {
          await api.post('/consultant-orders/create', data);
          addToast({
            title: 'Pedido finalizado',
            description:
              'O consultor irá entrar em contato para finalizar o pedido',
            type: 'success',
          });
        }
        setFinished({
          finished: true,
          loading: false,
        });
      } catch (e) {
        setFinished({
          finished: false,
          loading: false,
        });
        addToast({
          title: 'Erro ao finalizar o pedido',
          description: 'Por favor tente novamente mais tarde.',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  const handleSubmit = useCallback(
    async (data: IFormCard) => {
      try {
        infoForm.current?.setErrors({});

        const schema = Yup.object().shape({
          card_number: Yup.string()
            .length(16)
            .required('Número do cartão é obrigatório'),
          card_holder_name: Yup.string().required('Nome é obrigatório'),
          card_month: Yup.number()
            .min(1)
            .max(12)
            .required('Mês de validade é obrigatório'),
          card_year: Yup.number()
            .min(21)
            .max(99)
            .required('Ano de validade é obrigatório'),
          card_cvv: Yup.string().required('CVV é obrigatório').min(3).max(4),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await sendOrder({
          ...user,
          card: {
            ...data,
            card_expiration_date: `${String(data.card_month).padStart(2, '0')}${
              data.card_year
            }`,
          },
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          infoForm.current?.setErrors(errors);
        } else
          addToast({
            title: 'Erro inesperado',
            description: 'Por favor tente novamente mais tarde.',
            type: 'error',
          });
      }
    },
    [addToast, sendOrder, user],
  );

  const copyPix = useCallback(() => {
    try {
      navigator.clipboard.writeText(pix);
      addToast({
        type: 'success',
        title: 'Link copiado',
      });
    } catch {
      // TODO
    }
  }, [addToast, pix]);

  const hiddenButton = useMemo(() => finished.loading || finished.finished, [
    finished,
  ]);

  const formFinished = useMemo(() => {
    if (user.payment_type === 'credit')
      return (
        <>
          <h2>Informações para pagamento</h2>
          <Form ref={infoForm} onSubmit={handleSubmit}>
            <Section>
              <h3>Informações do cartão</h3>
              <p>
                O pedido será enviado para o consultor, ele irá entrar em
                contato para a entrega
              </p>
              <br />
              <Input
                name="card_number"
                icon={FiCreditCard}
                placeholder="5555 5555 5555 5555"
              />
              <Input
                name="card_holder_name"
                icon={FiCreditCard}
                placeholder="Nome que está no cartão"
              />
              <div className="row">
                <Input
                  className="input"
                  name="card_month"
                  type="number"
                  icon={FiCreditCard}
                  placeholder="MM"
                  min={1}
                  max={12}
                  step={1}
                />
                <Input
                  className="input"
                  type="number"
                  name="card_year"
                  placeholder="YY"
                  min={21}
                  max={99}
                  step={1}
                />
              </div>
              <Input
                name="card_cvv"
                icon={FiCreditCard}
                placeholder="CVV"
                type="number"
                min={0}
                max={999}
                step={1}
              />

              {!hiddenButton && <Button type="submit">Finalizar pedido</Button>}
            </Section>
          </Form>
        </>
      );
    return (
      <Section>
        <h2>Informações para pagamento</h2>
        <h3>Avisos</h3>
        <div>
          <p>
            O pedido será enviado para o consultor, ele irá aguardar a
            confirmação do pagamento via Pix e irá entrar em contato.
          </p>
          <br />
          <p>Será gerado um QR Code e a opção de Copiar</p>
          <br />
          <p>
            Caso perca o QR Code, entre em contato com o Consultor para mais
            informações.
          </p>
        </div>
        <br />
        {!hiddenButton && (
          <Button type="button" onClick={() => sendOrder(user)}>
            Finalizar pedido
          </Button>
        )}
      </Section>
    );
  }, [handleSubmit, hiddenButton, sendOrder, user]);

  return (
    <Container>
      <Modal display={finished.loading ? 'block' : 'none'}>
        <div className="content">
          <ReactLoading
            type="bubbles"
            color="#f9a72b"
            height="50%"
            width="20%"
          />
        </div>
      </Modal>
      <Header back>
        <section>
          <h3>Categorias</h3>
          <div>
            {categories
              .filter(item => !item.parent_id && item.idOdoo !== 25)
              .map(item => (
                <button
                  className="inative"
                  key={item.id}
                  type="button"
                  onClick={() => updateCateg(item.idOdoo)}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </section>
        <hr />
      </Header>
      <hr />
      <Content>
        {finished.finished ? (
          <Section>
            <h3>Confirmação do pedido</h3>
            <div>
              <p>O pedido foi enviado para o consultor.</p>
              <br />
              <p>Vamos confirmar o pedido no Whatsapp?</p>

              {!!pix && (
                <ContainerQRCoe>
                  <p>
                    Caso perca o QR Code, entre em contato com o Consultor para
                    recuperar.
                  </p>
                  <br />
                  <QRCode value={pix} />
                  <Button type="button" onClick={copyPix}>
                    Copiar Pix
                  </Button>
                </ContainerQRCoe>
              )}

              <Button type="button" onClick={sendWhats}>
                Confirmar pedido no Whatsapp
              </Button>
            </div>
          </Section>
        ) : (
          formFinished
        )}
      </Content>
    </Container>
  );
};

export default Finished;

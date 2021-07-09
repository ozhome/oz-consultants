import React, { useRef, useCallback, useState } from 'react';
import { FiMail, FiUser, FiPhone, FiHome } from 'react-icons/fi';
import { BiUserPin } from 'react-icons/bi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/StoreHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import phoneMask from '../../utils/phoneMask';
import cpfMask from '../../utils/cpfMask';

import IParamsClient from '../../DTOS/IParamsClient';

import { Container, Content, Section } from './style';
import { useStore } from '../../hooks/store';

interface IAddress {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  error: boolean;
  empty: boolean;
}

const Payment: React.FC = () => {
  const infoForm = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { categories, selectedCategory } = useInventory();
  const { push } = useHistory();
  const { updateUser, amount, cart } = useCart();
  const { store } = useStore();

  const [type, setType] = useState('');
  const [address, setAddress] = useState<IAddress>({
    error: true,
    empty: true,
    city: '',
    neighborhood: '',
    state: '',
    street: '',
  });

  const updateCateg = (id: number) => {
    selectedCategory(id);
    push('/subcategories');
  };

  const handleSubmit = useCallback(
    async (data: IParamsClient) => {
      try {
        infoForm.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          phone: Yup.string().required('Telefone obrigatório').min(14).max(16),
          cpf: Yup.string().required('CPF obrigatório'),
          zipcode: Yup.string().length(8).required('CEP obrigatório'),
          street_number: Yup.string().required('Informe um número válido'),
          street: Yup.string().required('Informe um endereço válido'),
          neighborhood: Yup.string().required('Informe um endereço válido'),
          city: Yup.string().required('Informe um endereço válido'),
          state: Yup.string().required('Informe um endereço válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!type) throw new Error();

        const products = cart.map(product => ({
          id: product.idOdoo,
          price: product.price,
          qty: product.quantity,
          name: product.name,
          to_weight: product.to_weight,
        }));

        const amountInCents = parseFloat(amount.toFixed(2).replace(/\D/g, ''));

        updateUser({
          id: store.id,
          amount: amountInCents,
          client: {
            ...data,
            phone: data.phone.replace(/\D/g, ''),
          },
          payment_type: type,
          products,
        });

        push('finished');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          infoForm.current?.setErrors(errors);
        } else if (type === '')
          addToast({
            title: 'Pagemento',
            description: 'Selecione um método de pagamento',
            type: 'error',
          });
        else
          addToast({
            title: 'Erro inesperado',
            description: 'Por favor tente novamente mais tarde.',
            type: 'error',
          });
      }
    },
    [addToast, amount, cart, push, store.id, type, updateUser],
  );

  const updateZipCode = useCallback(async (zip: string) => {
    try {
      if (zip.length === 8) {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${zip}/json`,
        );

        if (data.error) throw new Error();

        setAddress({
          error: false,
          empty: false,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        });
      } else {
        throw new Error();
      }
    } catch {
      setAddress({
        error: true,
        empty: false,
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      });
    }
  }, []);

  const updatePayment = useCallback((value: string) => {
    setType(state => (state === value ? '' : value));
  }, []);

  return (
    <Container>
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
        <h2>Finalização do pedido</h2>
        <Form ref={infoForm} onSubmit={handleSubmit}>
          <Section>
            <h3>Dados pessoais</h3>
            <Input name="name" type="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="phone"
              icon={FiPhone}
              placeholder="Telefone"
              maxLength={16}
              type="tel"
              onChange={e => {
                e.target.value = phoneMask(e.target.value);
              }}
            />
            <Input
              name="cpf"
              icon={BiUserPin}
              placeholder="CPF"
              onChange={e => {
                e.target.value = cpfMask(e.target.value);
              }}
            />
          </Section>
          <Section>
            <h3>Endereço de cobrança</h3>
            <Input
              name="zipcode"
              icon={FiHome}
              placeholder="CEP"
              onChange={e => updateZipCode(e.target.value)}
              maxLength={8}
            />
            <Input name="street_number" icon={FiHome} placeholder="Número" />
            <Input
              name="street"
              icon={FiHome}
              placeholder="Rua"
              readOnly
              value={
                typeof address.street === 'undefined' ? '' : address.street
              }
            />
            <Input
              value={
                typeof address.neighborhood === 'undefined'
                  ? ''
                  : address.neighborhood
              }
              name="neighborhood"
              icon={FiHome}
              placeholder="Bairro"
              readOnly
            />
            <Input
              name="city"
              icon={FiHome}
              placeholder="Cidade"
              readOnly
              value={typeof address.city === 'undefined' ? '' : address.city}
            />
            <Input
              name="state"
              icon={FiHome}
              placeholder="Estato"
              readOnly
              value={typeof address.state === 'undefined' ? '' : address.state}
            />
          </Section>

          <Section>
            <h3>Forma de pagamento</h3>
            <Button
              type="button"
              className={type === 'credit' ? 'select' : 'unselect'}
              onClick={() => updatePayment('credit')}
            >
              Cartão de crétido
            </Button>
            <Button
              type="button"
              className={type === 'pix' ? 'select' : 'unselect'}
              onClick={() => updatePayment('pix')}
            >
              Pix
            </Button>
            <Button
              type="button"
              className={type === 'cash' ? 'select' : 'unselect'}
              onClick={() => updatePayment('cash')}
            >
              Dinheiro
            </Button>
          </Section>

          <br />
          <Button type="submit">Próximo</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Payment;

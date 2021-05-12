import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { BiUserPin } from 'react-icons/bi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import cpfMask from '../../utils/cpfMask';
import phoneMask from '../../utils/phoneMask';

import logoImg from '../../assets/images/oz-home.png';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          phone: Yup.string().required('Telefone obrigatório').min(14).max(16),
          cpf: Yup.string().required('CPF obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // api push

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Alguém da equipe entrará em contato.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else if (err?.response?.data?.message)
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: err.response.data.message,
          });
        else
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro inesperado, tente novamente.',
          });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Oz Home" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Seja uma revendedora</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="phone"
              icon={FiPhone}
              placeholder="Telefone"
              maxLength={16}
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

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para pagina inicial
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

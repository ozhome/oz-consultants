import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { BiIdCard } from 'react-icons/bi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/images/logo.png';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  cnpj: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signUp } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cnpj: Yup.string().required('CNPJ obrigatório').length(18),
          password: Yup.string().min(6, 'Mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signUp({ ...data });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no Oz Home!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
      }
    },
    [addToast, history, signUp],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Oz Home" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="cnpj" icon={BiIdCard} placeholder="CNPJ" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

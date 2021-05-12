import React, { useCallback, useRef } from 'react';
import { GoSearch } from 'react-icons/go';
import { SiWhatsapp } from 'react-icons/si';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import go from '../../assets/images/oz-go.png';
import home from '../../assets/images/oz-home.png';

import { Container, Search, Consultants, Consultant, Name } from './styles';

interface IConsultant {
  id: string;
  name: string;
  number: string;
  city: string;
  avatar_url: string;
  type: 'go' | 'home';
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const consultants: IConsultant[] = [
    {
      id: 'first',
      name: 'Maria Clara',
      number: '+55999999999',
      city: 'Curitiba, PR',
      avatar_url:
        'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
      type: 'go',
    },
    {
      id: 'seond',
      name: 'João Paulo',
      number: '+55999999999',
      city: 'Curitiba, PR',
      avatar_url:
        'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
      type: 'home',
    },
  ];

  const handleSubmit = useCallback(() => {
    // console.log('submit');
  }, []);

  return (
    <Container>
      <Header />
      <Search>
        <div>
          <h1>Procure a Oz mais próxima de você</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="search" placeholder="Digite o nome da cidade" />
            <Button>
              <GoSearch size={25} />
            </Button>
          </Form>
        </div>
      </Search>
      <Consultants>
        <h2>Revendedores próximos a você</h2>
        <div>
          {consultants.map(user => (
            <Consultant key={user.id}>
              <img src={user.avatar_url} alt={user.name} />
              <div>
                <Name>
                  <h4>{user.name}</h4>
                  <a href={`https://wa.me/${user.number}`}>
                    <SiWhatsapp size={20} />
                  </a>
                </Name>
                <p>{user.city}</p>
              </div>

              {user.type === 'go' ? (
                <img src={go} alt="Oz GO" />
              ) : (
                <img src={home} alt="Oz Home" />
              )}
            </Consultant>
          ))}
        </div>
      </Consultants>
    </Container>
  );
};

export default Home;

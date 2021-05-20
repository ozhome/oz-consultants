import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { SiWhatsapp } from 'react-icons/si';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import IStore from '../../DTOS/IStore';

import Header from '../../components/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';

import go from '../../assets/images/oz-go.png';
import home from '../../assets/images/oz-home.png';

import { Container, Search, Consultants, Consultant, Name } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [cities, setCities] = useState<string[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);

  const handleSubmit = useCallback(
    async ({ search }: any) => {
      try {
        const { data } = await api.get(
          `/users/consultants/cities/${encodeURI(search)}`,
        );
        if (!data || data.lenght === 0)
          addToast({
            title: 'Não foi encontrado consultores',
          });
        else setStores(data);
      } catch {
        addToast({
          title: 'Erro ao procurar consultores nessa cidade',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await api.get('/users/consultants/cities');
        setCities(data);
      } catch {
        addToast({
          title: 'Um erro inesperado ocorreu, tente novamente mais tarde',
        });
      }
    };

    get();
  }, [addToast]);

  return (
    <Container>
      <Header />
      <Search>
        <div>
          <h1>Procure a Oz mais próxima de você</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select name="search">
              <option value="">Cidades com consultor</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
            <Button type="submit">
              <GoSearch size={25} />
            </Button>
          </Form>
        </div>
      </Search>
      <Consultants>
        <h2>Revendedores próximos a você</h2>
        <div>
          {stores.map(store => (
            <Consultant key={store.id}>
              <div>
                <Name>
                  <h4>{store.name}</h4>
                  <a href={`https://wa.me/${store.phone}`}>
                    <SiWhatsapp size={20} />
                  </a>
                </Name>
                <p>{store.city}</p>
              </div>

              {store.type === 'oz_go' ? (
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

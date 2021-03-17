import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  width: 100vw;
  min-height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);

  position: relative;
  padding: 4rem 0;

  justify-content: center;
`;

export const Content = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem;

  background-color: white;

  position: relative;
  border-radius: 0.7rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 481px) {
    padding: 0.5rem;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.7rem;
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;

  strong {
    font-size: 1.2rem;
    text-align: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2.2rem;
    min-height: 2.2rem;
    background: none;
    border: none;
    font-size: 2rem;
  }
`;

export const Description = styled.div`
  padding: 1.8rem 0;

  @media (max-width: 481px) {
    padding: 1rem 0 1.8rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    width: auto;
    max-width: 48%;
    margin-left: 2rem;
  }

  button:first-child {
    background: #343a40;
    color: white;

    &:hover {
      background: #717478;
    }
  }

  @media (max-width: 481px) {
    justify-content: space-around;

    button {
      margin: 0;
    }
  }
`;

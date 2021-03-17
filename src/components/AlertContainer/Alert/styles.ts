import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  margin: 50px auto 0;
  width: 50%;
  padding: 1rem;
  background-color: white;

  position: relative;
  border-radius: 0.7rem;

  @media (max-width: 769px) {
    width: 90%;
  }

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
  padding: 1rem 0;

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
`;

import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 1rem;
  padding: 0.8rem;

  display: flex;
  flex-direction: column;

  form {
    width: 100%;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;

export const ButtonContainer = styled.div`
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

import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: 18px;
  padding: 15px;
  background-color: #fff;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  font-size: 22px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  width: 90%;
  height: 45px;
  background-color: #f9a72b;
  border: none;
  align-self: center;
  align-content: center;
  justify-content: center;
  border-radius: 16px;
`;

export const ButtonText = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: 500;
`;

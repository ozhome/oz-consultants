import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  width: 100%;

  position: fixed;

  bottom: 0px;
  z-index: 5;
`;

export const Content = styled.button`
  width: 100%;
  height: 100%;
  background-color: #f6b24d;
  border: none;

  padding: 0 40px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.p`
  color: #000;
  font-weight: 700;
  font-size: 20px;
`;

import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;

  position: relative;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 4rem;
  margin-bottom: 20px;

  .image {
    background: none;
    border: none;
  }

  img {
    object-fit: contain;
    height: 130px;
    padding: 10px 0;
  }

  @media (max-width: 481px) {
    padding: 1rem 2rem;
  }
`;

export const Menu = styled.button`
  position: fixed;
  top: 18px;
  left: 16px;
  z-index: 5;
  min-width: 40px;
  height: 40px;
  color: #fff;
  background-color: black;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  & + button {
    left: 64px;
  }

  & + button + button {
    left: 112px;
  }
`;

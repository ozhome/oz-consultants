import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 80px;

  position: relative;
  background-color: #151515;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;

  img {
    object-fit: contain;
    height: 100%;
    padding: 10px 0;
  }

  nav {
    display: flex;
    a {
      text-decoration: none;
      color: #fff;
      font-weight: 500;

      & + a {
        margin-left: 18px;
      }
    }
  }

  @media (max-width: 481px) {
    padding: 1rem 2rem;
  }
`;

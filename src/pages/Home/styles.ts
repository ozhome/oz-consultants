import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Search = styled.main`
  width: 100%;
  margin-top: 80px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    padding: 5rem;
    padding-top: 3rem;
    background-color: #fff;
    border-radius: 16px;

    h1 {
      margin-bottom: 10px;
    }

    form {
      display: flex;
      align-items: center;

      button {
        width: 60px;
        padding: 0;
        margin: 0;
        margin-left: 5px;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 2rem 16px;
    & > div {
      padding: 5rem 16px;
    }
  }
`;

export const Consultants = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h2,
  & > div {
    width: 90%;
  }

  & > div {
    margin-top: 15px;
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    display: grid;
    grid-template-columns: 48% 48%;
    justify-content: space-between;

    @media (max-width: 900px) {
      grid-template-columns: 95%;
    }
  }
`;

export const Consultant = styled.div`
  height: 100px;
  width: 100%;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 16px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  img {
    object-fit: contain;
    height: 100px;
    padding: 10px 0;

    @media (max-width: 480px) {
      height: 70px;
    }
  }
`;

export const Name = styled.div`
  display: flex;
  svg {
    margin-left: 16px;
    color: #000;
    text-decoration: none;
  }
`;

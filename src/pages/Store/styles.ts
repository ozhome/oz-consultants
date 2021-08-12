import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: row;
  padding: 0 20px 50px;

  hr {
    max-width: 100%;
  }
`;

export const Content = styled.div`
  width: 100%;

  position: relative;

  & > div {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-template-rows: 350px;
    grid-row-gap: 40px;
    justify-content: space-around;

    @media (max-width: 1024px) {
      grid-template-columns: 200px 200px 200px;
      grid-template-rows: 250px;
    }

    @media (max-width: 768px) {
      grid-template-columns: 200px 200px;
      grid-template-rows: 250px;
    }

    @media (max-width: 460px) {
      grid-template-columns: 150px 150px;
      grid-template-rows: 200px;
    }
  }

  h3 {
    margin: 20px 10px;
    width: 100%;
    text-align: center;
  }
`;

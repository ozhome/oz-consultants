import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: row;
  padding: 0 20px 50px;
  padding-bottom: 80px;

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
    grid-template-rows: auto;
    grid-row-gap: 40px;
    justify-content: space-around;

    @media (max-width: 1024px) {
      grid-template-columns: 300px 300px;
      grid-template-rows: auto;
    }

    @media (max-width: 768px) {
      grid-template-columns: 300px 300px;
      grid-template-rows: auto;
    }

    @media (max-width: 700px) {
      grid-template-columns: 300px;
      grid-template-rows: auto;
    }
  }

  h3 {
    margin: 20px 10px;
    width: 100%;
    text-align: center;
    white-space: pre-wrap;
  }
`;

export const Categories = styled.nav`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  overflow-x: auto;

  button {
    width: auto;
    padding: 5px 8px;
    border: 2px solid black;
    border-radius: 30px;
    background-color: #fff;
    color: #000;

    &.active {
      background-color: #f9a72b;
    }

    & + button {
      margin-left: 18px;
    }
  }
`;

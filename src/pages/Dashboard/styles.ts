import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.main`
  padding: 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    'chart chart ticket'
    'chart chart amount'
    'chart chart orders';
  grid-template-columns: auto auto 30%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const ChartContainer = styled.div`
  grid-area: chart;

  h3 {
    text-align: center;
    font-weight: 500;
  }
`;

export const Box = styled.div`
  padding: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;

  svg {
    font-size: 4rem;
    margin-right: 16px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    font-size: 1rem;
  }

  &.ticket {
    grid-area: ticket;
    background-color: #f9a72b;
  }

  &.amount {
    grid-area: amount;
    background-color: #00806e;
  }

  &.orders {
    grid-area: orders;
    background-color: #2f4858;
  }
`;

import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin-right: 1rem;
  padding: 0.8rem;

  display: flex;
  flex-direction: column;

  p {
    font-size: 0.8rem;
  }

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;

    &:last-child {
      background: #c53030;
      color: #fff;

      &:hover {
        background: ${shade(0.2, '#c53030')};
      }
    }

    svg {
      margin-right: 0.8rem;
    }
  }
`;

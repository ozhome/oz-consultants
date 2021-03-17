import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.section`
  width: 100%;
  position: relative;

  .title {
    flex-direction: row;

    button {
      margin-left: 1rem;
      border: none;
      background: none;

      &:hover {
        background: none;
        svg {
          background: ${shade(0.2, '#f9a72b')};
        }
      }

      svg {
        font-size: 2rem;
        background: #f9a72b;
        border-radius: 100%;
      }
    }
  }
`;

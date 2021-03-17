import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const SectionContainer = styled.section`
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;

    button {
      margin-left: 1rem;
      border: none;
      background: none;

      svg {
        font-size: 2rem;
        background: #f9a72b;
        border-radius: 100%;
      }
    }
  }
`;

export const ManagerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;

  overflow-x: auto;
  overflow-y: hidden;
`;

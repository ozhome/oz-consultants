import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  display: none;
  overflow: hidden;
  outline: 0;
  padding-bottom: 2rem;

  &.active {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

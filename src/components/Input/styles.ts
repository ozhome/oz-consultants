import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  flex-direction: row;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #f9a72b;
      color: #f9a72b;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #f9a72b;
    `}

  input {
    flex-grow: 1;
    color: #000;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    min-width: 20px;
    min-height: 20px;
  }

  @media (max-width: 481px) {
    input {
      width: 80%;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

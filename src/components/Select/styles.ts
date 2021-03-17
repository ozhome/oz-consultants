import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: #fff;
  border-radius: 10px;
  height: 40px;
  width: 100%;
  padding: 0 1rem;

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

  select {
    flex-grow: 1;
    color: ${props => (props.isFilled ? '#000' : '#666360')};
    background: transparent;
    border: 0;

    option {
      color: #666360;
      min-height: 20px;
    }
  }

  svg {
    margin-right: 16px;
    min-width: 20px;
    min-height: 20px;
  }

  @media (max-width: 481px) {
    select {
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

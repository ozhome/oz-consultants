import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;

  position: relative;
  overflow: hidden;
  border-bottom: solid rgba(0, 0, 0, 0.2) 1px;

  header {
    width: 100%;
    display: flex;
    flex: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;

    border-bottom: solid rgba(0, 0, 0, 0.2) 1px;
  }

  @media (max-width: 481px) {
    header {
      padding: 1rem 2rem;
    }
  }
`;
export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    resize: both;
    max-height: 4rem;
  }

  h1 {
    margin-left: 1rem;
    font-weight: 500;
  }
`;

export const Store = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    resize: both;
    max-height: 3rem;
    border: solid #000 1px;
    border-radius: 50%;
  }

  div {
    margin-left: 1rem;
    text-align: center;

    p {
      opacity: 0.8;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 481px) {
    div {
      display: none;
    }
  }
`;

export const Nav = styled.div`
  height: 3rem;
  width: 100%;

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    position: absolute;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 2rem;
    }

    &:last-child {
      right: 0;
    }
  }

  nav {
    height: 3rem;
    margin: 0 4rem;
    max-width: 100%;
    white-space: nowrap;

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    overflow-x: auto;
    overflow-y: hidden;

    a {
      height: 3.1rem;
      display: flex;
      color: #000;
      text-decoration: none;
      margin-left: 1rem;

      flex-direction: row;
      justify-content: center;
      align-items: center;

      border-bottom: solid rgba(0, 0, 0, 0) 3px;
      border-top: solid rgba(0, 0, 0, 0) 3px;

      &.active {
        border-color: #f9a72b;
        color: #f9a72b;

        &:hover {
          color: ${shade(0.2, '#f9a72b')};
          border-color: ${shade(0.2, '#f9a72b')};
        }
      }

      &:hover {
        color: ${shade(0.5, '#fff')};
      }

      &:last-child {
        margin-right: 4rem;
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

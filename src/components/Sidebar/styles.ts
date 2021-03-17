import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  min-width: 280px;
  max-width: 100%;
  max-width: 400px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6;

  background-color: #000;
  color: white;

  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;

  &.active {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
  }

  header {
    padding: 15px 48px 5px 5px;
  }
`;

export const Menu = styled.button`
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 7;
  width: 40px;
  height: 40px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  margin-top: 20px;
  section {
    margin: 20px 0;

    h3 {
      margin-bottom: 16px;
    }

    div {
      button,
      a {
        background-color: #fff;
        border: none;
        margin: 5px;
        padding: 5px;
        border-radius: 8px;
        text-decoration: none;
        color: #000;

        &.active {
          background-color: #f9a72b;
        }
      }
    }
  }
`;

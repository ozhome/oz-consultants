import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 2px solid black;
  flex-grow: 1;
  flex-basis: 0;
  padding: 5px 5px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;

  position: relative;
  overflow: hidden;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  text-align: center;
  padding: 10px 4px 5px 4px;
`;

export const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

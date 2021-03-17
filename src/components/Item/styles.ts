import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 2px solid black;
  flex-grow: 1;
  flex-basis: 0;
  padding: 5px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;

  position: relative;
  overflow: hidden;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Description = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  display: flex;
`;

export const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

export const Info = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-content: center;

  position: relative;
`;

export const DescriptionText = styled.p`
  width: 100%;
  font-size: 18px;
  text-align: justify;
`;

export const PriceContainer = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const Price = styled.p`
  margin: 7px 0;
  font-size: 20px;
  font-weight: 700;
`;

export const ContainerItem = styled.div`
  width: 100%;

  flex-direction: row;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ContainerQty = styled.button`
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 2px solid #000;
  background-color: #fff;
`;

export const ContainerItemText = styled.p`
  font-size: 25px;
`;

export const ButtonItem = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background: none;
`;

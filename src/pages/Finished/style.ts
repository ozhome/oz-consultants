import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

interface IModal {
  display: string;
}

export const Modal = styled.div<IModal>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  display: ${props => props.display};

  .content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  form {
  }
`;

export const Section = styled.section`
  h3 {
    margin: 15px 0;
  }

  .select {
    background-color: #000;
    color: #fff;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;

    div {
      margin: 0;
      width: 48%;
    }
  }
`;

export const ContainerQRCoe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  button {
    background-color: #000;
    color: #fff;
    width: auto;
  }
`;

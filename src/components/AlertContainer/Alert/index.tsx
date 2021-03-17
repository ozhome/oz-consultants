import React, { useCallback } from 'react';
import { FiXCircle } from 'react-icons/fi';

import { AlertMessage, useAlert } from '../../../hooks/alert';
import Button from '../../Button';

import { Container, Content, Title, Description, Buttons } from './styles';

interface AlertProps {
  alert: AlertMessage;
  style: React.CSSProperties;
}

const Alert: React.FC<AlertProps> = ({ alert, style }) => {
  const { removeAlert } = useAlert();

  const handleButton = useCallback(() => {
    if (alert.button) alert.button({ name: 'test', ss: 5 });
    removeAlert(alert.id);
  }, [alert, removeAlert]);

  return (
    <Container style={style}>
      <Content>
        <Title>
          <strong>{alert.title}</strong>
          <button type="button" onClick={() => removeAlert(alert.id)}>
            <FiXCircle />
          </button>
        </Title>
        <Description>
          {alert.custom ? (
            <alert.custom {...alert.customProps} />
          ) : (
            <p>{alert.description}</p>
          )}
        </Description>
        {alert.showButtons && (
          <Buttons>
            {alert.button && (
              <Button onClick={() => removeAlert(alert.id)}>Cancelar</Button>
            )}

            <Button onClick={handleButton}>Confirmar</Button>
          </Buttons>
        )}
      </Content>
    </Container>
  );
};

export default Alert;

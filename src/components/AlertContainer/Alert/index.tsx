import React, { useCallback } from 'react';
import { FiXCircle } from 'react-icons/fi';

import IAlertMessage from '../../../DTOS/IAlertMessage';
import IAlertResult from '../../../DTOS/IAlertResult';
import { useAlert } from '../../../hooks/alert';
import Button from '../../Button';

import { Container, Title, Description, Buttons } from './styles';

interface IAlertProps {
  alert: IAlertMessage;
  style: React.CSSProperties;
}

const Alert: React.FC<IAlertProps> = ({ alert, style }) => {
  const { removeAlert } = useAlert();

  const handleButton = useCallback(
    (data?: IAlertResult) => {
      if (alert.button) alert.button(data);
      removeAlert(alert.id);
    },
    [alert, removeAlert],
  );

  return (
    <Container style={style}>
      <Title>
        <strong>{alert.title}</strong>
        <button
          type="button"
          onClick={() => handleButton({ result: 'cancel' })}
        >
          <FiXCircle />
        </button>
      </Title>
      <Description>
        {alert.custom ? (
          <alert.custom {...alert.customProps} alert={handleButton} />
        ) : (
          <p>{alert.description}</p>
        )}
      </Description>
      {!alert.hiddenButtons && (
        <Buttons>
          {alert.button && (
            <Button onClick={() => handleButton({ result: 'cancel' })}>
              Cancelar
            </Button>
          )}

          <Button onClick={() => handleButton({ result: 'success' })}>
            Confirmar
          </Button>
        </Buttons>
      )}
    </Container>
  );
};

export default Alert;

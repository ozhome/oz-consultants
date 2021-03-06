import React from 'react';
import { useTransition } from 'react-spring';

import IAlertMessage from '../../DTOS/IAlertMessage';
import Alert from './Alert';

import { Container } from './styles';

interface AlertContainerProps {
  alerts: IAlertMessage[];
}

const AlertContainer: React.FC<AlertContainerProps> = ({ alerts }) => {
  const messageWithTransactions = useTransition(alerts, alert => alert.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });
  return (
    <Container id="modal">
      {messageWithTransactions.map(({ item, key, props }) => (
        <Alert key={key} style={props} alert={item} />
      ))}
    </Container>
  );
};

export default AlertContainer;

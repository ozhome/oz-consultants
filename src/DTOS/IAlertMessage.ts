import IAlertResult from './IAlertResult';

export default interface IAlertMessage {
  id: string;
  title: string;
  description?: string;
  custom?: React.FC<any>;
  customProps?: any;
  hiddenButtons?: boolean;
  button?(info?: IAlertResult): Promise<void>;
}

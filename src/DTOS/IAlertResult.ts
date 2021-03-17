export default interface IAlertResult {
  result: 'success' | 'error' | 'cancel';
  data?: {
    [key: string]: string | number | boolean | undefined;
  };
}

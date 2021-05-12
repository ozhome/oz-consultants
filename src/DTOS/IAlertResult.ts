interface IData {
  [key: string]: any;
}
export default interface IAlertResult<T> {
  result: 'success' | 'error' | 'cancel';
  data?: T;
}

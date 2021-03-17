export default interface IToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

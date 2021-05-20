export default interface IStore {
  name: string;
  id: string;
  document: string;
  store: string;
  type: 'oz_go' | 'oz_home';
  phone: string;
}

export default interface IStore {
  id: string;
  name: string;
  phone: string;
  document: string;
  store: string;
  email: string;
  street: string;
  street_number: string;
  complementary: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  type: 'oz_go' | 'oz_home';
}

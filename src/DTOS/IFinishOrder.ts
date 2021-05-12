import IItem from './IItem';
import IParamsClient from './IParamsClient';
import IStore from './IStore';

export default interface IFinishOrder {
  client: IParamsClient;
  cart: IItem[];
  store: IStore;
  amount: number;
}

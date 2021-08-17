export interface ICard {
  card_holder_name: string;
  card_expiration_date: string;
  card_number: string;
  card_cvv: string;
}

export default interface IParamsOrder {
  id: string;
  amount: number;
  client: {
    name: string;
    phone: string;
    email: string;
    document: string;
    document_company?: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    street_number: string;
    zipcode: string;
  };
  card?: ICard;
  payment_type: string;
  products: {
    id: number;
    price: number;
    qty: number;
    name: string;
    to_weight: boolean;
    discount?: number;
  }[];
}

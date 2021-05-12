export default interface IItem {
  id: string;
  idOdoo: number;
  name: string;
  to_weight: boolean;
  weight: number;
  description_sale: string;
  price: number;
  pos_categ_id: number;
  qty_available: number;
  quantity: number;
  image: string;
  discount?: number;
}

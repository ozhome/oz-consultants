export default interface ICategory {
  id: string;
  idOdoo: number;
  image: string;
  image_medium: string;
  name: string;
  parent_id?: number;
  has_product?: boolean;
}

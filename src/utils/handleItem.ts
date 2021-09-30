import IItem from '../DTOS/IItem';

export default function handleItem(
  oldItem: IItem,
  newItem: IItem,
  insertInput = false,
): IItem {
  let { quantity } = oldItem;
  const sum = insertInput
    ? newItem.quantity
    : oldItem.quantity + newItem.quantity;
  let { qty_available } = oldItem;

  if (oldItem.to_weight)
    qty_available = parseFloat(
      `${oldItem.qty_available * 1000}`.replace(/\D/g, ''),
    );

  if (sum > qty_available) quantity = qty_available;
  else if (sum <= 0) quantity = 0;
  else quantity = sum;

  return { ...oldItem, quantity };
}

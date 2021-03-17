interface IIsEmpty {
  [key: string]: string | number | undefined;
}

export default function isEmpty(data: IIsEmpty): boolean {
  let check = true;

  Object.values(data).forEach(value => {
    if (value) check = false;
  });

  return check;
}

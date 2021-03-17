import IAlertResult from '../DTOS/IAlertResult';

export default async function (data: IAlertResult): Promise<void> {
  if (data.result === 'success') {
    console.log('pedido enviado');
  }
}

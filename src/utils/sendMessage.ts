import IAlertResult from '../DTOS/IAlertResult';
import IFinishOrder from '../DTOS/IFinishOrder';
import formatReal from './formatReal';

export default async function ({
  result,
  data,
}: IAlertResult<IFinishOrder>): Promise<void> {
  if (result === 'success') {
    if (!data) return;
    const { client, cart, store, amount } = data;

    const hello = `Olá, *${store.name}*!`;
    const describe = `Acabei de visitar seu catálogo e quero fazer o seguinte pedido:`;

    const list = cart.reduce((acc: string, cur) => {
      return `${acc}*${cur.quantity}${cur.to_weight ? 'g ' : ''}x* - ${
        cur.name
      }; \n`;
    }, '');

    const amountText = `*Total: ${formatReal(amount)}*`;

    const infos = `Segue meus dados para a compra:
Nome: ${client.name}
Telefone: ${client.phone}
E-mail: ${client.email}
CPF: ${client.cpf}
Endereço: ${client.address}`;

    const finish = `Aguardo sua confirmação.`;

    const text = encodeURI(
      `${hello} ${describe}\n\n${list}\n${amountText}\n\n${infos}\n\n${finish}`,
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${store.phone}&text=${text}`,
    );
  }
}

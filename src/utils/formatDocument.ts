import cpf from './cpfMask';
import cnpj from './cnpjMask';

export default function (document: string): string {
  return document.length > 14 ? cnpj(document) : cpf(document);
}

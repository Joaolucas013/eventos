import { TipoEvento } from './TipoEvento';

export interface EventoCriado {
  id: string;
  nome: string;
  email: string;
  telefoneOrganizador: string;
  nomeDoEvento: string;
  tipoEvento: TipoEvento;
  dataEvento: string;
  horaEvento: string;
  eventoOnline: boolean;
  link: string;
  endereco: string;
  cidade: string;
  totalParticipantes: number;
  descricao: string;
}

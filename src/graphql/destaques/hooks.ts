import { useQuery } from '@apollo/client'
import { ILivro } from '../../interfaces/ILivro'
import { OBTER_DESTAQUES } from './queries'

export const useDestaques = () => {
  return useQuery<{
    destaques: { lancamentos: ILivro[]; maisVendidos: ILivro[] }
  }>(OBTER_DESTAQUES)
}

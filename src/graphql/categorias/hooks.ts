import { useQuery } from '@apollo/client'
import { ICategoria } from '../../interfaces/ICategoria'
import { OBTER_CATEGORIA } from './queries'

export const useCategorias = () => {
  return useQuery<{ categorias: ICategoria[] }>(OBTER_CATEGORIA)
}

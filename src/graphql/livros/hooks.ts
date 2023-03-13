import { livrosVar } from './state'
import { ILivro } from './../../interfaces/ILivro'
import { ICategoria } from './../../interfaces/ICategoria'
import { useQuery } from '@apollo/client'
import { OBTER_LIVROS } from './queries'

export const useLivros = (categoria: ICategoria) => {
  return useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    },
    onCompleted(data) {
      if (data.livros) {
        livrosVar(data.livros)
      }
    }
  })
}

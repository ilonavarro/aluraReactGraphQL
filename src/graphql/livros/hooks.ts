import { filtroLivrosVar, livrosVar } from './state'
import { ILivro } from './../../interfaces/ILivro'
import { useQuery, useReactiveVar } from '@apollo/client'
import { OBTER_LIVRO, OBTER_LIVROS } from './queries'

export const useLivros = () => {
  const filtro = useReactiveVar(filtroLivrosVar)
  return useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: filtro.categoria?.id,
      titulo: filtro.titulo
    },
    onCompleted(data) {
      if (data.livros) {
        livrosVar(data.livros)
      }
    }
  })
}

export const useLivro = (slug: string) => {
  return useQuery<{ livro: ILivro }>(OBTER_LIVRO, {
    variables: {
      slug
    }
  })
}

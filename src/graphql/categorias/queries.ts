import { gql } from '@apollo/client'

export const OBTER_CATEGORIA = gql`
  query ObterCategorias {
    categorias {
      id
      nome
      slug
    }
  }
`

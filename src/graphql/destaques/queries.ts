import { gql } from '@apollo/client'

export const OBTER_DESTAQUES = gql`
  query ObterLancamentos {
    destaques {
      lancamentos {
        id
        slug
        titulo
        imagemCapa
        opcoesCompra {
          id
          preco
        }
        autor {
          nome
        }
      }
      maisVendidos {
        id
        slug
        titulo
        imagemCapa
        opcoesCompra {
          id
          preco
        }
        autor {
          nome
        }
      }
    }
  }
`

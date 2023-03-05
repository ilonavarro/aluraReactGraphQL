import './ListaLivros.css'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'
import { gql, useQuery } from '@apollo/client'
import { ILivro } from '../../interfaces/ILivro'

interface ListaLivrosProps {
  categoria: ICategoria
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int) {
    livros(categoriaId: $categoriaId) {
      id
      slug
      titulo
      imagemCapa
      opcoesCompra {
        id
        preco
      }
    }
  }
`

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    }
  })
  return (
    <section className='livros'>
      {data?.livros.map(livro => (
        <CardLivro key={livro.id} livro={livro} />
      ))}
    </section>
  )
}

export default ListaLivros

import './ListaLivros.css'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'
import { gql, useQuery } from '@apollo/client'
import { ILivro } from '../../interfaces/ILivro'
import { AbBotao, AbCampoTexto } from 'ds-alurabooks'
import { useState } from 'react'

interface ListaLivrosProps {
  categoria: ICategoria
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      # query ObterLivros($categoriaId: Int) {
      #   livros(categoriaId: $categoriaId) {
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
  const [textoBusca, setTextoBusca] = useState('')

  const { data, refetch } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    }
  })
  console.table(data?.livros)
  console.log(categoria)

  const buscarLivros = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    textoBusca && refetch({ categoriaId: categoria.id, titulo: textoBusca }) //alterar isso
  }

  return (
    <section>
      <form className='formBusca' onSubmit={buscarLivros}>
        <AbCampoTexto
          value={textoBusca}
          onChange={setTextoBusca}
          placeholder='Digite o título'
        />
        <div>
          <AbBotao texto='Buscar' />
        </div>
      </form>
      <div className='livros'>
        {data?.livros.map(livro => (
          <CardLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </section>
  )
}

export default ListaLivros

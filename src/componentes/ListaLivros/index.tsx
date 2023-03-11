import './ListaLivros.css'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'
import { AbBotao, AbCampoTexto } from 'ds-alurabooks'
import { useState } from 'react'
import { useLivros } from '../../graphql/livros/hooks'

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState('')

  const { data, refetch } = useLivros(categoria)

  const buscarLivros = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    textoBusca && refetch({ categoriaId: categoria.id, titulo: textoBusca })
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

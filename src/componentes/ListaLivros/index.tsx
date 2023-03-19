import './ListaLivros.css'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'
import { AbBotao, AbCampoTexto } from 'ds-alurabooks'
import { useState } from 'react'
import { useLivros } from '../../graphql/livros/hooks'
import { useReactiveVar } from '@apollo/client'
import { filtroLivrosVar, livrosVar } from '../../graphql/livros/state'

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState('')

  filtroLivrosVar({
    categoria
  })

  const livros = useReactiveVar(livrosVar)

  useLivros()

  return (
    <section>
      <form className='formBusca'>
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
        {livros.map(livro => (
          <CardLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </section>
  )
}

export default ListaLivros

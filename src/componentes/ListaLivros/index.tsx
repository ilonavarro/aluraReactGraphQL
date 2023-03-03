import { useQuery } from '@tanstack/react-query'
import './ListaLivros.css'
import { obterProdutosDaCategoria } from '../../http'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'

interface ListaLivrosProps {
  categoria: ICategoria
}
const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: produtos } = useQuery(['buscaLivrosPorCategoria', categoria], () =>
    obterProdutosDaCategoria(categoria)
  )
  return (
    <section className='livros'>
      {produtos?.map(livro => (
        <CardLivro key={livro.id} livro={livro} />
      ))}
    </section>
  )
}

export default ListaLivros

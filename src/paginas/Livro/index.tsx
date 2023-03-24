// import { useQuery } from '@tanstack/react-query'
// import { AxiosError } from 'axios'
// import Loader from '../../componentes/Loader'
// import { obterLivro } from '../../http'
// import { ILivro } from '../../interfaces/ILivro'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from 'ds-alurabooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BlocoSobre from '../../componentes/BlocoSobre'
import SobreAutor from '../../componentes/SobreAutor'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import { useLivro } from '../../graphql/livros/hooks'
import { formatador } from '../../utils/formatador-moeda'
import './Livro.css'

const Livro = () => {
  const params = useParams()

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()
  const [quantidadeCompraLivros, setQuantidadeCompraLivros] = useState<number>(1)

  const { data } = useLivro(params.slug || '')

  const livroOpcoesCompra = data?.livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: formatador.format(opcao.preco),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  }))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? livroOpcoesCompra! : []

  // const {
  //   data: livro,
  //   isLoading,
  //   error
  // } = useQuery<ILivro | null, AxiosError>(['livro', params.slug], () =>
  //   obterLivro(params.slug || '')
  // )

  // if (error) {
  //   console.log('Alguma coisa deu errada')
  //   console.log(error.message)
  //   return <h1>Ops! Algum erro inesperado aconteceu</h1>
  // }

  if (data?.livro === null) {
    return <h1>Livro não encontrado!</h1>
  }

  // if (isLoading || !livro) {
  //   return <Loader />
  // }

  // const livroOpcoesCompra = livro.opcoesCompra.map(opcao => ({
  //   id: opcao.id,
  //   corpo: formatador.format(opcao.preco),
  //   titulo: opcao.titulo,
  //   rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  // }))

  // const opcoes: AbGrupoOpcao[] = livro.opcoesCompra ? livroOpcoesCompra : []

  return (
    <section className='livro-detalhe'>
      <TituloPrincipal texto={`Detalhes do Livro ${data?.livro.titulo}`} />
      <div className=''>
        <div className='container'>
          <figure>
            <img src={data?.livro.imagemCapa} alt={data?.livro.descricao} />
          </figure>
          <div className='detalhes'>
            <h2>{data?.livro.titulo}</h2>
            <p>{data?.livro.descricao}</p>
            <h3>Selecione o formato do seu livro:</h3>
            <div className='opcoes'>
              <AbGrupoOpcoes opcoes={opcoes} onChange={setOpcao} valorPadrao={opcao} />
            </div>
            <p>
              <strong>*Você terá acesso às futuras atualizações do livro.</strong>
            </p>
            <footer>
              <div className='qtdContainer'>
                <AbInputQuantidade
                  value={quantidadeCompraLivros}
                  onChange={quantidade =>
                    quantidade > 1
                      ? setQuantidadeCompraLivros(quantidade)
                      : setQuantidadeCompraLivros(1)
                  }
                />
              </div>
              <div>
                <AbBotao texto='Comprar' />
              </div>
            </footer>
          </div>
        </div>
        <div>
          {data && <SobreAutor autorId={data?.livro.autor} />}
          {data && <BlocoSobre titulo='Sobre o Livro' corpo={data?.livro.sobre} />}
        </div>
      </div>
    </section>
  )
}

export default Livro

import { ICategoria } from './../../interfaces/ICategoria'
import { ILivro } from './../../interfaces/ILivro'
import { makeVar } from '@apollo/client'

interface FiltroLivros {
  categoria?: ICategoria
  titulo?: string
}

export const filtroLivrosVar = makeVar<FiltroLivros>({})

export const livrosVar = makeVar<ILivro[]>([])

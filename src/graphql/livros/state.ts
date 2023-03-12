import { ILivro } from './../../interfaces/ILivro'
import { makeVar } from '@apollo/client'

export const livrosVar = makeVar<ILivro[]>([])

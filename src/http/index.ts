import { ILivro } from './../interfaces/ILivro'
import { ICategoria } from './../interfaces/ICategoria'
import { useObterToken } from './../hooks/index'
import { IAutor } from '../interfaces/IAutor'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

http.interceptors.request.use(
  function (config) {
    const token = useObterToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    alert('Erro no interceptor do axios')
    return Promise.reject(error)
  }
)

export default http

export const obterCategoriaPorSlug = async (slug: string) => {
  const resposta = await http.get<ICategoria[]>('categorias', {
    params: {
      slug
    }
  })
  return resposta.data[0]
}

export const obterLivrosDestaque = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`)
  return resposta.data
}

export const obterProdutosDaCategoria = async (categoria: ICategoria) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      categoria: categoria.id
    }
  })
  return resposta.data
}

export const obterAutor = async (autorId: number) => {
  try {
    const resposta = await http.get<IAutor>(`autores/${autorId}`)
    console.log(`autores/${autorId}`)
    return resposta.data
  } catch (error) {
    console.error('Não foi possivel obter o autor!')
    console.error(`Erro: ${error}`)
  }
}

export const obterLivro = async (slug: string) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      slug
    }
  })
  if (resposta.data.length === 0) {
    return null
  }
  return resposta.data[0]
}

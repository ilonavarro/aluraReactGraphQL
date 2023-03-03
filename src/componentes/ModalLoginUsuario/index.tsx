import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks'
import { useState } from 'react'
import { usePersistirToken } from '../../hooks'
import http from '../../http'

import imagemPrincipal from './assets/login.png'

import './ModalLoginUsuario.css'

interface PropsModalLoginUsuario {
  aberta: boolean
  aoFechar: () => void
  aoEfetuarLogin: () => void
}

const ModalLoginUsuario = ({
  aberta,
  aoFechar,
  aoEfetuarLogin
}: PropsModalLoginUsuario) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const setToken = usePersistirToken()

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const usuario = {
      email,
      senha
    }
    http
      .post('/public/login', usuario)
      .then(resposta => {
        setToken(resposta.data.access_token)
        setEmail('')
        setSenha('')
        aoEfetuarLogin()
      })
      .catch(erro => {
        const errorMessage =
          'Erro inesperado ao efetuar o seu login\nEntre em contato com o suporte'
        erro?.response?.data?.message
          ? alert(erro.response.data.message)
          : alert(errorMessage)
      })
  }

  return (
    <AbModal titulo='Login' aberta={aberta} aoFechar={aoFechar}>
      <section className='corpoModalCadastro'>
        <figure>
          <img
            src={imagemPrincipal}
            alt='Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura'
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto label='E-mail' value={email} onChange={setEmail} type='email' />
          <AbCampoTexto label='Senha' value={senha} onChange={setSenha} type='password' />
          <div className='acoes'>
            <AbBotao texto='Fazer login' />
          </div>
        </form>
      </section>
    </AbModal>
  )
}

export default ModalLoginUsuario

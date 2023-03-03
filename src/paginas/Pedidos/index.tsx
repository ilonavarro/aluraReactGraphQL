import { AbBotao } from 'ds-alurabooks'
import './Pedidos.css'
import { useEffect, useState } from 'react'
import { IPedido } from '../../interfaces/IPedido'
import http from '../../http'

const Pedidos = () => {
  const formatador = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

  const [pedidos, setPedidos] = useState<IPedido[]>([])

  useEffect(() => {
    http
      .get<IPedido[]>('pedidos')
      .then(resposta => setPedidos(resposta.data))
      .catch(erro => alert(erro))
  }, [])

  const excluir = (pedido: IPedido) => {
    http
      .delete(`pedidos/${pedido.id}`)
      .then(() => {
        setPedidos(pedidos.filter(p => p.id !== pedido.id))
        alert(`Você excluiu o pedido ${pedido.id}`)
      })
      .catch(erro => alert(erro))
  }

  return (
    <section className='pedidos'>
      <h1>Meus Pedidos</h1>
      {pedidos.map(pedido => (
        <div className='pedido' key={pedido.id}>
          <ul>
            <li>
              Pedido: <strong>{pedido.id}</strong>
            </li>
            <li>
              Data do pedido:
              <strong> {new Date(pedido.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total: <strong>{formatador.format(pedido.total)}</strong>
            </li>
            <li>
              Entrega realizada em:
              <strong> {new Date(pedido.entrega).toLocaleDateString()}</strong>
            </li>
          </ul>
          <AbBotao texto='Excluir' tipo='secundario' onClick={() => excluir(pedido)} />
          <AbBotao texto='Detalhes' />
        </div>
      ))}
    </section>
  )
}

export default Pedidos

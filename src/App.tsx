import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ABApolloClient from './componentes/ABApolloClient'
import Rotas from './rotas'

const queryClient = new QueryClient()

function App() {
  return (
    <ABApolloClient>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </QueryClientProvider>
    </ABApolloClient>
  )
}

export default App

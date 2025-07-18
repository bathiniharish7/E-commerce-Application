import React from 'react'
import Header from './components/Header/Header'
import AppRoutes from './routes/AppRoutes'
import "./App.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {

const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>

      <Header />
      <AppRoutes />

    </div>

    </QueryClientProvider>
    
  )
}

export default App

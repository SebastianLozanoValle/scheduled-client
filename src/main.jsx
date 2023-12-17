import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QuruxApp } from './QuruxApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000',
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <QuruxApp />
    </BrowserRouter>
  </ApolloProvider>,
)

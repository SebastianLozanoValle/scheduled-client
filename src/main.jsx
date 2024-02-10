import ReactDOM from 'react-dom/client'
import './index.css'
import { QuruxApp } from './QuruxApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    }
  }
});

export const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    addTypename: false, // Aquí es donde desactivas los __typename
  }),
  link: authLink.concat(new HttpLink({
    // uri: 'https://sever-qurux-production.up.railway.app/graphql',
    uri: 'http://localhost:33402/graphql',
    // uri: 'https://sever-qurux.vercel.app/graphql',
  })),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <QuruxApp />
    </BrowserRouter>
  </ApolloProvider>,
)

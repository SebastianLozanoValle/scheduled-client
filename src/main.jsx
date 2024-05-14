import ReactDOM from 'react-dom/client'
import './index.css'
import { QuruxApp } from './QuruxApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token');
  if (!token) {
    return { headers };
  } else {
    return {
      headers: {
        ...headers,
        Authorization: `bearer ${token}`,
      }
    };
  }
});

export const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    addTypename: false, // Aquí es donde desactivas los __typename
  }),
  link: authLink.concat(new HttpLink({
    // uri: 'https://vercel.com/sebastianlozanovalles-projects/sever-qurux/92cNGjvNjabrYTeSfXtXWsvpnLru/graphql',
    // uri: 'http://localhost:33402/graphql',
    // uri: 'https://sever-qurux.vercel.app/graphql',
    uri: 'https://sever-qurux.onrender.com/graphql',
    // uri: 'http://api.qurux.net/graphql',
  })),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <QuruxApp />
    </BrowserRouter>
  </ApolloProvider>,
)

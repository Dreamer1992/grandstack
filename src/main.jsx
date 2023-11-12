import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  // Импорт функции makeVar для создания новой реактивной переменной
  makeVar,
} from '@apollo/client'

// Создание новой реактивной переменной установкой начального значения равным пустому массиву
export const starredVar = makeVar([])

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    // Включение политики поля в аргументы конструктора InMemoryCache
    typePolicies: {
      Business: {
        fields: {
          // Политика поля определяет, как вычисляется значение
          // локального поля с именем isStarred в типе Business
          isStarred: {
            read(_, { readField }) {
              //Возврат значения true, если список компаний со звездами включает текущую компанию
              return starredVar().includes(readField('businessId'))
            },
          },
        },
      },
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

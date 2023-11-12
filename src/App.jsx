import { useState } from 'react'
import './App.css'
import BusinessResults from './BusinessResults'
import { gql, useQuery } from '@apollo/client'

// const BUSINESS_DETAILS_FRAGMENT = gql`
//   fragment businessDetails on Business {
//     businessId
//     name
//     address
//     categories {
//       name
//     }
//   }
// `

// const GET_BUSINESSES_QUERY = gql`
//   query BusinessesByCategory($selectedCategory: String!) {
//     businesses(
//       where: { categories_SOME: { name_CONTAINS: $selectedCategory } }
//     ) {
//       ...businessDetails
//     }
//   }

//   ${BUSINESS_DETAILS_FRAGMENT}
// `

const GET_BUSINESSES_QUERY = gql`
  query Businesses {
    businesses {
      name
      # Добавить поле isStarred в выборку, указав, что
      # оно локальное, с помощью директивы @client
      isStarred @client
    }
  }
`

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const { loading, error, data, refetch } = useQuery(GET_BUSINESSES_QUERY)
  console.log('🚀 ~ file: App.jsx:50 ~ App ~ data:', data)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Business Search</h1>
      <form>
        <label>
          Select Business Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>

        <input type="button" value="Refetch" onClick={() => refetch()} />
      </form>

      <BusinessResults businesses={data.businesses} />
    </div>
  )
}

export default App

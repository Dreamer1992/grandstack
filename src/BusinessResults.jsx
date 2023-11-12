import PropTypes from 'prop-types'
import { starredVar } from './main'

function BusinessResults({ businesses }) {
  // Извлечение значения starredVar, чтобы найти все компании, отмеченные звездами
  const starredItems = starredVar()

  return (
    <div>
      <h2>Results</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((b, i) => (
            <tr key={i}>
              <td>
                {/* При щелчке добавить businessId в список компаний, отмеченных звездами */}
                <button
                  onClick={() => starredVar([...starredItems, b.businessId])}
                >
                  Star
                </button>
              </td>

              {/* Если компания отмечена звездой, то вывести ее название жирным шрифтом */}
              <td style={b.isStarred ? { fontWeight: 'bold' } : null}>
                {b.name}
              </td>

              <td>{b.address}</td>

              <td>
                {b?.categories?.reduce(
                  (acc, c, i) => acc + (i === 0 ? ' ' : ', ') + c.name,
                  ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

BusinessResults.propTypes = {
  businesses: PropTypes.arrayOf(
    PropTypes.shape({
      businessId: PropTypes.string,
      name: PropTypes.string.isRequired,
      address: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
    })
  ),
}

export default BusinessResults

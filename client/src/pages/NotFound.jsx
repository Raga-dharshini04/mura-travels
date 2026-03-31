import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-32">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-500 mb-6">Oops! Page not found.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound;
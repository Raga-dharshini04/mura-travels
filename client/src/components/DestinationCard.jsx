import { Link } from 'react-router-dom'

function DestinationCard({ destination }) {
  const { _id, name, location, country, price, image, category, rating, reviewCount } = destination

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden">
      <img
        src={image || `https://source.unsplash.com/400x250/?${category},travel`}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-wide text-blue-500 font-semibold">
            {category}
          </span>
          <span className="text-xs text-gray-400">{reviewCount} reviews</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">📍 {location}, {country}</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-medium text-sm">⭐ {rating || 'No rating'}</span>
          <span className="text-blue-600 font-bold">${price}<span className="text-gray-400 font-normal text-xs">/night</span></span>
        </div>
        <Link
          to={`/destinations/${_id}`}
          className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default DestinationCard;
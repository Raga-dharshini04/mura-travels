function ReviewCard({ review }) {
  const { name, rating, comment, createdAt } = review

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
  ))

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">{name}</span>
        <span className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex mb-2">{stars}</div>
      <p className="text-gray-600 text-sm">{comment}</p>
    </div>
  )
}

export default ReviewCard;
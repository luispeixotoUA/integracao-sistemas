interface StarGridProps {
  selectedStars: number[]
  setSelectedStars: (stars: number[]) => void
}

export default function StarGrid({ selectedStars, setSelectedStars }: StarGridProps) {
  const handleStarClick = (num: number) => {
    if (selectedStars.includes(num)) {
      setSelectedStars(selectedStars.filter(n => n !== num))
    } else if (selectedStars.length < 2) {
      setSelectedStars([...selectedStars, num])
    }
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => handleStarClick(num)}
          disabled={selectedStars.length >= 2 && !selectedStars.includes(num)}
          className={`
            h-12 w-12 rounded-full font-medium text-lg
            transition-all duration-200 transform
            ${selectedStars.includes(num)
              ? 'bg-yellow-400 text-white scale-110 rotate-3 shadow-lg'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
            }
            ${selectedStars.length >= 2 && !selectedStars.includes(num)
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }
          `}
        >
          {num}
        </button>
      ))}
    </div>
  )
}
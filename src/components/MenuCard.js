'use client'

export default function MenuCard({ item }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-700">
      <div className="h-48 bg-gray-700 relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl bg-orange-900">🍔</div>'
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <span className="text-orange-400 font-bold text-xl">{item.price} с.</span>
        </div>
        <p className="text-gray-400 text-sm">{item.desc}</p>
      </div>
    </div>
  )
}

import menuData from '@/data/menu.json'
import MenuCard from '@/components/MenuCard'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Шапка ресторана */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{menuData.restaurant.logo}</div>
        <h1 className="text-4xl font-black mb-2">{menuData.restaurant.name}</h1>
        <p className="text-gray-400">{menuData.restaurant.address}</p>
        <p className="text-gray-400">{menuData.restaurant.phone} • {menuData.restaurant.hours}</p>
      </div>

      {/* Категории и блюда */}
      {menuData.categories.map(category => (
        <div key={category.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-orange-400 border-b border-gray-700 pb-2">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {/* Футер */}
      <div className="text-center text-gray-500 text-sm py-8 border-t border-gray-700 mt-12">
        <p>© 2024 {menuData.restaurant.name}. Все права защищены.</p>
        <p className="mt-1">📱 Отсканируйте QR-код, чтобы открыть меню</p>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import menuData from '../../data/menu.json'

export default function AdminPage() {
  const [menu, setMenu] = useState(menuData)
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [activeCategory, setActiveCategory] = useState(menu.categories[0].id)

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuth(true)
      localStorage.setItem('burger_admin', 'true')
    }
  }

  const getUpdatedJSON = () => {
    return JSON.stringify(menu, null, 2)
  }

  const updateItem = (categoryId, itemId, field, value) => {
    const newMenu = { ...menu }
    const category = newMenu.categories.find(c => c.id === categoryId)
    const item = category.items.find(i => i.id === itemId)
    item[field] = field === 'price' ? Number(value) : value
    setMenu(newMenu)
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">🔐 Вход в админ-панель</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="w-full p-3 rounded-lg bg-gray-700 mb-4 text-white border border-gray-600 focus:border-orange-400 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">⚙️ Админ-панель: {menu.restaurant.name}</h1>
          <button
            onClick={() => {
              localStorage.removeItem('burger_admin')
              setIsAuth(false)
            }}
            className="text-gray-400 hover:text-red-400"
          >
            Выйти
          </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {menu.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {menu.categories
            .find(c => c.id === activeCategory)
            ?.items.map(item => (
              <div key={item.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Название</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(activeCategory, item.id, 'name', e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded-lg mt-1 border border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Цена</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(activeCategory, item.id, 'price', e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded-lg mt-1 border border-gray-600 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400">Описание</label>
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateItem(activeCategory, item.id, 'desc', e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded-lg mt-1 border border-gray-600 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400">Ссылка на изображение</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => updateItem(activeCategory, item.id, 'image', e.target.value)}
                      className="w-full p-2 bg-gray-700 rounded-lg mt-1 border border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-4">📋 Обновлённый menu.json</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Скопируйте этот JSON и замените содержимое файла src/data/menu.json
          </p>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-green-400">
            {getUpdatedJSON()}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(getUpdatedJSON())}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            📋 Копировать JSON
          </button>
        </div>
      </div>
    </div>
  )
      }

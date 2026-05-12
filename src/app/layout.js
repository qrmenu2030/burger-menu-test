import './globals.css'

export const metadata = {
  title: 'Burger House - Меню',
  description: 'Лучшие бургеры в городе',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}

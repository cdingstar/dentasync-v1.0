import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login/Login'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // 检查 localStorage 中是否有登录信息
  useEffect(() => {
    const savedUser = localStorage.getItem('dentasync_user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  // 处理登录
  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo)
    setIsLoggedIn(true)
    localStorage.setItem('dentasync_user', JSON.stringify(userInfo))
  }

  // 处理登出
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem('dentasync_user')
  }

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        {isLoggedIn ? (
          <MainLayout currentUser={currentUser} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App

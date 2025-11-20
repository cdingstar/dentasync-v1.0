import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import './NaviBar.css'

function NaviBar() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // 所有可能的页面配置
  const allPages = useMemo(() => ({
    '/': { label: '首页', closable: false },
    '/order/quick': { label: '一键下单', closable: true },
    '/order/product-library': { label: '产品库下单', closable: true },
    '/order/pending': { label: '待下单', closable: true },
    '/order-management/all': { label: '全部订单', closable: true },
    '/order-management/pending': { label: '待处理订单', closable: true },
    '/personal/personnel-auth': { label: '人员管理', closable: true },
    '/personal/patient-archive': { label: '患者档案', closable: true },
    '/personal/unit-info': { label: '诊所信息', closable: true },
    '/personal/address-management': { label: '地址管理', closable: true },
    '/system/executing-unit': { label: '诊所管理', closable: true },
    '/system/factory': { label: '工厂管理', closable: true },
  }), [])
  
  // 获取动态路由的标签信息
  const getDynamicPageLabel = useCallback((path) => {
    // 订单详情页面
    if (path.startsWith('/order-management/detail/')) {
      const orderNo = path.split('/').pop()
      return `订单详情 - ${orderNo}`
    }
    return null
  }, [])

  // 管理打开的标签页
  const [openTabs, setOpenTabs] = useState([
    { key: '/', label: '首页', closable: false },
  ])

  // 当路由变化时，自动添加新标签页
  useEffect(() => {
    const currentPath = location.pathname
    
    setOpenTabs(prev => {
      const pageExists = prev.find(tab => tab.key === currentPath)
      
      if (!pageExists) {
        // 先检查是否是静态路由
        if (allPages[currentPath]) {
          return [
            ...prev,
            {
              key: currentPath,
              label: allPages[currentPath].label,
              closable: allPages[currentPath].closable
            }
          ]
        }
        
        // 检查是否是动态路由
        const dynamicLabel = getDynamicPageLabel(currentPath)
        if (dynamicLabel) {
          return [
            ...prev,
            {
              key: currentPath,
              label: dynamicLabel,
              closable: true
            }
          ]
        }
      }
      
      return prev
    })
  }, [location.pathname, allPages, getDynamicPageLabel])

  // 点击标签页切换
  const handleTabClick = useCallback((key) => {
    navigate(key)
  }, [navigate])

  // 关闭标签页
  const handleTabClose = useCallback((e, key) => {
    e.stopPropagation()
    
    setOpenTabs(prev => {
      const tabIndex = prev.findIndex(tab => tab.key === key)
      const newTabs = prev.filter(tab => tab.key !== key)
      
      // 如果关闭的是当前页面，需要导航到其他页面
      if (location.pathname === key) {
        // 导航到前一个标签页，如果没有则导航到首页
        const targetTab = newTabs[tabIndex - 1] || newTabs[0]
        navigate(targetTab.key)
      }
      
      return newTabs
    })
  }, [location.pathname, navigate])

  return (
    <div className="navi-bar" style={{ zIndex: 10 }}>
      <div className="navi-bar-tabs">
        {openTabs.map(tab => (
          <div
            key={tab.key}
            className={`navi-bar-tab ${location.pathname === tab.key ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.key)}
          >
            <span className="navi-bar-tab-label">{tab.label}</span>
            {tab.closable && (
              <CloseOutlined
                className="navi-bar-tab-close"
                onClick={(e) => handleTabClose(e, tab.key)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NaviBar

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './NaviBar.css'

function NaviBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  
  // All possible page configurations
  const allPages = useMemo(() => ({
    '/': { label: t('menu.home'), closable: false },
    '/order/quick': { label: t('menu.quickOrder'), closable: true },
    '/order/product-library': { label: t('menu.productLibraryOrder'), closable: true },
    '/order/pending': { label: t('menu.pendingOrder'), closable: true },
    '/order-management/all': { label: t('menu.allOrders'), closable: true },
    '/order-management/pending': { label: t('menu.pendingHandling'), closable: true },
    '/personal/personnel-auth': { label: t('menu.personnel'), closable: true },
    '/personal/patient-archive': { label: t('menu.patientArchives'), closable: true },
    '/personal/unit-info': { label: t('menu.clinicInfo'), closable: true },
    '/personal/factory-info': { label: t('menu.factoryInfo'), closable: true },
    '/personal/address-management': { label: t('menu.addressManagement'), closable: true },
    '/system/executing-unit': { label: t('menu.clinicManagement'), closable: true },
    '/system/factory': { label: t('menu.factoryManagement'), closable: true },
  }), [t])
  
  // Get label info for dynamic routes
  const getDynamicPageLabel = useCallback((path) => {
    // Order detail page
    if (path.startsWith('/order-management/detail/')) {
      const orderNo = path.split('/').pop()
      return `${t('menu.orderDetail')} - ${orderNo}`
    }
    return null
  }, [t])

  // Manage open tabs
  const [openTabs, setOpenTabs] = useState([
    { key: '/', label: t('menu.home'), closable: false },
  ])

  // Update tab names when language changes
  useEffect(() => {
    setOpenTabs(prev => prev.map(tab => {
      if (allPages[tab.key]) {
        return { ...tab, label: allPages[tab.key].label }
      }
      const dynamicLabel = getDynamicPageLabel(tab.key)
      if (dynamicLabel) {
        return { ...tab, label: dynamicLabel }
      }
      return tab
    }))
  }, [t, allPages, getDynamicPageLabel])

  // Automatically add new tab when route changes
  useEffect(() => {
    const currentPath = location.pathname
    
    setOpenTabs(prev => {
      const pageExists = prev.find(tab => tab.key === currentPath)
      
      if (!pageExists) {
        // Check if it is a static route first
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
        
        // Check if it is a dynamic route
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

  // Click tab to switch
  const handleTabClick = useCallback((key) => {
    navigate(key)
  }, [navigate])

  // Close tab
  const handleTabClose = useCallback((e, key) => {
    e.stopPropagation()
    
    setOpenTabs(prev => {
      const tabIndex = prev.findIndex(tab => tab.key === key)
      const newTabs = prev.filter(tab => tab.key !== key)
      
      // If closing the current page, navigate to another page
      if (location.pathname === key) {
        // Navigate to the previous tab, or home if none
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
            <span className="navi-bar-tab-label">
              {allPages[tab.key] ? allPages[tab.key].label : tab.label}
            </span>
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

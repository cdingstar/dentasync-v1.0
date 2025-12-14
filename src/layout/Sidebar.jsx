import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HomeOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  UserOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  HourglassOutlined,
  ShopOutlined,
  BankOutlined,
  ApartmentOutlined,
  TeamOutlined,
  FolderOutlined,
  EnvironmentOutlined,
  AppstoreOutlined
} from '@ant-design/icons'
import './Sidebar.css'

const { Sider } = Layout

function Sidebar({ collapsed, onCollapse, currentUser }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const tempRole = currentUser?.tempRole
  const isFactory = tempRole && tempRole.startsWith('factory_')
  const isFactoryAdmin = tempRole === 'factory_admin'
  const isClinicAdmin = tempRole === 'clinic_admin'
  const isSuperAdmin = tempRole === 'super_admin'

  let menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('menu.home')
    },
    {
      key: '/order',
      icon: <ShoppingCartOutlined />,
      label: t('menu.order'),
      children: [
        {
          key: '/order/quick',
          icon: <ThunderboltOutlined />,
          label: t('menu.quickOrder')
        },
        {
          key: '/order/product-library',
          icon: <DatabaseOutlined />,
          label: t('menu.productLibraryOrder')
        }
      ]
    },
    {
      key: '/order-management',
      icon: <OrderedListOutlined />,
      label: t('menu.orderManagement'),
      children: [
        {
          key: '/order-management/all',
          icon: <FileTextOutlined />,
          label: t('menu.allOrders')
        },
        {
          key: '/order/pending',
          icon: <ClockCircleOutlined />,
          label: t('menu.pendingOrder')
        },
        {
          key: '/order-management/pending',
          icon: <HourglassOutlined />,
          label: t('menu.pendingHandling')
        }
      ]
    },

    {
      key: '/personal',
      icon: <UserOutlined />,
      label: t('menu.infoSettings'),
      children: [
        {
          key: '/personal/personnel-auth',
          icon: <TeamOutlined />,
          label: t('menu.personnel')
        },
        {
          key: '/personal/patient-archive',
          icon: <FolderOutlined />,
          label: t('menu.patientArchives')
        },
        {
          key: '/personal/unit-info',
          icon: <ShopOutlined />,
          label: t('menu.clinicInfo')
        },
        // Factory info (Displayed by role)
        ...(isFactoryAdmin ? [{
          key: '/personal/factory-info',
          icon: <BankOutlined />,
          label: t('menu.factoryInfo')
        }] : []),
        {
          key: '/personal/address-management',
          icon: <EnvironmentOutlined />,
          label: t('menu.addressManagement')
        }
      ]
    },
    {
      key: '/system',
      icon: <AppstoreOutlined />,
      label: t('menu.systemManagement'),
      children: [
        {
          key: '/system/executing-unit',
          icon: <ApartmentOutlined />,
          label: t('menu.clinicManagement')
        },
        {
          key: '/system/factory',
          icon: <BankOutlined />,
          label: t('menu.factoryManagement')
        }
      ]
    }
  ]

  if (isFactory) {
    menuItems = menuItems.filter(item => item.key !== '/order')
    // Hide patient management (Patient Archives)
    menuItems = menuItems.map(item => {
      if (item.key === '/personal') {
        return {
          ...item,
          children: item.children.filter(child => child.key !== '/personal/patient-archive')
        }
      }
      return item
    })
  }

  if (!isFactoryAdmin && !isClinicAdmin && !isSuperAdmin) {
    menuItems = menuItems.map(item => {
      if (item.key === '/personal') {
        return {
          ...item,
          children: item.children.filter(child => child.key !== '/personal/personnel-auth')
        }
      }
      return item
    })
  }

  if (!isSuperAdmin) {
    menuItems = menuItems.filter(item => item.key !== '/system')
  }

  if (isSuperAdmin) {
    const hideKeys = new Set(['/', '/order', '/personal'])
    menuItems = menuItems.filter(item => !hideKeys.has(item.key))
  }

  // Only clinic admin can see "Clinic Info"
  if (!isClinicAdmin) {
    menuItems = menuItems.map(item => {
      if (item.key === '/personal') {
        return {
          ...item,
          children: item.children.filter(child => child.key !== '/personal/unit-info')
        }
      }
      return item
    })
  }

  // Only factory admin can see "Factory Info" (Already controlled at build time, double protection here)
  if (!isFactoryAdmin) {
    menuItems = menuItems.map(item => {
      if (item.key === '/personal') {
        return {
          ...item,
          children: item.children.filter(child => child.key !== '/personal/factory-info')
        }
      }
      return item
    })
  }

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  // Get currently selected menu items
  const getSelectedKeys = () => {
    return [location.pathname]
  }

  // Get default open menu items
  const getDefaultOpenKeys = () => {
    const path = location.pathname
    if (path.startsWith('/order/')) return ['/order']
    if (path.startsWith('/order-management/')) return ['/order-management']
    if (path.startsWith('/personal/')) return ['/personal']
    if (path.startsWith('/system/')) return ['/system']
    return []
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={220}
      className="sidebar"
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getDefaultOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

export default Sidebar

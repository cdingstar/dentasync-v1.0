import React, { useState } from 'react'
import { Layout, Menu, Badge } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  UserOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  HourglassOutlined,
  IdcardOutlined,
  ShopOutlined,
  BankOutlined,
  CarOutlined,
  ApartmentOutlined,
  TeamOutlined,
  SolutionOutlined,
  MedicineBoxOutlined,
  FolderOutlined,
  RocketOutlined,
  MessageOutlined
} from '@ant-design/icons'
import './Sidebar.css'

const { Sider } = Layout

function Sidebar({ collapsed, onCollapse }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: '/messages',
      icon: <MessageOutlined />,
      label: (
        <Badge count={99} offset={[10, 0]} overflowCount={99}>
          <span style={{ marginRight: 20 }}>我的消息</span>
        </Badge>
      )
    },
    {
      key: '/order',
      icon: <ShoppingCartOutlined />,
      label: '下单',
      children: [
        {
          key: '/order/quick',
          icon: <ThunderboltOutlined />,
          label: '一键下单'
        },
        {
          key: '/order/product-library',
          icon: <DatabaseOutlined />,
          label: '产品库下单'
        },
        {
          key: '/order/pending',
          icon: <ClockCircleOutlined />,
          label: '待下单'
        }
      ]
    },
    {
      key: '/order-management',
      icon: <OrderedListOutlined />,
      label: '订单管理',
      children: [
        {
          key: '/order-management/all',
          icon: <FileTextOutlined />,
          label: '全部订单'
        },
        {
          key: '/order-management/pending',
          icon: <HourglassOutlined />,
          label: '待处理订单'
        }
      ]
    },
    {
      key: '/personal',
      icon: <UserOutlined />,
      label: '信息设置',
      children: [
        {
          key: '/system/personnel-auth',
          icon: <TeamOutlined />,
          label: '人员管理'
        },
        {
          key: '/system/patient-archive',
          icon: <FolderOutlined />,
          label: '患者档案'
        },
        {
          key: '/personal/info',
          icon: <IdcardOutlined />,
          label: '个人信息'
        },
        {
          key: '/system/unit-info',
          icon: <ShopOutlined />,
          label: '诊所信息'
        }
      ]
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        {
          key: '/system/executing-unit',
          icon: <ApartmentOutlined />,
          label: '诊所管理'
        },
        {
          key: '/system/factory',
          icon: <BankOutlined />,
          label: '工厂管理'
        }
      ]
    }
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    return [location.pathname]
  }

  // 获取默认展开的菜单项
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

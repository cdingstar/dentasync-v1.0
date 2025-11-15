import React, { useState } from 'react'
import { Layout, Badge, Avatar, Space, Dropdown, message, Modal, Select, Button, List } from 'antd'
import { 
  BellOutlined, 
  UserOutlined, 
  QuestionCircleOutlined,
  CommentOutlined,
  LockOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const { Header: AntHeader } = Layout
const { Option } = Select

function Header() {
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [selectedFactory, setSelectedFactory] = useState(null)
  const navigate = useNavigate()

  // 用户信息
  const userName = '黄总' // 可以从用户登录状态获取
  const userInitial = userName.charAt(0) // 获取第一个字符

  // 客服列表数据
  const serviceList = [
    {
      id: 1,
      name: '奥齿方',
      avatar: '👨‍💼',
      expertise: '种植修复技术|种植修复方案'
    },
    {
      id: 2,
      name: '黄婷婷',
      avatar: '👩',
      expertise: '个性化修复技术|个性化方案|美学修复技术|美学修复方案'
    },
    {
      id: 3,
      name: '何汾蔓',
      avatar: '👨',
      expertise: '金属与全瓷修复技术|金属与全瓷修复方案'
    },
    {
      id: 4,
      name: '黄礼祝',
      avatar: '👩‍⚕️',
      expertise: '铸瓷修复方案'
    },
    {
      id: 5,
      name: '黄皓莱',
      avatar: '👨‍⚕️',
      expertise: '正畸技术|正畸方案'
    },
    {
      id: 6,
      name: '李文贞',
      avatar: '👨‍💼',
      expertise: '活动修复技术|活动修复方案'
    }
  ]

  // 工厂选项（示例数据）
  const factories = [
    { id: 1, name: '后齐科技' },
    { id: 2, name: '优齿工厂' },
    { id: 3, name: '精工义齿' }
  ]

  // 用户菜单项
  const userMenuItems = [
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: '帮助',
      onClick: () => message.info('帮助中心')
    },
    {
      key: 'feedback',
      icon: <CommentOutlined />,
      label: '反馈',
      onClick: () => message.info('意见反馈')
    },
    {
      key: 'lock',
      icon: <LockOutlined />,
      label: '锁定屏幕',
      onClick: () => message.info('锁定屏幕')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        message.success('已退出登录')
        // 这里可以添加退出登录的逻辑
      }
    }
  ]

  const handleOpenService = () => {
    setIsServiceModalVisible(true)
  }

  const handleCloseService = () => {
    setIsServiceModalVisible(false)
    setSelectedFactory(null)
  }

  const handleChat = (service) => {
    setIsServiceModalVisible(false)
    navigate('/messages', { 
      state: { 
        serviceId: service.id,
        service: service
      } 
    })
  }

  const handleCall = (service) => {
    message.success(`拨打 ${service.name} 的电话`)
    // 这里可以集成实际的电话功能
  }

  return (
    <AntHeader className="app-header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🦷</span>
          <span className="logo-text">DentaSync</span>
        </div>
      </div>
      <div className="header-right">
        <Space size="large">
          <Badge count={70} overflowCount={99}>
            <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
          </Badge>
          <div className="service-icon-wrapper" onClick={handleOpenService}>
            <CustomerServiceOutlined style={{ fontSize: 16 }} />
          </div>
          <div className="header-company">ASIANTECH PTE. LTD.</div>
          <Dropdown 
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar 
              shape="square"
              style={{ 
                backgroundColor: '#1890ff', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 500
              }}
            >
              {userInitial}
            </Avatar>
          </Dropdown>
        </Space>
      </div>

      <Modal
        title="生产单位助理"
        open={isServiceModalVisible}
        onCancel={handleCloseService}
        footer={[
          <Button key="close" onClick={handleCloseService}>
            关闭
          </Button>
        ]}
        width={700}
        className="service-modal"
      >
        <div className="service-select">
          <Select
            placeholder="请选择加工厂"
            style={{ width: '100%' }}
            size="large"
            value={selectedFactory}
            onChange={setSelectedFactory}
            allowClear
          >
            {factories.map(factory => (
              <Option key={factory.id} value={factory.id}>
                {factory.name}
              </Option>
            ))}
          </Select>
        </div>

        <List
          className="service-list"
          dataSource={serviceList}
          renderItem={(item) => (
            <List.Item
              className="service-item"
              actions={[
                <Button
                  key="chat"
                  type="primary"
                  shape="circle"
                  icon={<MessageOutlined />}
                  onClick={() => handleChat(item)}
                />,
                <Button
                  key="call"
                  type="primary"
                  shape="circle"
                  icon={<PhoneOutlined />}
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                  onClick={() => handleCall(item)}
                />
              ]}
            >
              <List.Item.Meta
                avatar={<div className="service-avatar">{item.avatar}</div>}
                title={<span className="service-name">{item.name}</span>}
                description={<span className="service-expertise">{item.expertise}</span>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </AntHeader>
  )
}

export default Header

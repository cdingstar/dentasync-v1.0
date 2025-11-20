import { useState } from 'react'
import { Layout, Badge, Avatar, Space, Dropdown, message, Modal, Select, Button, List, Form, Input } from 'antd'
import { 
  BellOutlined, 
  QuestionCircleOutlined,
  IdcardOutlined,
  LockOutlined,
  KeyOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import PersonalInfoModal from './PersonalInfoModal'
import './Header.css'

const { Header: AntHeader } = Layout
const { Option } = Select

function Header({ currentUser, onLogout, onOpenMessages }) {
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false)
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false)
  const [selectedFactory, setSelectedFactory] = useState(null)
  const [passwordForm] = Form.useForm()

  // 用户信息
  const userName = currentUser?.shortName || currentUser?.username || '用户'
  const userInitial = userName.charAt(0).toUpperCase() // 获取第一个字符并转大写

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
      key: 'personal-info',
      icon: <IdcardOutlined />,
      label: '个人信息',
      onClick: () => setIsPersonalInfoVisible(true)
    },
    {
      key: 'contact',
      icon: <QuestionCircleOutlined />,
      label: '联系我们',
      onClick: () => setIsContactModalVisible(true)
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
      key: 'change-password',
      icon: <KeyOutlined />,
      label: '修改密码',
      onClick: () => setIsChangePasswordVisible(true)
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        Modal.confirm({
          title: '确认退出',
          content: '确定要退出登录吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            message.success('已退出登录')
            onLogout()
          }
        })
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
    message.info(`开始与 ${service.name} 的对话`)
    // 这里可以在MessagesModal中集成客服对话功能
  }

  const handleCall = (service) => {
    message.success(`拨打 ${service.name} 的电话`)
    // 这里可以集成实际的电话功能
  }

  // 修改密码处理
  const handleChangePassword = () => {
    passwordForm.validateFields().then(values => {
      // 这里可以添加实际的修改密码逻辑
      console.log('修改密码:', values)
      message.success('密码修改成功！')
      setIsChangePasswordVisible(false)
      passwordForm.resetFields()
    }).catch(err => {
      console.log('验证失败:', err)
    })
  }

  const handleCancelChangePassword = () => {
    setIsChangePasswordVisible(false)
    passwordForm.resetFields()
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
            <BellOutlined 
              style={{ fontSize: 18, cursor: 'pointer' }} 
              onClick={onOpenMessages}
            />
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

      {/* 联系我们对话框 */}
      <Modal
        title="联系我们（反馈问题或意见）"
        open={isContactModalVisible}
        onCancel={() => setIsContactModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsContactModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={500}
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              加入我们
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.8' }}>
              邮箱：<a href="mailto:asiantechdentallab@gmail.com" style={{ color: '#1890ff' }}>asiantechdentallab@gmail.com</a>
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.8' }}>
              电话：<a href="tel:+6598625613" style={{ color: '#1890ff' }}>Tom Huang +65 98625613</a>
            </p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              运营管理
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              请联系：<a href="mailto:asiantechdentallab@gmail.com" style={{ color: '#1890ff' }}>asiantechdentallab@gmail.com</a>
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              产品技术
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              请联系：<a href="mailto:cdingstar@gmail.com" style={{ color: '#1890ff' }}>cdingstar@gmail.com</a>
            </p>
          </div>
        </div>
      </Modal>

      {/* 个人信息对话框 */}
      <PersonalInfoModal
        visible={isPersonalInfoVisible}
        onClose={() => setIsPersonalInfoVisible(false)}
        currentUser={currentUser}
      />

      {/* 修改密码对话框 */}
      <Modal
        title="修改密码"
        open={isChangePasswordVisible}
        onOk={handleChangePassword}
        onCancel={handleCancelChangePassword}
        width={500}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={passwordForm}
          layout="vertical"
          style={{ paddingTop: '20px' }}
        >
          <Form.Item
            label="原密码"
            name="oldPassword"
            rules={[
              { required: true, message: '请输入原密码' }
            ]}
          >
            <Input.Password placeholder="请输入原密码" size="large" />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password placeholder="请输入新密码" size="large" />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </AntHeader>
  )
}

export default Header

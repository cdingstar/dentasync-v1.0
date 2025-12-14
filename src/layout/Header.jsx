import { useState } from 'react'
import { Layout, Badge, Avatar, Space, Dropdown, message, Modal, Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  BellOutlined,
  QuestionCircleOutlined,
  IdcardOutlined,
  KeyOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  GlobalOutlined,
  CheckOutlined
} from '@ant-design/icons'
import PersonalInfoModal from './PersonalInfoModal'
import './Header.css'
import { Tooltip } from 'antd'

const { Header: AntHeader } = Layout

function Header({ currentUser, onLogout, onOpenMessages }) {
  const { t, i18n } = useTranslation()
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false)
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [passwordForm] = Form.useForm()

  // User info
  const userName = currentUser?.shortName || currentUser?.username || '用户'
  const userInitial = userName.charAt(0).toUpperCase() // 获取第一个字符并转大写

  // User menu items
  const userMenuItems = [
    {
      key: 'personal-info',
      icon: <IdcardOutlined />,
      label: t('header.personalInfo'),
      onClick: () => setIsPersonalInfoVisible(true)
    },
    {
      key: 'contact',
      icon: <QuestionCircleOutlined />,
      label: t('header.contactUs'),
      onClick: () => setIsContactModalVisible(true)
    },
    {
      key: 'about',
      icon: <QuestionCircleOutlined />,
      label: t('header.aboutUs'),
      onClick: () => setIsAboutVisible(true)
    },
    {
      type: 'divider'
    },
    {
      key: 'system-settings',
      icon: <SettingOutlined />,
      label: t('menu.systemSettings'),
      children: [
        {
          key: 'language',
          label: t('menu.language'),
          icon: <GlobalOutlined />,
          children: [
            {
              key: 'lang-zh',
              label: (
                <Space>
                  <span>{t('menu.chinese')}</span>
                  {i18n.language === 'zh' && <CheckOutlined style={{ color: '#1890ff' }} />}
                </Space>
              ),
              onClick: () => i18n.changeLanguage('zh')
            },
            {
              key: 'lang-en',
              label: (
                <Space>
                  <span>{t('menu.english')}</span>
                  {i18n.language === 'en' && <CheckOutlined style={{ color: '#1890ff' }} />}
                </Space>
              ),
              onClick: () => i18n.changeLanguage('en')
            }
          ]
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      key: 'change-password',
      icon: <KeyOutlined />,
      label: t('header.changePassword'),
      onClick: () => setIsChangePasswordVisible(true)
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('header.logout'),
      onClick: () => {
        Modal.confirm({
          title: t('header.logout'),
          content: t('header.confirmLogout'),
          okText: t('common.confirm'),
          cancelText: t('common.cancel'),
          onOk: () => {
            message.success(t('header.logoutSuccess'))
            onLogout()
          }
        })
      }
    }
  ]

  const handleOpenService = () => {
    onOpenMessages && onOpenMessages('atme')
  }

  // Handle password change
  const handleChangePassword = () => {
    passwordForm.validateFields().then(values => {
      // 这里可以添加实际的修改密码逻辑
      console.log('修改密码:', values)
      message.success(t('header.passwordChanged'))
      setIsChangePasswordVisible(false)
      passwordForm.resetFields()
    }).catch(err => {
      console.log(t('header.validationFailed'), err)
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
          <span className="app-logo-icon">
            <svg viewBox="0 0 100 100" width="100%" height="100%" aria-label="DentaSync Logo">
              <defs>
                <linearGradient id="dsGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1890ff" />
                  <stop offset="100%" stopColor="#40a9ff" />
                </linearGradient>
              </defs>
              {/* Background square provided by container, drawing only letters for simplicity */}
              <text x="50" y="62" textAnchor="middle" fontSize="60" fontWeight="700" fill="#ffffff" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif">
                DS
              </text>
            </svg>
          </span>
          <div className="logo-title">
            <Tooltip
              placement="bottomLeft"
              title={(
                <div>
                  <div>{t('header.systemVersion')}</div>
                  <div>{t('header.companyNameValue')}</div>
                  <div>{t('header.copyright')}</div>
                </div>
              )}
            >
              <span className="logo-name">{t('header.brandName')} V1.0</span>
            </Tooltip>
            {/* Remove subtitle: change to show Tooltip on hover */}
          </div>
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
          <div className="header-company">{t('header.operatingUnitValue')}</div>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar
              shape="square"
              size={32}
              style={{
                backgroundColor: '#1890ff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '4px'
              }}
            >
              {userInitial}
            </Avatar>
          </Dropdown>
        </Space>
      </div>

      {/* Contact Us Modal */}
      <Modal
        title={t('header.contactUsTitle')}
        open={isContactModalVisible}
        onCancel={() => setIsContactModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsContactModalVisible(false)}>
            {t('common.close')}
          </Button>
        ]}
        width={500}
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              {t('header.joinUs')}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.8' }}>
              {t('header.emailLabel')}<a href={"mailto:" + t('header.contactEmail')} style={{ color: '#1890ff' }}>{t('header.contactEmail')}</a>
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.8' }}>
              {t('header.phoneLabel')}<a href={"tel:" + t('header.contactPhoneValue').replace(/\s/g, '')} style={{ color: '#1890ff' }}>{t('header.contactPersonValue')} {t('header.contactPhoneValue')}</a>
            </p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              {t('header.operationManagement')}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              {t('header.pleaseContact')}<a href={"mailto:" + t('header.contactEmail')} style={{ color: '#1890ff' }}>{t('header.contactEmail')}</a>
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
              {t('header.productTech')}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              {t('header.pleaseContact')}<a href={"mailto:" + t('header.techEmail')} style={{ color: '#1890ff' }}>{t('header.techEmail')}</a>
            </p>
          </div>
        </div>
      </Modal>

      {/* Personal Info Modal */}
      <PersonalInfoModal
        visible={isPersonalInfoVisible}
        onClose={() => setIsPersonalInfoVisible(false)}
        currentUser={currentUser}
      />

      {/* Change Password Modal */}
      <Modal
        title={t('header.changePasswordTitle')}
        open={isChangePasswordVisible}
        onOk={handleChangePassword}
        onCancel={handleCancelChangePassword}
        width={500}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          style={{ paddingTop: '20px' }}
        >
          <Form.Item
            label={t('header.oldPassword')}
            name="oldPassword"
            rules={[
              { required: true, message: t('header.oldPasswordPlaceholder') }
            ]}
          >
            <Input.Password placeholder={t('header.oldPasswordPlaceholder')} size="large" />
          </Form.Item>

          <Form.Item
            label={t('header.newPassword')}
            name="newPassword"
            rules={[
              { required: true, message: t('header.newPasswordPlaceholder') },
              { min: 6, message: t('header.passwordMinLength') }
            ]}
          >
            <Input.Password placeholder={t('header.newPasswordPlaceholder')} size="large" />
          </Form.Item>

          <Form.Item
            label={t('header.confirmPassword')}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: t('header.confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('header.passwordMismatch')))
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('header.confirmPasswordPlaceholder')} size="large" />
          </Form.Item>
        </Form>
      </Modal>

      {/* About Us Modal */}
      <Modal
        title={t('header.aboutUsTitle')}
        open={isAboutVisible}
        onCancel={() => setIsAboutVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsAboutVisible(false)}>
            {t('common.close')}
          </Button>
        ]}
        width={600}
      >
        <div style={{ padding: '20px 0' }}>
          {/* Product Info */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: '#1890ff',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <svg viewBox="0 0 100 100" width="60" height="60">
                <text x="50" y="62" textAnchor="middle" fontSize="60" fontWeight="700" fill="#ffffff" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">
                  DS
                </text>
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0', color: '#333' }}>
              {t('header.brandName')}
            </h2>
            <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>
              {t('header.version')} V1.0 (Build 1.0.1121)
            </p>
          </div>

          {/* Company Info */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '8px' }}>
              {t('header.companyInfo')}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
              <strong>{t('header.companyNameLabel')}</strong>{t('header.companyNameValue')}
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
              <strong>{t('header.operatingUnitLabel')}</strong>{t('header.operatingUnitValue')}
            </p>
          </div>

          {/* Contact Info */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '8px' }}>
              {t('header.contactUs')}
            </h3>
            <div style={{ display: 'flex', gap: '32px' }}>
              {/* Left Column - Business Contact */}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1890ff' }}>
                  {t('header.businessContact')}
                </h4>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
                  <strong>{t('header.contactPersonLabel')}</strong>{t('header.contactPersonValue')}
                </p>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
                  <strong>{t('header.phoneLabel')}</strong>
                  <a href={"tel:" + t('header.contactPhoneValue').replace(/\s/g, '')} style={{ color: '#1890ff', marginLeft: '4px' }}>{t('header.contactPhoneValue')}</a>
                </p>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
                  <strong>{t('header.emailLabel')}</strong>
                  <a href={"mailto:" + t('header.contactEmail')} style={{ color: '#1890ff', marginLeft: '4px' }}>{t('header.contactEmail')}</a>
                </p>
              </div>
              
              {/* Right Column - Product Tech Feedback */}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1890ff' }}>
                  {t('header.techFeedback')}
                </h4>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
                  <strong>{t('header.emailLabel')}</strong>
                  <a href={"mailto:" + t('header.techEmail')} style={{ color: '#1890ff', marginLeft: '4px' }}>{t('header.techEmail')}</a>
                </p>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.8' }}>
                  {t('header.feedbackNote')}
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Info */}
          <div style={{ 
            marginTop: '32px', 
            paddingTop: '20px', 
            borderTop: '1px solid #f0f0f0',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '13px', color: '#999', margin: '4px 0' }}>
              © 2025 {t('header.companyNameValue')}
            </p>
            <p style={{ fontSize: '13px', color: '#999', margin: '4px 0' }}>
              {t('header.rightsReserved')}
            </p>
            <p style={{ fontSize: '12px', color: '#bbb', margin: '8px 0 0 0' }}>
              {t('header.poweredBy')}
            </p>
          </div>
        </div>
      </Modal>
    </AntHeader>
  )
}

export default Header

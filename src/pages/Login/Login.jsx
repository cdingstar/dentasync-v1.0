import { useState } from 'react'
import { Form, Input, Button, message, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Login.css'

const { Option } = Select

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = (values) => {
    setLoading(true)
    
    // 验证用户名和密码
    const correctUsername = 'asiantechdentallab@gmail.com'
    const correctPassword = 'asiantech001'
    
    setTimeout(() => {
      if (values.username === correctUsername && values.password === correctPassword) {
        message.success(t('login.success'))
        onLogin({
          username: values.username,
          shortName: 'AD',
          tempRole: values.tempRole
        })
      } else {
        message.error(t('login.failed'))
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">DS</div>
          </div>
          <h1 className="system-title">DentaSync</h1>
          <p className="system-version">V1.0</p>
        </div>

        <Form
          name="login"
          className="login-form"
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={{
            username: 'asiantechdentallab@gmail.com',
            password: 'asiantech001'
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder={t('login.usernamePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder={t('login.passwordPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item name="tempRole">
            <Select placeholder={t('login.rolePlaceholder')} size="large">
              <Option value="clinic_admin">{t('roles.clinicAdmin')}</Option>
              <Option value="clinic_doctor">{t('roles.clinicDoctor')}</Option>
              <Option value="clinic_assistant">{t('roles.clinicAssistant')}</Option>
              <Option value="factory_admin">{t('roles.factoryAdmin')}</Option>
              <Option value="factory_assistant">{t('roles.factoryAssistant')}</Option>
              <Option value="factory_technician">{t('roles.factoryTechnician')}</Option>
              <Option value="super_admin">{t('roles.superAdmin')}</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
              size="large"
              block
            >
              {t('login.loginButton')}
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <p className="copyright">{t('login.copyright')}</p>
          <p className="company">{t('login.company')}</p>
        </div>
      </div>
    </div>
  )
}

export default Login

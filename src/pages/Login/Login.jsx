import { useState } from 'react'
import { Form, Input, Button, message, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.css'

const { Option } = Select

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    
    // 验证用户名和密码
    const correctUsername = 'asiantechdentallab@gmail.com'
    const correctPassword = 'asiantech001'
    
    setTimeout(() => {
      if (values.username === correctUsername && values.password === correctPassword) {
        message.success('登录成功！')
        onLogin({
          username: values.username,
          shortName: 'AD',
          tempRole: values.tempRole
        })
      } else {
        message.error('用户名或密码错误！')
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
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item name="tempRole">
            <Select placeholder="请选择临时角色（选填）" size="large">
              <Option value="诊所-管理员">诊所-管理员</Option>
              <Option value="诊所-医生">诊所-医生</Option>
              <Option value="诊所-助理">诊所-助理</Option>
              <Option value="工厂-管理员">工厂-管理员</Option>
              <Option value="工厂-助理">工厂-助理</Option>
              <Option value="工厂-技师">工厂-技师</Option>
              <Option value="超级管理员">超级管理员</Option>
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
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <p className="copyright">Copyright © 2025</p>
          <p className="company">Premium Dental Services Pte. Ltd.</p>
        </div>
      </div>
    </div>
  )
}

export default Login

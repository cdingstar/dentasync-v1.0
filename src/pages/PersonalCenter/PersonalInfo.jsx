import React, { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Avatar } from 'antd'
import { UserOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import './PersonalInfo.css'

const { TextArea } = Input

function PersonalInfo() {
  const [form] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState('')

  const initialValues = {
    username: 'admin',
    realName: '管理员',
    email: 'admin@asiantech.com',
    phone: '+65 1234 5678',
    clinic: 'ASIANTECH PTE. LTD.',
    position: '诊所管理员',
    address: 'Singapore'
  }

  const handleSubmit = (values) => {
    console.log('保存个人信息:', values)
    message.success('保存成功！')
  }

  const handleAvatarUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件！')
      return false
    }
    
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
    message.success('头像上传成功')
    return false
  }

  return (
    <div className="personal-info-container">
      <div className="personal-header">
        <div className="avatar-wrapper">
          <Avatar 
            size={64} 
            icon={<UserOutlined />}
            src={avatarUrl}
            className="user-avatar"
          />
          <Upload
            showUploadList={false}
            beforeUpload={handleAvatarUpload}
            accept="image/*"
          >
            <div className="avatar-upload-overlay">
              <PlusOutlined />
            </div>
          </Upload>
        </div>
        <div className="personal-title">
          <h2>{initialValues.realName}</h2>
          <span className="position-tag">{initialValues.position}</span>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Card 
          title={<span className="section-title">基本信息</span>}
          className="section-card"
        >
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">用户名:</label>
              <div className="form-control">
                <Form.Item name="username" noStyle>
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="form-label">真实姓名:</label>
              <div className="form-control">
                <Form.Item name="realName" noStyle>
                  <Input placeholder="请输入真实姓名" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">邮箱:</label>
              <div className="form-control">
                <Form.Item name="email" noStyle>
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </div>
              <label className="form-label">联系电话:</label>
              <div className="form-control">
                <Form.Item name="phone" noStyle>
                  <Input placeholder="请输入联系电话" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">所属诊所:</label>
              <div className="form-control">
                <Form.Item name="clinic" noStyle>
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="form-label">职位:</label>
              <div className="form-control">
                <Form.Item name="position" noStyle>
                  <Input placeholder="请输入职位" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row full-width">
              <label className="form-label">地址:</label>
              <div className="form-control-full">
                <Form.Item name="address" noStyle>
                  <TextArea 
                    placeholder="请输入地址" 
                    rows={2}
                    style={{ resize: 'none' }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Card>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
            保存
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PersonalInfo

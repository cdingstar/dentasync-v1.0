import React, { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Avatar } from 'antd'
import { UserOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './PersonalInfo.css'

const { TextArea } = Input

function PersonalInfo() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState('')

  const initialValues = {
    username: 'admin',
    realName: t('personalInfo.mockData.admin'),
    email: 'admin@asiantech.com',
    phone: '+65 1234 5678',
    clinic: 'ASIANTECH PTE. LTD.',
    position: t('personalInfo.mockData.clinicAdmin'),
    address: 'Singapore'
  }

  const handleSubmit = (values) => {
    console.log(t('personalInfo.saveLog'), values)
    message.success(t('personalInfo.saveSuccess'))
  }

  const handleAvatarUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error(t('personalInfo.uploadError'))
      return false
    }
    
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
    message.success(t('personalInfo.uploadSuccess'))
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
          title={<span className="section-title">{t('personalInfo.basicInfo')}</span>}
          className="section-card"
        >
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">{t('personalInfo.username')}:</label>
              <div className="form-control">
                <Form.Item name="username" noStyle>
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="form-label">{t('personalInfo.realName')}:</label>
              <div className="form-control">
                <Form.Item name="realName" noStyle>
                  <Input placeholder={t('personalInfo.realNamePlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('personalInfo.email')}:</label>
              <div className="form-control">
                <Form.Item name="email" noStyle>
                  <Input placeholder={t('personalInfo.emailPlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('personalInfo.phone')}:</label>
              <div className="form-control">
                <Form.Item name="phone" noStyle>
                  <Input placeholder={t('personalInfo.phonePlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('personalInfo.clinic')}:</label>
              <div className="form-control">
                <Form.Item name="clinic" noStyle>
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="form-label">{t('personalInfo.position')}:</label>
              <div className="form-control">
                <Form.Item name="position" noStyle>
                  <Input placeholder={t('personalInfo.positionPlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row full-width">
              <label className="form-label">{t('personalInfo.address')}:</label>
              <div className="form-control-full">
                <Form.Item name="address" noStyle>
                  <TextArea 
                    placeholder={t('personalInfo.addressPlaceholder')}
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
            {t('personalInfo.save')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PersonalInfo

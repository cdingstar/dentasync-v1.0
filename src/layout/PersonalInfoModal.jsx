import { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Upload, message, Avatar } from 'antd'
import { UserOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './PersonalInfoModal.css'

const { TextArea } = Input

function PersonalInfoModal({ visible, onClose, currentUser }) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [avatarUrl, setAvatarUrl] = useState('')

  const initialValues = {
    username: currentUser?.username || 'admin',
    realName: currentUser?.shortName || t('personalInfo.mockData.admin'),
    email: currentUser?.username || 'admin@asiantech.com',
    phone: '+65 1234 5678',
    clinic: 'ASIANTECH PTE. LTD.',
    role: t('personalInfo.mockData.clinicAdmin'),
    address: 'Singapore'
  }

  // 当语言改变或模态框打开时更新表单值
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues)
    }
  }, [visible, t, form])

  const handleSubmit = (values) => {
    console.log('保存个人信息:', values)
    message.success(t('personalInfo.saveSuccess'))
    onClose()
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
    <Modal
      title={t('personalInfo.title')}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      className="personal-info-modal"
    >
      <div className="personal-info-content">
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
            <span className="position-tag">{initialValues.role}</span>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
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
              <label className="form-label">{t('personalInfo.role')}:</label>
              <div className="form-control">
                <Form.Item name="role" noStyle>
                  <Input disabled />
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

          <div className="form-actions">
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
              {t('personalInfo.save')}
            </Button>
            <Button size="large" onClick={onClose} style={{ marginLeft: 12 }}>
              {t('common.cancel')}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default PersonalInfoModal

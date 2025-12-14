import { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Image, DatePicker } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import '../InfoSetting/UnitInfo.css'
import dayjs from 'dayjs'

function FactoryInfo() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [certificateImages, setCertificateImages] = useState([
    { id: 1, name: t('factoryInfo.license1'), url: '/placeholder-license.jpg' },
    { id: 2, name: t('factoryInfo.license2'), url: '/placeholder-factory-license.jpg' }
  ])

  const initialValues = {
    detailedAddress: t('factoryInfo.mockData.detailedAddress'),
    contactPerson: t('factoryInfo.managerDefault'),
    contactPhone: '006598600000',

    displayName: t('factoryInfo.mockData.asiantech'),
    shortName: t('factoryInfo.mockData.atf'),
    simpleAddress: '-',
    productionLicense: 'F-2156466507962',
    licenseIssueDate: dayjs('2024-11-02'),
    licenseValidity: t('factoryInfo.longTerm'),
    businessLicense: 'F-2156466507962',
    factoryArea: '-',
    businessLicenseExpiry: '-',
    openingDate: dayjs('2024-11-02'),
    phoneNumber: '-',
    deviceCount: '10'
  }

  const handleSubmit = (values) => {
    console.log('Submit factory info:', values, { certificateImages })
    message.success(t('factoryInfo.saveSuccess'))
  }

  const handleCertificateUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error(t('factoryInfo.onlyImages'))
      return false
    }
    const newImage = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file)
    }
    setCertificateImages([...certificateImages, newImage])
    message.success(t('factoryInfo.uploadSuccess'))
    return false
  }

  const handleDeleteImage = (id) => {
    setCertificateImages(certificateImages.filter(img => img.id !== id))
    message.success(t('factoryInfo.deleteSuccess'))
  }

  return (
    <div className="clinic-info-container">
      <div className="clinic-header">
        <div className="clinic-logo">
          <div className="logo-placeholder"></div>
        </div>
        <div className="clinic-title">
          <h2>{t('factoryInfo.mockData.asiantech')}</h2>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Card title={<span className="section-title">{t('factoryInfo.basicInfo')}</span>} className="section-card">
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">{t('factoryInfo.detailedAddress')}</label>
              <div className="form-control full-width">
                <Form.Item name="detailedAddress" noStyle>
                  <Input placeholder={t('factoryInfo.detailedAddressPlaceholder')} />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">{t('factoryInfo.manager')}</label>
              <div className="form-control">
                <Form.Item name="contactPerson" noStyle>
                  <Input placeholder={t('factoryInfo.managerPlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.managerPhone')}</label>
              <div className="form-control">
                <Form.Item name="contactPhone" noStyle>
                  <Input placeholder={t('factoryInfo.managerPhonePlaceholder')} />
                </Form.Item>
              </div>
            </div>
          </div>
        </Card>

        <Card title={<span className="section-title">{t('factoryInfo.qualificationInfo')}</span>} className="section-card">
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">{t('factoryInfo.displayName')}</label>
              <div className="form-control">
                <Form.Item name="displayName" noStyle>
                  <Input placeholder={t('factoryInfo.displayNamePlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.shortName')}</label>
              <div className="form-control short">
                <Form.Item name="shortName" noStyle>
                  <Input placeholder={t('factoryInfo.shortNamePlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('factoryInfo.simpleAddress')}</label>
              <div className="form-control">
                <Form.Item name="simpleAddress" noStyle>
                  <Input placeholder={t('factoryInfo.simpleAddressPlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.businessLicenseExpiry')}</label>
              <div className="form-control">
                <Form.Item name="businessLicenseExpiry" noStyle>
                  <Input placeholder={t('factoryInfo.businessLicenseExpiryPlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('factoryInfo.productionLicense')}</label>
              <div className="form-control">
                <Form.Item name="productionLicense" noStyle>
                  <Input placeholder={t('factoryInfo.productionLicensePlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.joinDate')}</label>
              <div className="form-control">
                <Form.Item name="licenseIssueDate" noStyle>
                  <DatePicker placeholder={t('factoryInfo.joinDatePlaceholder')} style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('factoryInfo.licenseValidity')}</label>
              <div className="form-control short">
                <Form.Item name="licenseValidity" noStyle>
                  <Input placeholder={t('factoryInfo.licenseValidityPlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.factoryArea')}</label>
              <div className="form-control short">
                <Form.Item name="factoryArea" noStyle>
                  <Input placeholder={t('factoryInfo.factoryAreaPlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('factoryInfo.businessLicense')}</label>
              <div className="form-control">
                <Form.Item name="businessLicense" noStyle>
                  <Input placeholder={t('factoryInfo.businessLicensePlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.openingDate')}</label>
              <div className="form-control">
                <Form.Item name="openingDate" noStyle>
                  <DatePicker placeholder={t('factoryInfo.openingDatePlaceholder')} style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('factoryInfo.factoryPhone')}</label>
              <div className="form-control short">
                <Form.Item name="phoneNumber" noStyle>
                  <Input placeholder={t('factoryInfo.factoryPhonePlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('factoryInfo.deviceCount')}</label>
              <div className="form-control short">
                <Form.Item name="deviceCount" noStyle>
                  <Input placeholder={t('factoryInfo.deviceCountPlaceholder')} />
                </Form.Item>
              </div>
            </div>
          </div>
        </Card>

        <Card title={<span className="section-title">{t('factoryInfo.certificates')}</span>} className="section-card">
          <div className="certificate-section">
            <div className="certificate-grid">
              {certificateImages.map((img) => (
                <div key={img.id} className="certificate-item">
                  <div className="certificate-image-wrapper">
                    <Image
                      src={img.url}
                      alt={img.name}
                      className="certificate-image"
                      fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    />
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      className="delete-btn"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      {t('factoryInfo.delete')}
                    </Button>
                  </div>
                  <div className="certificate-name">{img.name}</div>
                </div>
              ))}

              <Upload
                beforeUpload={handleCertificateUpload}
                showUploadList={false}
                accept="image/*"
              >
                <div className="upload-card">
                  <PlusOutlined className="upload-icon" />
                  <div className="upload-text">{t('factoryInfo.uploadCertificate')}</div>
                </div>
              </Upload>
            </div>
          </div>
        </Card>

        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            {t('factoryInfo.save')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FactoryInfo
import { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Image, DatePicker } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './UnitInfo.css'
import dayjs from 'dayjs'

function UnitInfo() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [certificateImages, setCertificateImages] = useState([
    // Example data
    { id: 1, name: t('factoryInfo.license1'), url: '/placeholder-license.jpg' },
    { id: 2, name: t('clinicInfo.medicalLicense'), url: '/placeholder-medical.jpg' }
  ])

  // Initialize form data
  const initialValues = {
    // Basic info
    clinicName: t('clinicInfo.mockData.clinicName'),
    detailedAddress: t('clinicInfo.mockData.detailedAddress'),
    contactPerson: t('clinicInfo.mockData.tomHuang'),
    contactPhone: '006598625613',
    
    // Qualification info
    displayName: t('clinicInfo.mockData.clinicName'),
    shortName: '-',
    simpleAddress: '-',
    productionLicense: '2156466507962',
    licenseIssueDate: dayjs('2024-11-02'),
    licenseValidity: t('clinicInfo.mockData.longTerm'),
    businessLicense: '2156466507962',
    clinicArea: '-',
    businessLicenseExpiry: '-',
    openingDate: dayjs('2024-11-02'),
    phoneNumber: '-',
    chairCount: '1'
  }

  const handleSubmit = (values) => {
    console.log('Submit clinic info:', values, { certificateImages })
    message.success(t('factoryInfo.saveSuccess'))
  }

  // Handle certificate image upload
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

  // Delete certificate image
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
          <h2>{t('clinicInfo.mockData.clinicName')}</h2>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        {/* Basic info */}
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

        {/* Qualification info */}
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
              <label className="form-label">{t('clinicInfo.clinicArea')}</label>
              <div className="form-control short">
                <Form.Item name="clinicArea" noStyle>
                  <Input placeholder={t('clinicInfo.clinicAreaPlaceholder')} />
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
              <label className="form-label">{t('clinicInfo.clinicPhone')}</label>
              <div className="form-control short">
                <Form.Item name="phoneNumber" noStyle>
                  <Input placeholder={t('clinicInfo.clinicPhonePlaceholder')} />
                </Form.Item>
              </div>
              <label className="form-label">{t('clinicInfo.chairCount')}</label>
              <div className="form-control short">
                <Form.Item name="chairCount" noStyle>
                  <Input placeholder={t('clinicInfo.chairCountPlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row certificates-row">
              <label className="form-label">{t('factoryInfo.certificates')}</label>
              <div className="form-control full-width">
                <div className="certificates-container">
                  {certificateImages.map(img => (
                    <div key={img.id} className="certificate-item">
                      <Image
                        src={img.url}
                        alt={img.name}
                        width={120}
                        height={80}
                        className="certificate-image"
                      />
                      <div className="certificate-info">
                        <span className="certificate-name">{img.name}</span>
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />} 
                          danger
                          className="delete-btn"
                          onClick={() => handleDeleteImage(img.id)}
                        >
                          {t('factoryInfo.delete')}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Upload
                    beforeUpload={handleCertificateUpload}
                    showUploadList={false}
                  >
                    <div className="upload-placeholder">
                      <PlusOutlined />
                      <span>{t('factoryInfo.uploadCertificate')}</span>
                    </div>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" className="save-btn">
            {t('factoryInfo.save')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UnitInfo

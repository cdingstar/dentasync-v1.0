import React, { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Image, Row, Col, Select, DatePicker } from 'antd'
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ClinicInfo.css'
import dayjs from 'dayjs'

const { Option } = Select

function ClinicInfo() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [certificateImages, setCertificateImages] = useState([
    // Sample data
    { id: 1, name: t('clinicInfo.businessLicense'), url: '/placeholder-license.jpg' },
    { id: 2, name: t('clinicInfo.medicalLicense'), url: '/placeholder-medical.jpg' }
  ])

  // Initialize form data
  const initialValues = {
    // Basic Info
    clinicName: 'ASIANTECH PTE. LTD.',
    detailedAddress: t('clinicInfo.mockData.detailedAddress'),
    contactPerson: t('clinicInfo.mockData.contactPerson'),
    contactPhone: '006598625613',
    
    // Qualification Info
    displayName: 'ASIANTECH PTE. LTD.',
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
    message.success(t('clinicInfo.messages.saveSuccess'))
  }

  // Handle certificate image upload
  const handleCertificateUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error(t('clinicInfo.messages.onlyImages'))
      return false
    }
    
    const newImage = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file)
    }
    setCertificateImages([...certificateImages, newImage])
    message.success(t('clinicInfo.messages.uploadSuccess'))
    return false
  }

  // Delete certificate image
  const handleDeleteImage = (id) => {
    setCertificateImages(certificateImages.filter(img => img.id !== id))
    message.success(t('clinicInfo.messages.deleteSuccess'))
  }

  return (
    <div className="clinic-info-container">
      <div className="clinic-header">
        <div className="clinic-logo">
          <div className="logo-placeholder"></div>
        </div>
        <div className="clinic-title">
          <h2>ASIANTECH PTE. LTD.</h2>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        {/* Basic Info */}
        <Card title={<span className="section-title">{t('clinicInfo.basicInfo')}</span>} className="section-card">
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.detailedAddress')}:</span>}
                name="detailedAddress"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.detailedAddress')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.contactPerson')}:</span>}
                name="contactPerson"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.contactPerson')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.contactPhone')}:</span>}
                name="contactPhone"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.contactPhone')} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Qualification Info */}
        <Card title={<span className="section-title">{t('clinicInfo.qualificationInfo')}</span>} className="section-card">
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.displayName')}:</span>}
                name="displayName"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.displayName')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.shortName')}:</span>}
                name="shortName"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.shortName')} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.simpleAddress')}:</span>}
                name="simpleAddress"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.simpleAddress')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.productionLicense')}:</span>}
                name="productionLicense"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.productionLicense')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.joinDate')}:</span>}
                name="licenseIssueDate"
              >
                <DatePicker 
                  className="form-input" 
                  placeholder={t('clinicInfo.placeholders.joinDate')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.licenseValidity')}:</span>}
                name="licenseValidity"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.licenseValidity')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.businessLicense')}:</span>}
                name="businessLicense"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.businessLicense')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.clinicArea')}:</span>}
                name="clinicArea"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.clinicArea')} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.businessLicenseExpiry')}:</span>}
                name="businessLicenseExpiry"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.businessLicenseExpiry')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.openingDate')}:</span>}
                name="openingDate"
              >
                <DatePicker 
                  className="form-input" 
                  placeholder={t('clinicInfo.placeholders.openingDate')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.phoneNumber')}:</span>}
                name="phoneNumber"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.phoneNumber')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>

            <Col span={12}>
              <Form.Item 
                label={<span className="form-label">{t('clinicInfo.chairCount')}:</span>}
                name="chairCount"
              >
                <Input className="form-input" placeholder={t('clinicInfo.placeholders.chairCount')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="empty-col"></div>
            </Col>
          </Row>
        </Card>

        {/* Certificates */}
        <Card title={<span className="section-title">{t('clinicInfo.certificates')}</span>} className="section-card">
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
                      {t('clinicInfo.delete')}
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
                  <div className="upload-text">{t('clinicInfo.uploadCertificate')}</div>
                </div>
              </Upload>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            {t('clinicInfo.save')}
          </Button>
          <Button size="large" style={{ marginLeft: 16 }} onClick={() => form.resetFields()}>
            {t('clinicInfo.reset')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ClinicInfo

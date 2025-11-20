import { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Image, DatePicker } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import './UnitInfo.css'
import dayjs from 'dayjs'

function UnitInfo() {
  const [form] = Form.useForm()
  const [certificateImages, setCertificateImages] = useState([
    // 示例数据
    { id: 1, name: '营业执照', url: '/placeholder-license.jpg' },
    { id: 2, name: '医疗机构执业许可证', url: '/placeholder-medical.jpg' }
  ])

  // 初始化表单数据
  const initialValues = {
    // 基础信息
    clinicName: 'ASIANTECH PTE. LTD.',
    detailedAddress: '东区 Bendemeer 994 Bendemeer Road, #02-04 B-Central, Singapore 339943.',
    contactPerson: '黄向荣',
    contactPhone: '006598625613',
    
    // 资质信息
    displayName: 'ASIANTECH PTE. LTD.',
    shortName: '-',
    simpleAddress: '-',
    productionLicense: '2156466507962',
    licenseIssueDate: dayjs('2024-11-02'),
    licenseValidity: '长期',
    businessLicense: '2156466507962',
    clinicArea: '-',
    businessLicenseExpiry: '-',
    openingDate: dayjs('2024-11-02'),
    phoneNumber: '-',
    chairCount: '1'
  }

  const handleSubmit = (values) => {
    console.log('提交诊所信息:', values, { certificateImages })
    message.success('保存成功！')
  }

  // 处理证件图片上传
  const handleCertificateUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件！')
      return false
    }
    
    const newImage = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file)
    }
    setCertificateImages([...certificateImages, newImage])
    message.success('上传成功')
    return false
  }

  // 删除证件图片
  const handleDeleteImage = (id) => {
    setCertificateImages(certificateImages.filter(img => img.id !== id))
    message.success('删除成功')
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
        {/* 基础信息 */}
        <Card title={<span className="section-title">基础信息</span>} className="section-card">
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">详细地址:</label>
              <div className="form-control full-width">
                <Form.Item name="detailedAddress" noStyle>
                  <Input placeholder="请输入详细地址" />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">负责人:</label>
              <div className="form-control">
                <Form.Item name="contactPerson" noStyle>
                  <Input placeholder="请输入负责人" />
                </Form.Item>
              </div>
              <label className="form-label">负责人电话:</label>
              <div className="form-control">
                <Form.Item name="contactPhone" noStyle>
                  <Input placeholder="请输入负责人电话" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Card>

        {/* 资质信息 */}
        <Card title={<span className="section-title">资质信息</span>} className="section-card">
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">招牌名称:</label>
              <div className="form-control">
                <Form.Item name="displayName" noStyle>
                  <Input placeholder="请输入招牌名称" />
                </Form.Item>
              </div>
              <label className="form-label">简称:</label>
              <div className="form-control short">
                <Form.Item name="shortName" noStyle>
                  <Input placeholder="请输入简称" />
                </Form.Item>
              </div>
            </div>
            
            <div className="form-row">
              <label className="form-label">简略地址:</label>
              <div className="form-control">
                <Form.Item name="simpleAddress" noStyle>
                  <Input placeholder="请输入简略地址" />
                </Form.Item>
              </div>
              <label className="form-label">营业执照期限:</label>
              <div className="form-control">
                <Form.Item name="businessLicenseExpiry" noStyle>
                  <Input placeholder="请输入营业执照期限" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">生产许可证编号:</label>
              <div className="form-control">
                <Form.Item name="productionLicense" noStyle>
                  <Input placeholder="请输入生产许可证编号" />
                </Form.Item>
              </div>
              <label className="form-label">加入时间:</label>
              <div className="form-control">
                <Form.Item name="licenseIssueDate" noStyle>
                  <DatePicker placeholder="请选择加入时间" style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">许可证有效期:</label>
              <div className="form-control short">
                <Form.Item name="licenseValidity" noStyle>
                  <Input placeholder="请输入许可证有效期" />
                </Form.Item>
              </div>
              <label className="form-label">诊所面积(平方):</label>
              <div className="form-control short">
                <Form.Item name="clinicArea" noStyle>
                  <Input placeholder="请输入诊所面积" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">营业执照号码:</label>
              <div className="form-control">
                <Form.Item name="businessLicense" noStyle>
                  <Input placeholder="请输入营业执照号码" />
                </Form.Item>
              </div>
              <label className="form-label">开业时间:</label>
              <div className="form-control">
                <Form.Item name="openingDate" noStyle>
                  <DatePicker placeholder="请选择开业时间" style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">门诊电话:</label>
              <div className="form-control short">
                <Form.Item name="phoneNumber" noStyle>
                  <Input placeholder="请输入门诊电话" />
                </Form.Item>
              </div>
              <label className="form-label">牙椅数(台):</label>
              <div className="form-control short">
                <Form.Item name="chairCount" noStyle>
                  <Input placeholder="请输入牙椅数" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Card>

        {/* 资质证件 */}
        <Card title={<span className="section-title">资质证件</span>} className="section-card">
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
                      删除
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
                  <div className="upload-text">上传证件</div>
                </div>
              </Upload>
            </div>
          </div>
        </Card>

        {/* 提交按钮 */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            保存
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UnitInfo

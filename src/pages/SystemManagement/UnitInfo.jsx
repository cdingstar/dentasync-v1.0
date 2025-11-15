import React, { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Image, Modal, Table, Space, DatePicker } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import './ClinicInfo.css'
import dayjs from 'dayjs'

const { TextArea } = Input

function UnitInfo() {
  const [form] = Form.useForm()
  const [addressForm] = Form.useForm()
  const [certificateImages, setCertificateImages] = useState([
    // 示例数据
    { id: 1, name: '营业执照', url: '/placeholder-license.jpg' },
    { id: 2, name: '医疗机构执业许可证', url: '/placeholder-medical.jpg' }
  ])
  
  // 地址管理状态
  const [addressList, setAddressList] = useState([
    {
      key: '1',
      receiver: '朱华昌',
      phone: '13410490092',
      region: '中国 / 广东省 / 深圳市 / 宝安区',
      detailAddress: '福海街道荔园路56号恺辉茂工业园A411(请转：黄总)',
      isDefault: true
    },
    {
      key: '2',
      receiver: '黄向荣',
      phone: '006598625613',
      region: 'Singapore',
      detailAddress: '东区 Bendemeer 994 Bendemeer Road, #02-04 B-Central',
      isDefault: false
    }
  ])
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

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

  // 地址管理相关函数
  const handleAddAddress = () => {
    setEditingAddress(null)
    addressForm.resetFields()
    setIsAddressModalVisible(true)
  }

  const handleEditAddress = (record) => {
    setEditingAddress(record)
    addressForm.setFieldsValue({
      receiver: record.receiver,
      phone: record.phone,
      region: record.region,
      detailAddress: record.detailAddress
    })
    setIsAddressModalVisible(true)
  }

  const handleDeleteAddress = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      onOk: () => {
        setAddressList(addressList.filter(item => item.key !== key))
        message.success('删除成功')
      }
    })
  }

  const handleAddressModalOk = () => {
    addressForm.validateFields().then(values => {
      if (editingAddress) {
        // 编辑地址
        const newList = addressList.map(item =>
          item.key === editingAddress.key
            ? { ...item, ...values }
            : item
        )
        setAddressList(newList)
        message.success('修改成功')
      } else {
        // 新增地址
        const newAddress = {
          key: Date.now().toString(),
          ...values,
          isDefault: addressList.length === 0
        }
        setAddressList([...addressList, newAddress])
        message.success('添加成功')
      }
      setIsAddressModalVisible(false)
      addressForm.resetFields()
    })
  }

  const handleSetDefault = (key) => {
    const newList = addressList.map(item => ({
      ...item,
      isDefault: item.key === key
    }))
    setAddressList(newList)
    message.success('已设置为默认地址')
  }

  // 地址列表表格列配置
  const addressColumns = [
    {
      title: '收货人',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 100
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: '所在地区',
      dataIndex: 'region',
      key: 'region',
      width: 200
    },
    {
      title: '详细地址',
      dataIndex: 'detailAddress',
      key: 'detailAddress',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditAddress(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAddress(record.key)}
          >
            删除
          </Button>
          {!record.isDefault && (
            <Button
              type="link"
              size="small"
              onClick={() => handleSetDefault(record.key)}
            >
              设为默认
            </Button>
          )}
          {record.isDefault && (
            <span style={{ color: '#1890ff', fontSize: '12px' }}>默认地址</span>
          )}
        </Space>
      )
    }
  ]

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

        {/* 地址管理 */}
        <Card 
          title={<span className="section-title">地址管理</span>} 
          className="section-card"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
              新增地址
            </Button>
          }
        >
          <Table
            columns={addressColumns}
            dataSource={addressList}
            pagination={false}
            scroll={{ x: 800 }}
            size="small"
          />
        </Card>

        {/* 提交按钮 */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            保存
          </Button>
        </div>
      </Form>

      {/* 地址编辑/新增弹窗 */}
      <Modal
        title={
          <div className="modal-title">
            编辑地址
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => setIsAddressModalVisible(false)}
            />
          </div>
        }
        open={isAddressModalVisible}
        onOk={handleAddressModalOk}
        onCancel={() => setIsAddressModalVisible(false)}
        width={600}
        closable={false}
        okText="确定"
        cancelText="取消"
        className="address-modal"
      >
        <Form form={addressForm} layout="vertical">
          <Form.Item
            label={<span className="required-label">收货人</span>}
            name="receiver"
            rules={[{ required: true, message: '请输入收货人' }]}
          >
            <Input placeholder="请输入收货人" size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">联系电话</span>}
            name="phone"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^[0-9+\-\s()]+$/, message: '请输入有效的电话号码' }
            ]}
          >
            <Input placeholder="请输入联系电话" size="large" />
          </Form.Item>

          <Form.Item
            label={<span className="required-label">所在地区</span>}
            name="region"
            rules={[{ required: true, message: '请选择所在地区' }]}
          >
            <Input placeholder="中国 / 广东省 / 深圳市 / 宝安区" size="large" />
          </Form.Item>

          <Form.Item
            label={<span className="required-label">详细地址</span>}
            name="detailAddress"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <TextArea 
              placeholder="请输入详细地址" 
              rows={4} 
              size="large"
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UnitInfo

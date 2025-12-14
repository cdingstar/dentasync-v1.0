import React, { useState } from 'react'
import { Card, Form, Input, Button, Modal, Table, Space, message } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './AddressManagement.css'

const { TextArea } = Input

function AddressManagement() {
  const { t } = useTranslation()
  const [addressForm] = Form.useForm()
  const [addressList, setAddressList] = useState([
    {
      key: '1',
      receiver: 'Zhu Huachang',
      phone: '13410490092',
      region: 'China / Guangdong / Shenzhen / Bao\'an District',
      detailAddress: 'No. 56 Liyuan Road, Fuhai Street, Kaihuimao Industrial Park A411 (Attn: Mr. Huang)',
      isDefault: true
    },
    {
      key: '2',
      receiver: 'Tom Huang',
      phone: '006598625613',
      region: 'Singapore',
      detailAddress: '994 Bendemeer Road, #02-04 B-Central',
      isDefault: false
    }
  ])
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  // Add Address
  const handleAddAddress = () => {
    setEditingAddress(null)
    addressForm.resetFields()
    setIsAddressModalVisible(true)
  }

  // Edit Address
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

  // Delete Address
  const handleDeleteAddress = (key) => {
    Modal.confirm({
      title: t('address.deleteConfirmTitle'),
      content: t('address.deleteConfirmContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setAddressList(addressList.filter(item => item.key !== key))
        message.success(t('address.deleteSuccess'))
      }
    })
  }

  // Save Address
  const handleAddressModalOk = () => {
    addressForm.validateFields().then(values => {
      if (editingAddress) {
        // Edit Address
        const newList = addressList.map(item =>
          item.key === editingAddress.key
            ? { ...item, ...values }
            : item
        )
        setAddressList(newList)
        message.success(t('address.editSuccess'))
      } else {
        // Add Address
        const newAddress = {
          key: Date.now().toString(),
          ...values,
          isDefault: addressList.length === 0
        }
        setAddressList([...addressList, newAddress])
        message.success(t('address.addSuccess'))
      }
      setIsAddressModalVisible(false)
      addressForm.resetFields()
    })
  }

  // Set Default Address
  const handleSetDefault = (key) => {
    const newList = addressList.map(item => ({
      ...item,
      isDefault: item.key === key
    }))
    setAddressList(newList)
    message.success(t('address.setDefaultSuccess'))
  }

  // Address Table Columns Configuration
  const addressColumns = [
    {
      title: t('address.receiver'),
      dataIndex: 'receiver',
      key: 'receiver',
      width: 100
    },
    {
      title: t('address.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: t('address.region'),
      dataIndex: 'region',
      key: 'region',
      width: 200
    },
    {
      title: t('address.detailAddress'),
      dataIndex: 'detailAddress',
      key: 'detailAddress',
      ellipsis: true
    },
    {
      title: t('address.action'),
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
            {t('address.edit')}
          </Button>
          <Button
            type="link"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAddress(record.key)}
          >
            {t('address.delete')}
          </Button>
          {!record.isDefault && (
            <Button
              type="link"
              size="small"
              onClick={() => handleSetDefault(record.key)}
            >
              {t('address.setDefault')}
            </Button>
          )}
          {record.isDefault && (
            <span style={{ color: '#1890ff', fontSize: '12px' }}>{t('address.default')}</span>
          )}
        </Space>
      )
    }
  ]

  return (
    <div className="address-management-container">
      <Card 
        title={<span className="section-title">{t('address.title')}</span>} 
        className="section-card"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
            {t('address.add')}
          </Button>
        }
      >
        <Table
          columns={addressColumns}
          dataSource={addressList}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => t('common.totalItems', { count: total })
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* Address Edit/Add Modal */}
      <Modal
        title={
          <div className="modal-title">
            {editingAddress ? t('address.edit') : t('address.add')}
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => setIsAddressModalVisible(false)}
            />
          </div>
        }
        open={isAddressModalVisible}
        onOk={handleAddressModalOk}
        onCancel={() => setIsAddressModalVisible(false)}
        width={800}
        closable={false}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        className="address-modal"
      >
        <Form form={addressForm} layout="vertical">
          <div className="address-form-grid">
            {/* Left Column */}
            <div className="address-form-column">
              <Form.Item
                label={<span className="required-label">{t('address.receiver')}</span>}
                name="receiver"
                rules={[{ required: true, message: t('address.receiverRequired') }]}
              >
                <Input placeholder={t('address.receiverPlaceholder')} />
              </Form.Item>
              
              <Form.Item
                label={<span className="required-label">{t('address.region')}</span>}
                name="region"
                rules={[{ required: true, message: t('address.regionRequired') }]}
              >
                <Input placeholder={t('address.regionPlaceholder')} />
              </Form.Item>
            </div>
            
            {/* Right Column */}
            <div className="address-form-column">
              <Form.Item
                label={<span className="required-label">{t('address.phone')}</span>}
                name="phone"
                rules={[
                  { required: true, message: t('address.phoneRequired') },
                  { pattern: /^[0-9+\-\s()]+$/, message: t('address.phoneError') }
                ]}
              >
                <Input placeholder={t('address.phonePlaceholder')} />
              </Form.Item>
            </div>
          </div>
          
          {/* Detailed Address Full Width */}
          <Form.Item
            label={<span className="required-label">{t('address.detailAddress')}</span>}
            name="detailAddress"
            rules={[{ required: true, message: t('address.detailAddressRequired') }]}
            className="address-form-full-width"
          >
            <TextArea 
              placeholder={t('address.detailAddressPlaceholder')} 
              rows={3} 
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddressManagement

import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './FactoryManagement.css'

function FactoryManagement() {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      factoryId: 'FAC-001',
      factoryName: t('factoryManagement.mockData.factory1.name'),
      administrator: t('factoryManagement.mockData.factory1.admin'),
      phone: '+86 138 0000 0000',
      email: 'factory@youya.com',
      address: t('factoryManagement.mockData.factory1.address'),
      status: 'active',
      createTime: '2024-11-01'
    },
    {
      key: '2',
      factoryId: 'FAC-002',
      factoryName: t('factoryManagement.mockData.factory2.name'),
      administrator: t('factoryManagement.mockData.factory2.admin'),
      phone: '+86 139 0000 0000',
      email: 'info@jinggong.com',
      address: t('factoryManagement.mockData.factory2.address'),
      status: 'active',
      createTime: '2024-10-28'
    }
  ])
  const [form] = Form.useForm()

  // Auto-generate Factory ID
  const generateFactoryId = () => {
    const maxId = dataSource.reduce((max, item) => {
      const num = parseInt(item.factoryId.replace('FAC-', ''))
      return num > max ? num : max
    }, 0)
    return `FAC-${String(maxId + 1).padStart(3, '0')}`
  }

  const columns = [
    {
      title: t('factoryManagement.factoryId'),
      dataIndex: 'factoryId',
      key: 'factoryId',
      width: 100,
      fixed: 'left'
    },
    {
      title: t('factoryManagement.factoryName'),
      dataIndex: 'factoryName',
      key: 'factoryName',
      width: 200,
      fixed: 'left'
    },
    {
      title: t('factoryManagement.administrator'),
      dataIndex: 'administrator',
      key: 'administrator',
      width: 120
    },
    {
      title: t('factoryManagement.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: t('factoryManagement.email'),
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: t('factoryManagement.address'),
      dataIndex: 'address',
      key: 'address',
      width: 300,
      ellipsis: true
    },
    {
      title: t('factoryManagement.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120
    },
    {
      title: t('factoryManagement.status'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? t('factoryManagement.active') : t('factoryManagement.inactive')}
        </Tag>
      )
    },
    {
      title: t('common.action'),
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('common.edit')}
          </Button>
          <Button 
            type="link" 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            {t('common.delete')}
          </Button>
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    form.setFieldsValue({
      factoryName: record.factoryName,
      administrator: record.administrator,
      phone: record.phone,
      email: record.email,
      address: record.address
    })
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: t('factoryManagement.deleteConfirm'),
      content: t('factoryManagement.deleteMessage'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success(t('factoryManagement.success.delete'))
      }
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // Edit
        const newData = dataSource.map(item => 
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
        setDataSource(newData)
        message.success(t('factoryManagement.success.edit'))
      } else {
        // Add - Auto-generate ID and create time
        const newRecord = {
          key: Date.now().toString(),
          factoryId: generateFactoryId(),
          ...values,
          status: 'active',
          createTime: new Date().toISOString().split('T')[0]
        }
        setDataSource([...dataSource, newRecord])
        message.success(t('factoryManagement.success.add'))
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="factory-management-container">
      <Card
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>{t('factoryManagement.title')}</span>}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t('factoryManagement.addFactory')}
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => t('common.totalItems', { count: total }),
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>

      <Modal
        title={
          <div className="modal-title">
            {editingRecord ? t('factoryManagement.editFactory') : t('factoryManagement.addFactory')}
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => {
                setIsModalVisible(false)
                form.resetFields()
              }}
            />
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        width={600}
        closable={false}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        className="factory-modal"
      >
        <Form form={form} layout="vertical">
          {!editingRecord && (
            <div style={{ 
              marginBottom: 16, 
              padding: '8px 12px', 
              background: '#f0f7ff', 
              borderRadius: 4,
              fontSize: 13,
              color: '#1890ff'
            }}>
              {t('factoryManagement.idAutoGenerated', { id: generateFactoryId() })}
            </div>
          )}
          
          <Form.Item
            label={<span className="required-label">{t('factoryManagement.factoryName')}</span>}
            name="factoryName"
            rules={[{ required: true, message: t('factoryManagement.validation.factoryName') }]}
          >
            <Input placeholder={t('factoryManagement.placeholders.factoryName')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">{t('factoryManagement.administrator')}</span>}
            name="administrator"
            rules={[{ required: true, message: t('factoryManagement.validation.administrator') }]}
          >
            <Input placeholder={t('factoryManagement.placeholders.administrator')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">{t('factoryManagement.phone')}</span>}
            name="phone"
            rules={[
              { required: true, message: t('factoryManagement.validation.phone') },
              { pattern: /^[0-9+\-\s()]+$/, message: t('factoryManagement.validation.phoneInvalid') }
            ]}
          >
            <Input placeholder={t('factoryManagement.placeholders.phone')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={t('factoryManagement.email')}
            name="email"
            rules={[
              { type: 'email', message: t('factoryManagement.validation.emailInvalid') }
            ]}
          >
            <Input placeholder={t('factoryManagement.placeholders.email')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={t('factoryManagement.address')}
            name="address"
          >
            <Input.TextArea 
              placeholder={t('factoryManagement.placeholders.address')} 
              rows={3} 
              size="large"
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default FactoryManagement

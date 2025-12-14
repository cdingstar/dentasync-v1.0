import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ClinicManagement.css'

function ClinicManagement() {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      clinicId: 'CLI-001',
      clinicName: t('clinicManagement.mockData.clinic1.name'),
      administrator: t('clinicManagement.mockData.clinic1.admin'),
      phone: '006598625613',
      email: 'contact@asiantech.com',
      address: t('clinicManagement.mockData.clinic1.address'),
      status: 'active',
      createTime: '2024-11-02'
    },
    {
      key: '2',
      clinicId: 'CLI-002',
      clinicName: t('clinicManagement.mockData.clinic2.name'),
      administrator: t('clinicManagement.mockData.clinic2.admin'),
      phone: '+86 138 0000 0000',
      email: 'info@youya.com',
      address: t('clinicManagement.mockData.clinic2.address'),
      status: 'active',
      createTime: '2024-11-01'
    }
  ])
  const [form] = Form.useForm()

  // Auto-generate Clinic ID
  const generateClinicId = () => {
    const maxId = dataSource.reduce((max, item) => {
      const num = parseInt(item.clinicId.replace('CLI-', ''))
      return num > max ? num : max
    }, 0)
    return `CLI-${String(maxId + 1).padStart(3, '0')}`
  }

  const columns = [
    {
      title: t('clinicManagement.clinicId'),
      dataIndex: 'clinicId',
      key: 'clinicId',
      width: 100,
      fixed: 'left'
    },
    {
      title: t('clinicManagement.clinicName'),
      dataIndex: 'clinicName',
      key: 'clinicName',
      width: 200,
      fixed: 'left'
    },
    {
      title: t('clinicManagement.administrator'),
      dataIndex: 'administrator',
      key: 'administrator',
      width: 120
    },
    {
      title: t('clinicManagement.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: t('clinicManagement.email'),
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: t('clinicManagement.address'),
      dataIndex: 'address',
      key: 'address',
      width: 300,
      ellipsis: true
    },
    {
      title: t('clinicManagement.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120
    },
    {
      title: t('clinicManagement.status'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? t('clinicManagement.active') : t('clinicManagement.inactive')}
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
      clinicName: record.clinicName,
      administrator: record.administrator,
      phone: record.phone,
      email: record.email,
      address: record.address
    })
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: t('clinicManagement.deleteConfirm'),
      content: t('clinicManagement.deleteMessage'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success(t('clinicManagement.success.delete'))
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
        message.success(t('clinicManagement.success.edit'))
      } else {
        // Add - Auto-generate ID and create time
        const newRecord = {
          key: Date.now().toString(),
          clinicId: generateClinicId(),
          ...values,
          status: 'active',
          createTime: new Date().toISOString().split('T')[0]
        }
        setDataSource([...dataSource, newRecord])
        message.success(t('clinicManagement.success.add'))
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="clinic-management-container">
      <Card
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>{t('clinicManagement.title')}</span>}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t('clinicManagement.addClinic')}
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1400 }}
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
            {editingRecord ? t('clinicManagement.editClinic') : t('clinicManagement.addClinic')}
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
        className="clinic-modal"
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
              {t('clinicManagement.idAutoGenerated', { id: generateClinicId() })}
            </div>
          )}
          
          <Form.Item
            label={<span className="required-label">{t('clinicManagement.clinicName')}</span>}
            name="clinicName"
            rules={[{ required: true, message: t('clinicManagement.validation.clinicName') }]}
          >
            <Input placeholder={t('clinicManagement.placeholders.clinicName')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">{t('clinicManagement.administrator')}</span>}
            name="administrator"
            rules={[{ required: true, message: t('clinicManagement.validation.administrator') }]}
          >
            <Input placeholder={t('clinicManagement.placeholders.administrator')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">{t('clinicManagement.phone')}</span>}
            name="phone"
            rules={[
              { required: true, message: t('clinicManagement.validation.phone') },
              { pattern: /^[0-9+\-\s()]+$/, message: t('clinicManagement.validation.phoneInvalid') }
            ]}
          >
            <Input placeholder={t('clinicManagement.placeholders.phone')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={t('clinicManagement.email')}
            name="email"
            rules={[
              { type: 'email', message: t('clinicManagement.validation.emailInvalid') }
            ]}
          >
            <Input placeholder={t('clinicManagement.placeholders.email')} size="large" />
          </Form.Item>
          
          <Form.Item
            label={t('clinicManagement.address')}
            name="address"
          >
            <Input.TextArea 
              placeholder={t('clinicManagement.placeholders.address')} 
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

export default ClinicManagement

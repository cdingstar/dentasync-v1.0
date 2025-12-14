import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ExpressManagement.css'

const { Option } = Select

function ExpressManagement() {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      expressNo: 'SF1234567890',
      orderNo: '102511084444301',
      company: 'expressManagement.companies.sf',
      sender: 'expressManagement.mockData.sender1',
      receiver: 'expressManagement.mockData.receiver1',
      receiverPhone: '+65 1234 5678',
      receiverAddress: 'Singapore Central',
      status: 'in_transit',
      sendTime: '2025-11-11 10:00:00',
      estimatedTime: '2025-11-12 14:00:00'
    },
    {
      key: '2',
      expressNo: 'YTO9876543210',
      orderNo: '102511084444302',
      company: 'expressManagement.companies.yto',
      sender: 'expressManagement.mockData.sender2',
      receiver: 'expressManagement.mockData.receiver2',
      receiverPhone: '+65 8765 4321',
      receiverAddress: 'Singapore East',
      status: 'delivered',
      sendTime: '2025-11-09 15:30:00',
      estimatedTime: '2025-11-10 10:00:00',
      deliveredTime: '2025-11-10 09:45:00'
    }
  ])
  const [form] = Form.useForm()

  const columns = [
    {
      title: t('expressManagement.expressNo'),
      dataIndex: 'expressNo',
      key: 'expressNo',
      width: 150,
      fixed: 'left',
      render: (text) => <a>{text}</a>
    },
    {
      title: t('expressManagement.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150
    },
    {
      title: t('expressManagement.company'),
      dataIndex: 'company',
      key: 'company',
      width: 120,
      render: (text) => t(text)
    },
    {
      title: t('expressManagement.sender'),
      dataIndex: 'sender',
      key: 'sender',
      width: 150,
      render: (text) => t(text)
    },
    {
      title: t('expressManagement.receiver'),
      dataIndex: 'receiver',
      key: 'receiver',
      width: 200,
      render: (text) => t(text)
    },
    {
      title: t('expressManagement.receiverPhone'),
      dataIndex: 'receiverPhone',
      key: 'receiverPhone',
      width: 150
    },
    {
      title: t('expressManagement.status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: t('expressManagement.statusMap.pending'), color: 'default' },
          'in_transit': { text: t('expressManagement.statusMap.in_transit'), color: 'processing' },
          'delivered': { text: t('expressManagement.statusMap.delivered'), color: 'success' },
          'returned': { text: t('expressManagement.statusMap.returned'), color: 'error' }
        }
        const { text, color } = statusMap[status] || { text: status, color: 'default' }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: t('expressManagement.sendTime'),
      dataIndex: 'sendTime',
      key: 'sendTime',
      width: 160
    },
    {
      title: t('expressManagement.estimatedTime'),
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: 160
    },
    {
      title: t('common.action'),
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
          >
            {t('expressManagement.track')}
          </Button>
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
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: t('expressManagement.deleteConfirm'),
      content: t('expressManagement.deleteMessage'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success(t('expressManagement.success.delete'))
      }
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        const newData = dataSource.map(item => 
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
        setDataSource(newData)
        message.success(t('expressManagement.success.edit'))
      } else {
        const newRecord = {
          key: Date.now().toString(),
          ...values,
          status: 'pending',
          sendTime: new Date().toLocaleString(i18n.language === 'zh' ? 'zh-CN' : 'en-US')
        }
        setDataSource([...dataSource, newRecord])
        message.success(t('expressManagement.success.add'))
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="express-management-container">
      <Card 
        title={t('expressManagement.title')}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t('expressManagement.addExpress')}
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => t('common.totalItems', { count: total }),
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? t('common.edit') : t('expressManagement.addExpress')}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="expressNo"
            label={t('expressManagement.expressNo')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label={t('expressManagement.company')}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="expressManagement.companies.sf">{t('expressManagement.companies.sf')}</Option>
              <Option value="expressManagement.companies.yto">{t('expressManagement.companies.yto')}</Option>
              <Option value="expressManagement.companies.zto">{t('expressManagement.companies.zto')}</Option>
              <Option value="expressManagement.companies.dhl">{t('expressManagement.companies.dhl')}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="receiver"
            label={t('expressManagement.receiver')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiverPhone"
            label={t('expressManagement.receiverPhone')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ExpressManagement

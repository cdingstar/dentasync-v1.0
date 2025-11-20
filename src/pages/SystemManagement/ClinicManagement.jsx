import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import './ClinicManagement.css'

function ClinicManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      clinicId: 'CLI-001',
      clinicName: 'ASIANTECH PTE. LTD.',
      administrator: '黄向荣',
      phone: '006598625613',
      email: 'contact@asiantech.com',
      address: '东区 Bendemeer 994 Bendemeer Road, #02-04 B-Central, Singapore 339943.',
      status: 'active',
      createTime: '2024-11-02'
    },
    {
      key: '2',
      clinicId: 'CLI-002',
      clinicName: '优牙诊所',
      administrator: '李医生',
      phone: '+86 138 0000 0000',
      email: 'info@youya.com',
      address: '中国广东省深圳市福田区某某街道',
      status: 'active',
      createTime: '2024-11-01'
    }
  ])
  const [form] = Form.useForm()

  // 自动生成诊所ID
  const generateClinicId = () => {
    const maxId = dataSource.reduce((max, item) => {
      const num = parseInt(item.clinicId.replace('CLI-', ''))
      return num > max ? num : max
    }, 0)
    return `CLI-${String(maxId + 1).padStart(3, '0')}`
  }

  const columns = [
    {
      title: '诊所ID',
      dataIndex: 'clinicId',
      key: 'clinicId',
      width: 100,
      fixed: 'left'
    },
    {
      title: '诊所名称',
      dataIndex: 'clinicName',
      key: 'clinicName',
      width: 200,
      fixed: 'left'
    },
    {
      title: '管理员',
      dataIndex: 'administrator',
      key: 'administrator',
      width: 120
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      ellipsis: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '正常' : '停用'}
        </Tag>
      )
    },
    {
      title: '操作',
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
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
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
      title: '确认删除',
      content: '确定要删除这个诊所吗？删除后将无法恢复。',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success('删除成功')
      }
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑
        const newData = dataSource.map(item => 
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
        setDataSource(newData)
        message.success('修改成功')
      } else {
        // 新增 - 自动生成ID和创建时间
        const newRecord = {
          key: Date.now().toString(),
          clinicId: generateClinicId(),
          ...values,
          status: 'active',
          createTime: new Date().toISOString().split('T')[0]
        }
        setDataSource([...dataSource, newRecord])
        message.success('添加成功')
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="clinic-management-container">
      <Card
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>诊所管理</span>}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增诊所
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 家诊所`,
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>

      <Modal
        title={
          <div className="modal-title">
            {editingRecord ? '编辑诊所' : '新增诊所'}
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
        okText="确定"
        cancelText="取消"
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
              诊所ID将自动生成（如：{generateClinicId()}）
            </div>
          )}
          
          <Form.Item
            label={<span className="required-label">诊所名称</span>}
            name="clinicName"
            rules={[{ required: true, message: '请输入诊所名称' }]}
          >
            <Input placeholder="请输入诊所名称" size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">管理员</span>}
            name="administrator"
            rules={[{ required: true, message: '请输入管理员姓名' }]}
          >
            <Input placeholder="请输入管理员姓名" size="large" />
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
            label="邮箱"
            name="email"
            rules={[
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱（选填）" size="large" />
          </Form.Item>
          
          <Form.Item
            label="地址"
            name="address"
          >
            <Input.TextArea 
              placeholder="请输入地址（选填）" 
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

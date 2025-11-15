import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './PersonnelAuth.css'

const { Option } = Select

function PersonnelAuth() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [form] = Form.useForm()

  // 人员数据
  const [personnel, setPersonnel] = useState([
    {
      key: '1',
      name: '黄向荣',
      phone: '006598625613',
      createTime: '2019-02-19 10:30:00',
      role: '医生'
    },
    {
      key: '2',
      name: 'Pacific Dental',
      phone: '6588094949',
      createTime: '2019-03-15 14:20:00',
      role: '医生'
    },
    {
      key: '3',
      name: 'Dr.JoeyChen ChienJou',
      phone: '6586918170',
      createTime: '2018-08-24 09:15:00',
      role: '医生'
    },
    {
      key: '4',
      name: 'Dr.Joel Goh Jin Teck',
      phone: '6598166631',
      createTime: '2019-02-19 16:45:00',
      role: '医生'
    }
  ])

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: '医生',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '人员角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <span style={{ 
          color: role === '医生' ? '#1890ff' : role === '助理' ? '#52c41a' : '#fa8c16',
          fontWeight: 500
        }}>
          {role}
        </span>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
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
          <Popconfirm
            title="确定要删除此人员吗？"
            onConfirm={() => handleDelete(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
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
    setPersonnel(personnel.filter(item => item.key !== key))
    message.success('删除成功')
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑
        setPersonnel(personnel.map(item => 
          item.key === editingRecord.key 
            ? { ...item, ...values }
            : item
        ))
        message.success('编辑成功')
      } else {
        // 新增
        const now = new Date()
        const createTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
        const newRecord = {
          key: Date.now().toString(),
          ...values,
          createTime
        }
        setPersonnel([...personnel, newRecord])
        message.success('添加成功')
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="personnel-auth-container">
      <Card 
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>人员管理</span>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加执业医生
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={personnel}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑人员' : '添加执业医生'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: '医生' }}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^[0-9]+$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="人员角色"
            name="role"
            rules={[{ required: true, message: '请选择人员角色' }]}
          >
            <Select placeholder="请选择人员角色">
              <Option value="医生">医生</Option>
              <Option value="助理">助理</Option>
              <Option value="行政">行政</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PersonnelAuth


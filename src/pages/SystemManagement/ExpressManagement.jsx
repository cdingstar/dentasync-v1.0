import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import './ExpressManagement.css'

const { Option } = Select

function ExpressManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      expressNo: 'SF1234567890',
      orderNo: '102511084444301',
      company: '顺丰速运',
      sender: '优牙义齿加工厂',
      receiver: 'ASIANTECH PTE. LTD.',
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
      company: '圆通速递',
      sender: '精工义齿制造',
      receiver: '优牙诊所',
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
      title: '快递单号',
      dataIndex: 'expressNo',
      key: 'expressNo',
      width: 150,
      fixed: 'left',
      render: (text) => <a>{text}</a>
    },
    {
      title: '关联订单',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150
    },
    {
      title: '快递公司',
      dataIndex: 'company',
      key: 'company',
      width: 120
    },
    {
      title: '发件人',
      dataIndex: 'sender',
      key: 'sender',
      width: 150
    },
    {
      title: '收件人',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 200
    },
    {
      title: '收件电话',
      dataIndex: 'receiverPhone',
      key: 'receiverPhone',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: '待发货', color: 'default' },
          'in_transit': { text: '运输中', color: 'processing' },
          'delivered': { text: '已送达', color: 'success' },
          'returned': { text: '已退回', color: 'error' }
        }
        const { text, color } = statusMap[status]
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: '发货时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
      width: 160
    },
    {
      title: '预计送达',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: 160
    },
    {
      title: '操作',
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
            追踪
          </Button>
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
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条快递记录吗？',
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success('删除成功')
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
        message.success('修改成功')
      } else {
        const newRecord = {
          key: Date.now().toString(),
          ...values,
          status: 'pending',
          sendTime: new Date().toLocaleString('zh-CN')
        }
        setDataSource([...dataSource, newRecord])
        message.success('添加成功')
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="express-management-container">
      <Card 
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加快递
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条快递记录`
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑快递信息' : '添加快递信息'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="快递单号"
            name="expressNo"
            rules={[{ required: true, message: '请输入快递单号' }]}
          >
            <Input placeholder="请输入快递单号" />
          </Form.Item>
          <Form.Item
            label="关联订单号"
            name="orderNo"
            rules={[{ required: true, message: '请输入关联订单号' }]}
          >
            <Input placeholder="请输入关联订单号" />
          </Form.Item>
          <Form.Item
            label="快递公司"
            name="company"
            rules={[{ required: true, message: '请选择快递公司' }]}
          >
            <Select placeholder="请选择快递公司">
              <Option value="顺丰速运">顺丰速运</Option>
              <Option value="圆通速递">圆通速递</Option>
              <Option value="中通快递">中通快递</Option>
              <Option value="韵达快递">韵达快递</Option>
              <Option value="申通快递">申通快递</Option>
              <Option value="EMS">EMS</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="发件人"
            name="sender"
            rules={[{ required: true, message: '请输入发件人' }]}
          >
            <Input placeholder="请输入发件人" />
          </Form.Item>
          <Form.Item
            label="收件人"
            name="receiver"
            rules={[{ required: true, message: '请输入收件人' }]}
          >
            <Input placeholder="请输入收件人" />
          </Form.Item>
          <Form.Item
            label="收件电话"
            name="receiverPhone"
            rules={[{ required: true, message: '请输入收件电话' }]}
          >
            <Input placeholder="请输入收件电话" />
          </Form.Item>
          <Form.Item
            label="收件地址"
            name="receiverAddress"
            rules={[{ required: true, message: '请输入收件地址' }]}
          >
            <Input placeholder="请输入收件地址" />
          </Form.Item>
          <Form.Item
            label="预计送达时间"
            name="estimatedTime"
          >
            <Input placeholder="例如：2025-11-12 14:00:00" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ExpressManagement

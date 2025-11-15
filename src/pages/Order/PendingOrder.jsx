import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Modal, Form, Input, Select, DatePicker, message } from 'antd'
import { EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import './PendingOrder.css'

const { Option } = Select

function PendingOrder() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      patientName: '张三',
      patientNo: 'P2023001',
      productType: '全瓷牙冠',
      toothPosition: '11, 12',
      status: 'incomplete',
      createTime: '2025-11-10 10:30:00',
      doctor: '李医生'
    },
    {
      key: '2',
      patientName: '李四',
      patientNo: 'P2023002',
      productType: '固定牙桥',
      toothPosition: '14, 15, 16',
      status: 'incomplete',
      createTime: '2025-11-11 14:20:00',
      doctor: '王医生'
    }
  ])
  const [form] = Form.useForm()

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: '患者编号',
      dataIndex: 'patientNo',
      key: 'patientNo',
      width: 120
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      key: 'productType',
      width: 150
    },
    {
      title: '牙位',
      dataIndex: 'toothPosition',
      key: 'toothPosition',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusMap = {
          'incomplete': { text: '信息不完整', color: 'warning' },
          'pending': { text: '待提交', color: 'processing' }
        }
        const { text, color } = statusMap[status] || statusMap['incomplete']
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
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
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<CheckOutlined />}
            onClick={() => handleSubmit(record)}
          >
            提交
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

  const handleEdit = (record) => {
    setCurrentRecord(record)
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleSubmit = (record) => {
    Modal.confirm({
      title: '确认提交',
      content: `确定要提交患者 ${record.patientName} 的订单吗？`,
      onOk: () => {
        message.success('订单已提交到订单管理')
        setDataSource(dataSource.filter(item => item.key !== record.key))
      }
    })
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条待下单记录吗？',
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success('删除成功')
      }
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newData = dataSource.map(item => 
        item.key === currentRecord.key ? { ...item, ...values } : item
      )
      setDataSource(newData)
      message.success('保存成功')
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  return (
    <div className="pending-order-container">
      <h2 className="page-title">待下单</h2>
      
      <Card>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title="编辑订单信息"
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
            label="患者姓名"
            name="patientName"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
          <Form.Item
            label="患者编号"
            name="patientNo"
          >
            <Input placeholder="请输入患者编号" />
          </Form.Item>
          <Form.Item
            label="产品类型"
            name="productType"
            rules={[{ required: true, message: '请选择产品类型' }]}
          >
            <Select placeholder="请选择产品类型">
              <Option value="全瓷牙冠">全瓷牙冠</Option>
              <Option value="固定牙桥">固定牙桥</Option>
              <Option value="瓷贴面">瓷贴面</Option>
              <Option value="种植牙冠">种植牙冠</Option>
              <Option value="活动假牙">活动假牙</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="牙位"
            name="toothPosition"
            rules={[{ required: true, message: '请输入牙位' }]}
          >
            <Input placeholder="例如：11, 12, 13" />
          </Form.Item>
          <Form.Item
            label="医生"
            name="doctor"
            rules={[{ required: true, message: '请输入医生姓名' }]}
          >
            <Input placeholder="请输入医生姓名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PendingOrder

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Select, DatePicker, Modal, Descriptions } from 'antd'
import { SearchOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons'
import './AllOrders.css'

const { RangePicker } = DatePicker
const { Option } = Select

function AllOrders() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isDetailVisible, setIsDetailVisible] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)

  // 订单数据
  const orders = [
    {
      key: '1',
      orderNo: '102511084444301',
      patientName: 'lee siew ngoh',
      doctor: '黄向荣',
      createTime: '2025-11-10 10:30:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-12 12:30:00',
      progress: 65,
      status: 'processing',
      orderType: '标准订单',
      orderCategory: '全瓷牙冠'
    },
    {
      key: '2',
      orderNo: '102511084444302',
      patientName: '王小明',
      doctor: '李医生',
      createTime: '2025-11-08 14:20:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-10 10:00:00',
      progress: 100,
      status: 'completed',
      orderType: '标准订单',
      orderCategory: '固定牙桥'
    },
    {
      key: '3',
      orderNo: '102511084444303',
      patientName: '陈红',
      doctor: '张医生',
      createTime: '2025-11-09 09:15:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-11 16:00:00',
      progress: 85,
      status: 'shipped',
      orderType: '加急订单',
      orderCategory: '瓷贴面'
    },
    {
      key: '4',
      orderNo: '102511084444304',
      patientName: '刘强',
      doctor: '王医生',
      createTime: '2025-11-11 16:45:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-13 14:00:00',
      progress: 25,
      status: 'pending',
      orderType: '标准订单',
      orderCategory: '种植牙冠'
    }
  ]

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 70,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left',
      render: (text) => <a onClick={() => handleViewDetail(text)}>{text}</a>
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
    },
    {
      title: '患者',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '诊所',
      dataIndex: 'practiceUnit',
      key: 'practiceUnit',
      width: 180
    },
    {
      title: '责任单位',
      dataIndex: 'responsibleUnit',
      key: 'responsibleUnit',
      width: 120
    },
    {
      title: '预计到货时间',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      width: 160
    },
    {
      title: '完成总进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress) => `${progress}%`
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: '待处理', color: 'default' },
          'processing': { text: '制作中', color: 'processing' },
          'shipped': { text: '已发货', color: 'warning' },
          'completed': { text: '已完成', color: 'success' }
        }
        const { text, color } = statusMap[status]
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            医技沟通
          </Button>
          {record.status === 'completed' ? (
            <Button type="link" size="small" danger>
              取消
            </Button>
          ) : (
            <Button type="link" size="small">
              完成
            </Button>
          )}
          {record.status === 'shipped' || record.status === 'completed' ? (
            <Button type="link" size="small">
              收货
            </Button>
          ) : (
            <Button type="link" size="small" danger>
              返厂
            </Button>
          )}
        </Space>
      )
    }
  ]

  const handleViewDetail = (orderNo) => {
    const order = orders.find(o => o.orderNo === orderNo)
    setCurrentOrder(order)
    setIsDetailVisible(true)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys)
    }
  }

  return (
    <div className="all-orders-container">
      <h2 className="page-title">全部订单</h2>
      
      <Card className="search-card">
        <Space size="middle" wrap>
          <Input 
            placeholder="订单编号/患者姓名" 
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select placeholder="订单状态" style={{ width: 150 }} allowClear>
            <Option value="pending">待处理</Option>
            <Option value="processing">制作中</Option>
            <Option value="shipped">已发货</Option>
            <Option value="completed">已完成</Option>
          </Select>
          <RangePicker placeholder={['开始日期', '结束日期']} />
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button>重置</Button>
        </Space>
      </Card>

      <Card>
        <Table 
          rowSelection={rowSelection}
          columns={columns} 
          dataSource={orders} 
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条订单`
          }}
        />
      </Card>

      <Modal
        title="订单详情"
        open={isDetailVisible}
        onCancel={() => setIsDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {currentOrder && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="订单编号" span={2}>
              {currentOrder.orderNo}
            </Descriptions.Item>
            <Descriptions.Item label="医生">
              {currentOrder.doctor}
            </Descriptions.Item>
            <Descriptions.Item label="患者">
              {currentOrder.patientName}
            </Descriptions.Item>
            <Descriptions.Item label="下单时间">
              {currentOrder.createTime}
            </Descriptions.Item>
            <Descriptions.Item label="预计到货时间">
              {currentOrder.deliveryTime}
            </Descriptions.Item>
            <Descriptions.Item label="诊所">
              {currentOrder.practiceUnit}
            </Descriptions.Item>
            <Descriptions.Item label="责任单位">
              {currentOrder.responsibleUnit}
            </Descriptions.Item>
            <Descriptions.Item label="完成总进度">
              {currentOrder.progress}%
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">
              <Tag color={
                currentOrder.status === 'completed' ? 'success' :
                currentOrder.status === 'processing' ? 'processing' :
                currentOrder.status === 'shipped' ? 'warning' : 'default'
              }>
                {currentOrder.status === 'completed' ? '已完成' :
                 currentOrder.status === 'processing' ? '制作中' :
                 currentOrder.status === 'shipped' ? '已发货' : '待处理'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="订单类型">
              {currentOrder.orderType}
            </Descriptions.Item>
            <Descriptions.Item label="订单类别">
              {currentOrder.orderCategory}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default AllOrders

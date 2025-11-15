import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Modal, Select, Input, message } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons'
import './PendingOrders.css'

const { Option } = Select
const { TextArea } = Input

function PendingOrders() {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      orderNo: '102511084444304',
      patientName: '刘强',
      patientNo: '2280393',
      productType: '种植牙冠',
      toothPosition: '36',
      material: '氧化锆',
      amount: 5800,
      createTime: '2025-11-11 16:45:00',
      doctor: '王医生',
      reason: '待确认患者信息'
    },
    {
      key: '2',
      orderNo: '102511084444305',
      patientName: '赵敏',
      patientNo: '2280394',
      productType: '活动假牙',
      toothPosition: '全口',
      material: '树脂',
      amount: 1800,
      createTime: '2025-11-11 17:30:00',
      doctor: '李医生',
      reason: '待补充扫描文件'
    },
    {
      key: '3',
      orderNo: '102511084444306',
      patientName: '张伟',
      patientNo: '2280395',
      productType: '全瓷牙冠',
      toothPosition: '21, 22',
      material: '全瓷',
      amount: 6200,
      createTime: '2025-11-12 09:20:00',
      doctor: '黄医生',
      reason: '待确认材质选择'
    },
    {
      key: '4',
      orderNo: '102511084444307',
      patientName: '李娜',
      patientNo: '2280396',
      productType: '固定牙桥',
      toothPosition: '14, 15, 16',
      material: '金属烤瓷',
      amount: 4500,
      createTime: '2025-11-12 10:15:00',
      doctor: '张医生',
      reason: '待补充咬合关系'
    }
  ])
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [processAction, setProcessAction] = useState('')

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left',
      render: (text) => <a>{text}</a>
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
      width: 120
    },
    {
      title: '牙位',
      dataIndex: 'toothPosition',
      key: 'toothPosition',
      width: 100
    },
    {
      title: '材质',
      dataIndex: 'material',
      key: 'material',
      width: 100
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount) => `¥${amount}`
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
    },
    {
      title: '待处理原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 150,
      render: (text) => <Tag color="warning">{text}</Tag>
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
            详情
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<CheckCircleOutlined />}
            onClick={() => handleProcess(record, 'approve')}
          >
            通过
          </Button>
          <Button 
            type="link" 
            danger 
            size="small" 
            icon={<CloseCircleOutlined />}
            onClick={() => handleProcess(record, 'reject')}
          >
            拒绝
          </Button>
        </Space>
      )
    }
  ]

  const handleProcess = (record, action) => {
    setCurrentOrder(record)
    setProcessAction(action)
    setIsProcessVisible(true)
  }

  const handleProcessOk = () => {
    const actionText = processAction === 'approve' ? '通过' : '拒绝'
    message.success(`订单 ${currentOrder.orderNo} 已${actionText}`)
    setDataSource(dataSource.filter(item => item.key !== currentOrder.key))
    setIsProcessVisible(false)
    setCurrentOrder(null)
  }

  return (
    <div className="pending-orders-container">
      <h2 className="page-title">待处理订单</h2>
      
      <Card 
        extra={
          <Space>
            <Tag color="warning">待处理: {dataSource.length}</Tag>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条待处理订单`
          }}
        />
      </Card>

      <Modal
        title={processAction === 'approve' ? '确认通过订单' : '确认拒绝订单'}
        open={isProcessVisible}
        onOk={handleProcessOk}
        onCancel={() => {
          setIsProcessVisible(false)
          setCurrentOrder(null)
        }}
        width={500}
      >
        {currentOrder && (
          <div>
            <p>订单编号: <strong>{currentOrder.orderNo}</strong></p>
            <p>患者姓名: <strong>{currentOrder.patientName}</strong></p>
            <p>产品类型: <strong>{currentOrder.productType}</strong></p>
            <p>待处理原因: <Tag color="warning">{currentOrder.reason}</Tag></p>
            
            {processAction === 'approve' ? (
              <div style={{ marginTop: 16 }}>
                <p>确认通过后，订单将进入制作流程</p>
                <Select 
                  placeholder="选择处理方式" 
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <Option value="normal">正常处理</Option>
                  <Option value="urgent">加急处理</Option>
                </Select>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <p>请填写拒绝原因：</p>
                <TextArea 
                  rows={3} 
                  placeholder="请输入拒绝原因，将通知诊所"
                  style={{ marginTop: 8 }}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PendingOrders

import { useState } from 'react'
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
      doctor: '王医生',
      createTime: '2025-11-11 16:45:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-13 14:00:00',
      progress: 0,
      status: 'pending'
    },
    {
      key: '2',
      orderNo: '102511084444305',
      patientName: '赵敏',
      doctor: '李医生',
      createTime: '2025-11-11 17:30:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-13 18:00:00',
      progress: 0,
      status: 'waitingAccept'
    },
    {
      key: '3',
      orderNo: '102511084444306',
      patientName: '张伟',
      doctor: '黄医生',
      createTime: '2025-11-12 09:20:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-14 10:00:00',
      progress: 0,
      status: 'pending'
    },
    {
      key: '4',
      orderNo: '102511084444307',
      patientName: '李娜',
      doctor: '张医生',
      createTime: '2025-11-12 10:15:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '后齐科技',
      deliveryTime: '2025-11-14 12:00:00',
      progress: 0,
      status: 'waitingAccept'
    }
  ])
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [processAction, setProcessAction] = useState('')

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
      render: (text) => <a>{text}</a>
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
          'waitingAccept': { text: '待接单', color: 'processing' }
        }
        const { text, color } = statusMap[status]
        return <Tag color={color}>{text}</Tag>
      }
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
          scroll={{ x: 1600 }}
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
            <p>医生: <strong>{currentOrder.doctor}</strong></p>
            <p>诊所: <strong>{currentOrder.practiceUnit}</strong></p>
            <p>订单状态: <Tag color={currentOrder.status === 'pending' ? 'default' : 'processing'}>
              {currentOrder.status === 'pending' ? '待处理' : '待接单'}
            </Tag></p>
            
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

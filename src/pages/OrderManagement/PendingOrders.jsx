import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Button, Space, Modal, Select, Input, message } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './PendingOrders.css'

const { Option } = Select
const { TextArea } = Input

function PendingOrders() {
  const { t } = useTranslation()
  const navigate = useNavigate()
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
      title: t('pendingOrders.columns.index'),
      key: 'index',
      width: 70,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: t('pendingOrders.columns.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      )
    },
    {
      title: t('pendingOrders.columns.doctor'),
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
    },
    {
      title: t('pendingOrders.columns.patient'),
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: t('pendingOrders.columns.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: t('pendingOrders.columns.clinic'),
      dataIndex: 'practiceUnit',
      key: 'practiceUnit',
      width: 180
    },
    {
      title: t('pendingOrders.columns.responsibleUnit'),
      dataIndex: 'responsibleUnit',
      key: 'responsibleUnit',
      width: 120
    },
    {
      title: t('pendingOrders.columns.deliveryTime'),
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      width: 160
    },
    {
      title: t('pendingOrders.columns.progress'),
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress) => `${progress}%`
    },
    {
      title: t('pendingOrders.columns.status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: t('pendingOrders.status.pending'), color: 'default' },
          'waitingAccept': { text: t('pendingOrders.status.waitingAccept'), color: 'processing' }
        }
        const { text, color } = statusMap[status] || { text: status, color: 'default' }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: t('pendingOrders.columns.action'),
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            {t('pendingOrders.actions.view')}
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<CheckCircleOutlined />}
            onClick={() => handleProcess(record, 'approve')}
          >
            {t('pendingOrders.actions.approve')}
          </Button>
          <Button 
            type="link" 
            danger 
            size="small" 
            icon={<CloseCircleOutlined />}
            onClick={() => handleProcess(record, 'reject')}
          >
            {t('pendingOrders.actions.reject')}
          </Button>
        </Space>
      )
    }
  ]

  const handleViewDetail = (record) => {
    navigate(`/order-management/detail/${record.orderNo}`, {
      state: { orderData: record }
    })
  }

  const handleProcess = (record, action) => {
    setCurrentOrder(record)
    setProcessAction(action)
    setIsProcessVisible(true)
  }

  const handleProcessOk = () => {
    const actionText = processAction === 'approve' ? t('pendingOrders.actions.approve') : t('pendingOrders.actions.reject')
    message.success(t('pendingOrders.messages.processed', { orderNo: currentOrder.orderNo, action: actionText }))
    setDataSource(dataSource.filter(item => item.key !== currentOrder.key))
    setIsProcessVisible(false)
    setCurrentOrder(null)
  }

  return (
    <div className="pending-orders-container">
      <Card 
        extra={
          <Space>
            <Tag color="warning">{t('pendingOrders.counts.pending', { count: dataSource.length })}</Tag>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => t('pendingOrders.pagination.total', { total })
          }}
        />
      </Card>

      <Modal
        title={processAction === 'approve' ? t('pendingOrders.modal.approveTitle') : t('pendingOrders.modal.rejectTitle')}
        open={isProcessVisible}
        onOk={handleProcessOk}
        onCancel={() => {
          setIsProcessVisible(false)
          setCurrentOrder(null)
        }}
        width={500}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
      >
        {currentOrder && (
          <div>
            <p>{t('pendingOrders.modal.labels.orderNo')}: <strong>{currentOrder.orderNo}</strong></p>
            <p>{t('pendingOrders.modal.labels.patient')}: <strong>{currentOrder.patientName}</strong></p>
            <p>{t('pendingOrders.modal.labels.doctor')}: <strong>{currentOrder.doctor}</strong></p>
            <p>{t('pendingOrders.modal.labels.clinic')}: <strong>{currentOrder.practiceUnit}</strong></p>
            <p>{t('pendingOrders.modal.labels.status')}: <Tag color={currentOrder.status === 'pending' ? 'default' : 'processing'}>
              {currentOrder.status === 'pending' ? t('pendingOrders.status.pending') : t('pendingOrders.status.waitingAccept')}
            </Tag></p>
            
            {processAction === 'approve' ? (
              <div style={{ marginTop: 16 }}>
                <p>{t('pendingOrders.modal.approveContent')}</p>
                <Select 
                  placeholder={t('pendingOrders.modal.processTypePlaceholder')} 
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <Option value="normal">{t('pendingOrders.modal.processTypes.normal')}</Option>
                  <Option value="urgent">{t('pendingOrders.modal.processTypes.urgent')}</Option>
                </Select>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <p>{t('pendingOrders.modal.rejectContent')}</p>
                <TextArea 
                  rows={3} 
                  placeholder={t('pendingOrders.modal.rejectReasonPlaceholder')}
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

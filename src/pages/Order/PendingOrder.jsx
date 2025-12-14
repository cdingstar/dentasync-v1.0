import { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, DatePicker, message, Row, Col, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './PendingOrder.css'

const { RangePicker } = DatePicker

function PendingOrder() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchForm] = Form.useForm()
  
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      orderNo: '102511084444305',
      patientName: 'Zhang San',
      doctor: 'Tom Huang',
      createTime: '2025-11-10 10:30:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: 'Nanning Houqi Tech',
      deliveryTime: '2025-11-15 12:00:00',
      progress: 0,
      status: 'pending',
      orderType: 'Standard Order',
      orderCategory: 'Zirconia Crown'
    },
    {
      key: '2',
      orderNo: '102511084444306',
      patientName: 'Li Si',
      doctor: 'Pacific Dental',
      createTime: '2025-11-11 14:20:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: 'Nanning Houqi Tech',
      deliveryTime: '2025-11-16 10:00:00',
      progress: 0,
      status: 'waitingAccept',
      orderType: 'Urgent Order',
      orderCategory: 'Fixed Bridge'
    },
    {
      key: '3',
      orderNo: '102511084444307',
      patientName: 'Wang Wu',
      doctor: 'Dr.JoeyChen ChienJou',
      createTime: '2025-11-12 09:15:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: 'Nanning Houqi Tech',
      deliveryTime: '2025-11-17 14:00:00',
      progress: 0,
      status: 'pending',
      orderType: 'Standard Order',
      orderCategory: 'Implant Crown'
    }
  ])

  // Listen for new order data returned from Quick Order page
  useEffect(() => {
    if (location.state?.newOrder) {
      const newOrderData = location.state.newOrder
      console.log('Received new order data:', newOrderData)
      
      // Check if it is edit mode
      if (newOrderData.orderKey) {
        // Edit mode - Update existing order
        const updatedRecord = {
          key: newOrderData.orderKey,
          orderNo: newOrderData.orderNo || `10251108${Date.now().toString().slice(-7)}`,
          doctor: newOrderData.doctor || t('pendingOrderPage.defaults.notSpecified'),
          patientName: newOrderData.patientName || t('pendingOrderPage.defaults.notSpecified'),
          createTime: newOrderData.createTime || new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-'),
          practiceUnit: newOrderData.practiceUnit || 'ASIANTECH PTE. LTD.',
          responsibleUnit: newOrderData.factory || t('pendingOrderPage.defaults.houqiTech'),
          deliveryTime: newOrderData.deliveryTime || '',
          progress: 0,
          status: 'pending',
          orderType: newOrderData.orderType || t('pendingOrderPage.defaults.standardOrder'),
          orderCategory: newOrderData.orderCategory || t('pendingOrderPage.defaults.zirconiaCrown')
        }
        
        console.log('Update order record:', updatedRecord)
        
        // Update order list
        setDataSource(prevData => 
          prevData.map(item => 
            item.key === updatedRecord.key ? updatedRecord : item
          )
        )
        message.success(t('pendingOrderPage.messages.orderUpdated', { 
          doctor: updatedRecord.doctor, 
          patient: updatedRecord.patientName 
        }))
      } else {
        // Create mode - Add new order
        const newRecord = {
          key: Date.now().toString(),
          orderNo: `10251108${Date.now().toString().slice(-7)}`,
          doctor: newOrderData.doctor || t('pendingOrderPage.defaults.notSpecified'),
          patientName: newOrderData.patientName || t('pendingOrderPage.defaults.notSpecified'),
          createTime: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-'),
          practiceUnit: newOrderData.practiceUnit || 'ASIANTECH PTE. LTD.',
          responsibleUnit: newOrderData.factory || t('pendingOrderPage.defaults.houqiTech'),
          deliveryTime: newOrderData.deliveryTime || '',
          progress: 0,
          status: 'pending',
          orderType: newOrderData.orderType || t('pendingOrderPage.defaults.standardOrder'),
          orderCategory: newOrderData.orderCategory || t('pendingOrderPage.defaults.zirconiaCrown')
        }
        
        console.log('Generated new record:', newRecord)
        
        // Add new order to top of list
        setDataSource(prevData => [newRecord, ...prevData])
        message.success(t('pendingOrderPage.messages.orderSaved', { 
          doctor: newRecord.doctor, 
          patient: newRecord.patientName 
        }))
      }
      
      // Clear location.state to avoid duplicate addition
      window.history.replaceState({}, document.title)
    }
  }, [location.state, t])

  const columns = [
    {
      title: t('pendingOrderPage.columns.index'),
      key: 'index',
      width: 70,
      fixed: 'left',
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: t('pendingOrderPage.columns.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left'
    },
    {
      title: t('pendingOrderPage.columns.doctor'),
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
    },
    {
      title: t('pendingOrderPage.columns.patient'),
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: t('pendingOrderPage.columns.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: t('pendingOrderPage.columns.clinic'),
      dataIndex: 'practiceUnit',
      key: 'practiceUnit',
      width: 180
    },
    {
      title: t('pendingOrderPage.columns.responsibleUnit'),
      dataIndex: 'responsibleUnit',
      key: 'responsibleUnit',
      width: 120
    },
    {
      title: t('pendingOrderPage.columns.deliveryTime'),
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      width: 160
    },
    {
      title: t('pendingOrderPage.columns.progress'),
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress) => `${progress}%`
    },
    {
      title: t('pendingOrderPage.columns.status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: t('pendingOrderPage.status.pending'), color: 'default' },
          'waitingAccept': { text: t('pendingOrderPage.status.waitingAccept'), color: 'processing' }
        }
        const { text, color } = statusMap[status] || { text: t('pendingOrderPage.status.unknown'), color: 'default' }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: t('pendingOrderPage.columns.action'),
      key: 'action',
      width: 280,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            {t('pendingOrderPage.actions.delete')}
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('pendingOrderPage.actions.edit')}
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<SendOutlined />}
            onClick={() => handleGoToOrder(record)}
          >
            {t('pendingOrderPage.actions.goToOrder')}
          </Button>
        </Space>
      )
    }
  ]

  // Search
  const handleSearch = () => {
    const values = searchForm.getFieldsValue()
    console.log('Search criteria:', values)
    message.info(t('pendingOrderPage.messages.searchNotImplemented'))
  }

  // Reset search
  const handleReset = () => {
    searchForm.resetFields()
    message.info(t('pendingOrderPage.messages.resetSuccess'))
  }

  // Edit - Navigate to Quick Order page and pass order data
  const handleEdit = (record) => {
    navigate('/order/quick', { 
      state: { 
        mode: 'edit',
        orderData: record
      } 
    })
  }

  // Delete
  const handleDelete = (key) => {
    Modal.confirm({
      title: t('pendingOrderPage.messages.confirmDeleteTitle'),
      content: t('pendingOrderPage.messages.confirmDeleteContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success(t('pendingOrderPage.messages.deleteSuccess'))
      }
    })
  }

  // Go to Order
  const handleGoToOrder = (record) => {
    message.info(t('pendingOrderPage.messages.goToOrderMessage', { name: record.patientName }))
    // Can navigate to order page and pass data
    navigate('/order/quick', { state: { patientInfo: record } })
  }

  // Create Order - Navigate to Quick Order page
  const handleCreateOrder = () => {
    console.log('=== Click Create Order Button ===')
    console.log('About to navigate, passing params:', { mode: 'create' })
    
    navigate('/order/quick', { 
      state: { 
        mode: 'create'
      } 
    })
  }

  return (
    <div className="pending-order-container">
      <Card className="search-card">
        <Form form={searchForm} layout="inline">
          <Row gutter={16} style={{ width: '100%' }}>
            <Col>
              <Form.Item name="doctorName">
                <Input placeholder={t('pendingOrderPage.search.doctorPlaceholder')} style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="patientName">
                <Input placeholder={t('pendingOrderPage.search.patientPlaceholder')} style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="creator">
                <Input placeholder={t('pendingOrderPage.search.creatorPlaceholder')} style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="dateRange">
                <RangePicker 
                  placeholder={[t('pendingOrderPage.search.startDate'), t('pendingOrderPage.search.endDate')]}
                  style={{ width: 260 }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  {t('pendingOrderPage.search.search')}
                </Button>
                <Button onClick={handleReset} style={{ background: '#FFA940', color: '#fff', border: 'none' }}>
                  {t('pendingOrderPage.search.reset')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card 
        className="table-card"
        extra={
          <Button type="primary" onClick={handleCreateOrder}>
            {t('pendingOrderPage.actions.createOrder')}
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => t('pendingOrderPage.pagination.total', { total }),
            pageSizeOptions: ['20', '50', '100']
          }}
        />
      </Card>
    </div>
  )
}

export default PendingOrder
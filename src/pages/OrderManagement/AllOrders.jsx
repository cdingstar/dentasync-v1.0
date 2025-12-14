import { useState, useEffect } from 'react'
import { Card, Table, Tag, Button, Space, Input, Select, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './AllOrders.css'

const { RangePicker } = DatePicker
const { Option } = Select

function AllOrders() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState('')
  
  // Get search keyword from route state
  useEffect(() => {
    if (location.state && location.state.searchKeyword) {
      setSearchText(location.state.searchKeyword)
    }
  }, [location.state])

  // Order data
  const orders = [
    {
      key: '1',
      orderNo: '102511084444301',
      patientName: t('allOrders.mockData.patients.lee'),
      doctor: t('allOrders.mockData.doctors.huang'),
      createTime: '2025-11-10 10:30:00',
      practiceUnit: t('allOrders.mockData.units.asiantech'),
      responsibleUnit: t('allOrders.mockData.units.houqi'),
      deliveryTime: '2025-11-12 12:30:00',
      progress: 65,
      status: 'processing',
      orderType: t('allOrders.mockData.orderTypes.standard'),
      orderCategory: t('allOrders.mockData.orderCategories.zirconia')
    },
    {
      key: '2',
      orderNo: '102511084444302',
      patientName: t('allOrders.mockData.patients.wang'),
      doctor: t('allOrders.mockData.doctors.li'),
      createTime: '2025-11-08 14:20:00',
      practiceUnit: t('allOrders.mockData.units.asiantech'),
      responsibleUnit: t('allOrders.mockData.units.houqi'),
      deliveryTime: '2025-11-10 10:00:00',
      progress: 100,
      status: 'completed',
      orderType: t('allOrders.mockData.orderTypes.standard'),
      orderCategory: t('allOrders.mockData.orderCategories.bridge')
    },
    {
      key: '3',
      orderNo: '102511084444303',
      patientName: t('allOrders.mockData.patients.chen'),
      doctor: t('allOrders.mockData.doctors.zhang'),
      createTime: '2025-11-09 09:15:00',
      practiceUnit: t('allOrders.mockData.units.asiantech'),
      responsibleUnit: t('allOrders.mockData.units.houqi'),
      deliveryTime: '2025-11-11 16:00:00',
      progress: 85,
      status: 'shipped',
      orderType: t('allOrders.mockData.orderTypes.urgent'),
      orderCategory: t('allOrders.mockData.orderCategories.veneer')
    },
    {
      key: '4',
      orderNo: '102511084444304',
      patientName: t('allOrders.mockData.patients.liu'),
      doctor: t('allOrders.mockData.doctors.wang'),
      createTime: '2025-11-11 16:45:00',
      practiceUnit: t('allOrders.mockData.units.asiantech'),
      responsibleUnit: t('allOrders.mockData.units.houqi'),
      deliveryTime: '2025-11-13 14:00:00',
      progress: 25,
      status: 'pending',
      orderType: t('allOrders.mockData.orderTypes.standard'),
      orderCategory: t('allOrders.mockData.orderCategories.implant')
    }
  ]

  const columns = [
    {
      title: t('allOrders.columns.index'),
      key: 'index',
      width: 70,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: t('allOrders.columns.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      )
    },
    {
      title: t('allOrders.columns.doctor'),
      dataIndex: 'doctor',
      key: 'doctor',
      width: 100
    },
    {
      title: t('allOrders.columns.patient'),
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: t('allOrders.columns.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: t('allOrders.columns.clinic'),
      dataIndex: 'practiceUnit',
      key: 'practiceUnit',
      width: 180
    },
    {
      title: t('allOrders.columns.responsibleUnit'),
      dataIndex: 'responsibleUnit',
      key: 'responsibleUnit',
      width: 120
    },
    {
      title: t('allOrders.columns.deliveryTime'),
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      width: 160
    },
    {
      title: t('allOrders.columns.progress'),
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress) => `${progress}%`
    },
    {
      title: t('allOrders.columns.status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'pending': { text: t('allOrders.status.pending'), color: 'default' },
          'processing': { text: t('allOrders.status.processing'), color: 'processing' },
          'shipped': { text: t('allOrders.status.shipped'), color: 'warning' },
          'completed': { text: t('allOrders.status.completed'), color: 'success' }
        }
        const { text, color } = statusMap[status] || { text: status, color: 'default' }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: t('allOrders.columns.action'),
      key: 'action',
      width: 280,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            {t('allOrders.actions.communication')}
          </Button>
          {record.status === 'completed' ? (
            <Button type="link" size="small" danger>
              {t('allOrders.actions.cancel')}
            </Button>
          ) : (
            <Button type="link" size="small">
              {t('allOrders.actions.complete')}
            </Button>
          )}
          {record.status === 'shipped' || record.status === 'completed' ? (
            <Button type="link" size="small">
              {t('allOrders.actions.receive')}
            </Button>
          ) : (
            <Button type="link" size="small" danger>
              {t('allOrders.actions.return')}
            </Button>
          )}
        </Space>
      )
    }
  ]

  const handleViewDetail = (record) => {
    // Navigate to order detail page and pass order data
    navigate(`/order-management/detail/${record.orderNo}`, {
      state: { orderData: record }
    })
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys)
    }
  }

  const handleSearch = () => {
    console.log('Search:', searchText)
    // Add actual search logic here
  }

  const handleReset = () => {
    setSearchText('')
  }

  // Filter orders by search text
  const filteredOrders = searchText 
    ? orders.filter(order => 
        order.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderNo.includes(searchText)
      )
    : orders

  return (
    <div className="all-orders-container">
      <Card className="search-card">
        <Space size="middle" wrap>
          <Input 
            placeholder={t('allOrders.search.keywordPlaceholder')}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Select placeholder={t('allOrders.search.statusPlaceholder')} style={{ width: 150 }} allowClear>
            <Option value="pending">{t('allOrders.status.pending')}</Option>
            <Option value="processing">{t('allOrders.status.processing')}</Option>
            <Option value="shipped">{t('allOrders.status.shipped')}</Option>
            <Option value="completed">{t('allOrders.status.completed')}</Option>
          </Select>
          <RangePicker placeholder={[t('allOrders.search.startDate'), t('allOrders.search.endDate')]} />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            {t('allOrders.search.search')}
          </Button>
          <Button onClick={handleReset}>{t('allOrders.search.reset')}</Button>
        </Space>
      </Card>

      <Card>
        <Table 
          rowSelection={rowSelection}
          columns={columns} 
          dataSource={filteredOrders} 
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => t('allOrders.pagination.total', { total })
          }}
        />
      </Card>
    </div>
  )
}

export default AllOrders

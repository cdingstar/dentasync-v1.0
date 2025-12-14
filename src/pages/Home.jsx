import React from 'react'
import { Card, Row, Col, Statistic, Table, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ShoppingCartOutlined,
  DatabaseOutlined,
  UserOutlined,
  FileTextOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  MessageOutlined
} from '@ant-design/icons'
import './Home.css'

function Home({ onOpenMessages }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // Quick entry data
  const quickEntries = [
    {
      title: t('home.quickEntries.orderNow'),
      icon: <ShoppingCartOutlined />,
      color: '#ff9800',
      path: '/order/quick',
      isRoute: true
    },
    {
      title: t('home.quickEntries.productLibrary'),
      icon: <DatabaseOutlined />,
      color: '#2196f3',
      path: '/order/product-library',
      isRoute: true
    },
    {
      title: t('home.quickEntries.myMessages'),
      icon: <MessageOutlined />,
      color: '#f50',
      badge: 99,
      isRoute: false,
      action: onOpenMessages
    },
    {
      title: t('home.quickEntries.patientArchive'),
      icon: <UserOutlined />,
      color: '#9c27b0',
      path: '/personal/patient-archive',
      isRoute: true
    },
    {
      title: t('home.quickEntries.shipped'),
      icon: <CheckCircleOutlined />,
      color: '#00bcd4',
      path: '/order-management/all',
      isRoute: true
    },
    {
      title: t('home.quickEntries.allOrders'),
      icon: <HourglassOutlined />,
      color: '#ff5722',
      path: '/order-management/all',
      isRoute: true
    }
  ]

  const handleQuickEntry = (entry) => {
    if (entry.isRoute) {
      navigate(entry.path)
    } else if (entry.action) {
      entry.action()
    }
  }

  // Shipped orders data
  const upcomingOrders = [
    {
      key: '1',
      sequence: 1,
      patient: 'lee siew ngoh/2280390',
      orderNo: '102511084444301',
      deliveryTime: '2025-11-12 12:30:00',
      doctor: t('allOrders.mockData.doctors.huang')
    }
  ]

  // Pending orders data
  const pendingOrders = [
    {
      key: '1',
      sequence: 1,
      patient: '',
      orderNo: '',
      operation: t('home.operation.noData')
    }
  ]

  const orderColumns = [
    {
      title: t('home.columns.sequence'),
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80
    },
    {
      title: t('home.columns.patient'),
      dataIndex: 'patient',
      key: 'patient'
    },
    {
      title: t('home.columns.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text) => text ? <a>{text}</a> : '-'
    },
    {
      title: t('home.columns.deliveryTime'),
      dataIndex: 'deliveryTime',
      key: 'deliveryTime'
    },
    {
      title: t('home.columns.doctor'),
      dataIndex: 'doctor',
      key: 'doctor'
    }
  ]

  const pendingColumns = [
    {
      title: t('home.columns.sequence'),
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80
    },
    {
      title: t('home.columns.patient'),
      dataIndex: 'patient',
      key: 'patient'
    },
    {
      title: t('home.columns.orderNo'),
      dataIndex: 'orderNo',
      key: 'orderNo'
    },
    {
      title: t('home.columns.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render: (text) => <span style={{ color: '#999' }}>{text}</span>
    }
  ]

  return (
    <div className="home-container">
      {/* Statistics cards */}
      <Row gutter={16} className="stats-row">
        <Col span={6}>
          <Card>
            <Statistic
              title={t('home.stats.allOrders')}
              value={47}
              valueStyle={{ color: '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('home.stats.pendingHandling')}
              value={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<HourglassOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('home.stats.completedOrders')}
              value={15}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('home.stats.pendingHandling')}
              value={32}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick access */}
      <Card title={t('home.quickEntries.title')} className="quick-entry-card">
        <Row gutter={[24, 24]}>
          {quickEntries.map((entry, index) => (
            <Col span={4} key={index}>
              <div 
                className="quick-entry-item"
                onClick={() => handleQuickEntry(entry)}
                style={{ cursor: 'pointer' }}
              >
                {entry.badge ? (
                  <Badge count={entry.badge} overflowCount={99}>
                    <div className="entry-icon" style={{ background: entry.color }}>
                      {entry.icon}
                    </div>
                  </Badge>
                ) : (
                  <div className="entry-icon" style={{ background: entry.color }}>
                    {entry.icon}
                  </div>
                )}
                <div className="entry-title">{entry.title}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Orders list */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title={t('home.orders.shippedOrders')} className="order-card">
            <Table
              columns={orderColumns}
              dataSource={upcomingOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t('home.orders.pendingOrders')} className="order-card">
            <Table
              columns={pendingColumns}
              dataSource={pendingOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home

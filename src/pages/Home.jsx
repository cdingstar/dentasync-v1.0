import React from 'react'
import { Card, Row, Col, Statistic, Table, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  // 快捷入口数据
  const quickEntries = [
    {
      title: '立即下单',
      icon: <ShoppingCartOutlined />,
      color: '#ff9800',
      path: '/order/quick',
      isRoute: true
    },
    {
      title: '产品库',
      icon: <DatabaseOutlined />,
      color: '#2196f3',
      path: '/order/product-library',
      isRoute: true
    },
    {
      title: '我的消息',
      icon: <MessageOutlined />,
      color: '#f50',
      badge: 99,
      isRoute: false,
      action: onOpenMessages
    },
    {
      title: '患者档案',
      icon: <UserOutlined />,
      color: '#9c27b0',
      path: '/personal/patient-archive',
      isRoute: true
    },
    {
      title: '已发货',
      icon: <CheckCircleOutlined />,
      color: '#00bcd4',
      path: '/order-management/all',
      isRoute: true
    },
    {
      title: '全部订单',
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

  // 已出厂订单数据
  const upcomingOrders = [
    {
      key: '1',
      sequence: 1,
      patient: 'lee siew ngoh/2280390',
      orderNo: '102511084444301',
      deliveryTime: '2025-11-12 12:30:00',
      doctor: '黄向荣'
    }
  ]

  // 待处理订单数据
  const pendingOrders = [
    {
      key: '1',
      sequence: 1,
      patient: '',
      orderNo: '',
      operation: '暂无数据'
    }
  ]

  const orderColumns = [
    {
      title: '序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80
    },
    {
      title: '患者',
      dataIndex: 'patient',
      key: 'patient'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: (text) => text ? <a>{text}</a> : '-'
    },
    {
      title: '出货时间',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime'
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor'
    }
  ]

  const pendingColumns = [
    {
      title: '序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80
    },
    {
      title: '患者',
      dataIndex: 'patient',
      key: 'patient'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text) => <span style={{ color: '#999' }}>{text}</span>
    }
  ]

  return (
    <div className="home-container">
      {/* 统计卡片 */}
      <Row gutter={16} className="stats-row">
        <Col span={6}>
          <Card>
            <Statistic
              title="全部订单"
              value={47}
              valueStyle={{ color: '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待处理订单"
              value={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<HourglassOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成订单"
              value={15}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="未完成订单"
              value={32}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 快捷入口 */}
      <Card title="快捷入口" className="quick-entry-card">
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

      {/* 订单列表 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="已出厂订单" className="order-card">
            <Table
              columns={orderColumns}
              dataSource={upcomingOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="待处理订单" className="order-card">
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

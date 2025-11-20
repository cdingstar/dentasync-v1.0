import { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, DatePicker, message, Row, Col, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import './PendingOrder.css'

const { RangePicker } = DatePicker

function PendingOrder() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchForm] = Form.useForm()
  
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      orderNo: '102511084444305',
      patientName: '张三',
      doctor: '黄向荣',
      createTime: '2025-11-10 10:30:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '南宁市后齐科技',
      deliveryTime: '2025-11-15 12:00:00',
      progress: 0,
      status: 'pending',
      orderType: '标准订单',
      orderCategory: '全瓷牙冠'
    },
    {
      key: '2',
      orderNo: '102511084444306',
      patientName: '李四',
      doctor: 'Pacific Dental',
      createTime: '2025-11-11 14:20:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '南宁市后齐科技',
      deliveryTime: '2025-11-16 10:00:00',
      progress: 0,
      status: 'waitingAccept',
      orderType: '加急订单',
      orderCategory: '固定牙桥'
    },
    {
      key: '3',
      orderNo: '102511084444307',
      patientName: '王五',
      doctor: 'Dr.JoeyChen ChienJou',
      createTime: '2025-11-12 09:15:00',
      practiceUnit: 'ASIANTECH PTE. LTD.',
      responsibleUnit: '南宁市后齐科技',
      deliveryTime: '2025-11-17 14:00:00',
      progress: 0,
      status: 'pending',
      orderType: '标准订单',
      orderCategory: '种植牙冠'
    }
  ])

  // 监听从快速下单页面返回的新订单数据
  useEffect(() => {
    if (location.state?.newOrder) {
      const newOrderData = location.state.newOrder
      console.log('收到新订单数据:', newOrderData)
      
      // 检查是否是编辑模式
      if (newOrderData.orderKey) {
        // 编辑模式 - 更新现有订单
        const updatedRecord = {
          key: newOrderData.orderKey,
          orderNo: newOrderData.orderNo || `10251108${Date.now().toString().slice(-7)}`,
          doctor: newOrderData.doctor || '未填写',
          patientName: newOrderData.patientName || '未填写',
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
          responsibleUnit: newOrderData.factory || '南宁市后齐科技',
          deliveryTime: newOrderData.deliveryTime || '',
          progress: 0,
          status: 'pending',
          orderType: newOrderData.orderType || '标准订单',
          orderCategory: newOrderData.orderCategory || '全瓷牙冠'
        }
        
        console.log('更新订单记录:', updatedRecord)
        
        // 更新订单列表
        setDataSource(prevData => 
          prevData.map(item => 
            item.key === updatedRecord.key ? updatedRecord : item
          )
        )
        message.success(`订单已更新！医生：${updatedRecord.doctor}，患者：${updatedRecord.patientName}`)
      } else {
        // 新建模式 - 添加新订单
        const newRecord = {
          key: Date.now().toString(),
          orderNo: `10251108${Date.now().toString().slice(-7)}`,
          doctor: newOrderData.doctor || '未填写',
          patientName: newOrderData.patientName || '未填写',
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
          responsibleUnit: newOrderData.factory || '南宁市后齐科技',
          deliveryTime: newOrderData.deliveryTime || '',
          progress: 0,
          status: 'pending',
          orderType: newOrderData.orderType || '标准订单',
          orderCategory: newOrderData.orderCategory || '全瓷牙冠'
        }
        
        console.log('生成的新记录:', newRecord)
        
        // 添加新订单到列表顶部
        setDataSource(prevData => [newRecord, ...prevData])
        message.success(`订单已保存！医生：${newRecord.doctor}，患者：${newRecord.patientName}`)
      }
      
      // 清除 location.state 避免重复添加
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 70,
      fixed: 'left',
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
      fixed: 'left'
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
        const { text, color } = statusMap[status] || { text: '未知', color: 'default' }
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
          <Button 
            type="link" 
            size="small" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
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
            size="small" 
            icon={<SendOutlined />}
            onClick={() => handleGoToOrder(record)}
          >
            去下单
          </Button>
        </Space>
      )
    }
  ]

  // 搜索
  const handleSearch = () => {
    const values = searchForm.getFieldsValue()
    console.log('搜索条件:', values)
    message.info('搜索功能待实现')
  }

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields()
    message.info('已重置搜索条件')
  }

  // 编辑 - 跳转到快速下单页面并传递订单数据
  const handleEdit = (record) => {
    navigate('/order/quick', { 
      state: { 
        mode: 'edit',
        orderData: record
      } 
    })
  }

  // 删除
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

  // 去下单
  const handleGoToOrder = (record) => {
    message.info(`前往下单页面，患者：${record.patientName}`)
    // 可以跳转到下单页面并传递数据
    navigate('/order/quick', { state: { patientInfo: record } })
  }

  // 建单 - 跳转到快速下单页面
  const handleCreateOrder = () => {
    console.log('=== 点击建单按钮 ===')
    console.log('即将跳转，传递参数:', { mode: 'create' })
    
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
                <Input placeholder="医生姓名" style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="patientName">
                <Input placeholder="患者姓名" style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="creator">
                <Input placeholder="建单人" style={{ width: 160 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="dateRange">
                <RangePicker 
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: 260 }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  搜索
                </Button>
                <Button onClick={handleReset} style={{ background: '#FFA940', color: '#fff', border: 'none' }}>
                  重置
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
            建单
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
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['20', '50', '100']
          }}
        />
      </Card>
    </div>
  )
}

export default PendingOrder

import React, { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, DatePicker, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined, FileTextOutlined } from '@ant-design/icons'
import './PatientArchive.css'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input

function PatientArchive() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [currentPatient, setCurrentPatient] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      patientName: 'lee siew ngoh',
      patientId: '22603908',
      phone: '+65 1234 5678',
      gender: '女',
      birthday: '1985-06-15',
      addPerson: '黄向荣',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-08 11:04:14'
    },
    {
      key: '2',
      patientName: 'Roslan Bin Mohd Sayir',
      patientId: 'PA0296',
      phone: '+65 9876 5432',
      gender: '男',
      birthday: '1978-03-22',
      addPerson: '黄向荣',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-06 09:44:37'
    },
    {
      key: '3',
      patientName: 'ONG QUNXIANG',
      patientId: '65601887',
      phone: '+65 6560 1887',
      gender: '男',
      birthday: '1992-12-05',
      addPerson: '黄向荣',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-01 13:00:45'
    },
    {
      key: '4',
      patientName: 'ONG LOO ER',
      patientId: 'c65978',
      phone: '+65 6559 7800',
      gender: '女',
      birthday: '1990-08-30',
      addPerson: '黄向荣',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-10-30 18:49:56'
    }
  ])
  const [form] = Form.useForm()

  // 关联订单数据（示例）
  const [relatedOrders] = useState([
    {
      key: '1',
      orderNo: 'ORD-2025110801',
      patientName: 'lee siew ngoh',
      productType: '牙冠',
      orderDate: '2025-11-08',
      status: '处理中'
    },
    {
      key: '2',
      orderNo: 'ORD-2025110501',
      patientName: 'lee siew ngoh',
      productType: '牙桥',
      orderDate: '2025-11-05',
      status: '已完成'
    }
  ])

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: '患者',
      key: 'patient',
      width: 200,
      fixed: 'left',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.patientName}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>{record.patientId}</div>
        </div>
      )
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 120
    },
    {
      title: '添加人',
      dataIndex: 'addPerson',
      key: 'addPerson',
      width: 120
    },
    {
      title: '归属单位',
      dataIndex: 'clinic',
      key: 'clinic',
      width: 200,
      ellipsis: true
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      width: 150,
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size={0}>
          <Button type="link" size="small" onClick={() => handleViewOrders(record)}>
            关联订单
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

  const orderColumns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      key: 'productType',
      width: 120
    },
    {
      title: '下单时间',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100
    }
  ]

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    // 设置默认值
    form.setFieldsValue({
      addPerson: '黄向荣',
      clinic: 'ASIANTECH PTE. LTD.'
    })
    setIsModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    form.setFieldsValue({
      patientName: record.patientName,
      patientId: record.patientId,
      phone: record.phone,
      gender: record.gender,
      birthday: record.birthday ? dayjs(record.birthday) : null,
      addPerson: record.addPerson,
      clinic: record.clinic,
      notes: record.notes
    })
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个患者档案吗？删除后将无法恢复。',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success('删除成功')
      }
    })
  }

  const handleViewOrders = (record) => {
    setCurrentPatient(record)
    setIsOrderModalVisible(true)
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null
      }

      if (editingRecord) {
        // 编辑
        const newData = dataSource.map(item => 
          item.key === editingRecord.key ? { ...item, ...formattedValues } : item
        )
        setDataSource(newData)
        message.success('修改成功')
      } else {
        // 新增
        const newRecord = {
          key: Date.now().toString(),
          ...formattedValues,
          createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
        setDataSource([newRecord, ...dataSource])
        message.success('添加成功')
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleSearch = () => {
    message.info(`搜索: ${searchText}`)
  }

  const handleReset = () => {
    setSearchText('')
    message.info('已重置')
  }

  const filteredData = searchText 
    ? dataSource.filter(item => 
        item.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.patientId.includes(searchText) ||
        item.phone.includes(searchText)
      )
    : dataSource

  return (
    <div className="patient-archive-container">
      <h2 className="page-title">患者档案</h2>
      
      <Card>
        <div className="search-bar">
          <Input 
            placeholder="患者姓名" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            onPressEnter={handleSearch}
          />
          <Space>
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加患者档案
            </Button>
          </Space>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 20,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['20', '50', '100']
          }}
        />
      </Card>

      {/* 添加/编辑患者模态框 */}
      <Modal
        title={
          <div className="modal-title">
            {editingRecord ? '编辑患者' : '添加患者'}
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => {
                setIsModalVisible(false)
                form.resetFields()
              }}
            />
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        width={600}
        closable={false}
        okText="确定"
        cancelText="取消"
        className="patient-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="添加人"
            name="addPerson"
          >
            <Input disabled style={{ background: '#f5f5f5' }} />
          </Form.Item>

          <Form.Item
            label="归属单位"
            name="clinic"
          >
            <Input disabled style={{ background: '#f5f5f5' }} />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">患者姓名</span>}
            name="patientName"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" size="large" />
          </Form.Item>

          <Form.Item
            label="患者ID"
            name="patientId"
          >
            <Input placeholder="请输入患者ID（选填）" size="large" />
          </Form.Item>
          
          <Form.Item
            label={<span className="required-label">手机号码</span>}
            name="phone"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^[0-9+\-\s()]+$/, message: '请输入有效的手机号码' }
            ]}
          >
            <Input placeholder="请输入手机号码" size="large" />
          </Form.Item>
          
          <Form.Item
            label="性别"
            name="gender"
          >
            <Select placeholder="请选择性别" size="large" allowClear>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
              <Option value="未知">未知</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="生日"
            name="birthday"
          >
            <DatePicker 
              placeholder="请选择生日" 
              size="large" 
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          
          <Form.Item
            label="备注"
            name="notes"
          >
            <TextArea 
              placeholder="请输入备注信息" 
              rows={3} 
              size="large"
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 关联订单模态框 */}
      <Modal
        title={
          <div className="modal-title">
            <span>
              <FileTextOutlined style={{ marginRight: 8 }} />
              关联订单 - {currentPatient?.patientName}
            </span>
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => setIsOrderModalVisible(false)}
            />
          </div>
        }
        open={isOrderModalVisible}
        onCancel={() => setIsOrderModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsOrderModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
        closable={false}
        className="order-modal"
      >
        <Table 
          columns={orderColumns} 
          dataSource={relatedOrders.filter(order => 
            order.patientName === currentPatient?.patientName
          )}
          pagination={false}
        />
      </Modal>
    </div>
  )
}

export default PatientArchive

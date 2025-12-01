import { useState, useMemo } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Checkbox, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './PersonnelAuth.css'

const { Option } = Select

function PersonnelAuth({ currentUser }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [form] = Form.useForm()

  const tempRole = currentUser?.tempRole
  const isFactoryAdmin = tempRole === '工厂-管理员'
  const isClinicAdmin = tempRole === '诊所-管理员'
  const isSuperAdmin = tempRole === '超级管理员'
  const allowedRoles = useMemo(() => {
    if (isFactoryAdmin) return ['助理', '技师']
    if (isClinicAdmin || isSuperAdmin) return ['医生', '助理', '行政']
    return ['医生', '助理', '行政']
  }, [isFactoryAdmin, isClinicAdmin, isSuperAdmin])

  // 人员数据
  const [personnel, setPersonnel] = useState([
    {
      key: '1',
      username: 'huang_xr',
      name: '黄向荣',
      phone: '006598625613',
      email: 'huang_xr@asiantech.com',
      createTime: '2019-02-19 10:30:00',
      role: '医生',
      isAdmin: true
    },
    {
      key: '2',
      username: 'pacific',
      name: 'Pacific Dental',
      phone: '6588094949',
      email: 'pacific@asiantech.com',
      createTime: '2019-03-15 14:20:00',
      role: '医生',
      isAdmin: false
    },
    {
      key: '3',
      username: 'joey_chen',
      name: 'Dr.JoeyChen ChienJou',
      phone: '6586918170',
      email: 'joey.chen@asiantech.com',
      createTime: '2018-08-24 09:15:00',
      role: '医生',
      isAdmin: false
    },
    {
      key: '4',
      username: 'joel_goh',
      name: 'Dr.Joel Goh Jin Teck',
      phone: '6598166631',
      email: 'joel.goh@asiantech.com',
      createTime: '2019-02-19 16:45:00',
      role: '医生',
      isAdmin: false
    }
  ])

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 150
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <span style={{ 
          color: role === '医生' ? '#1890ff' : role === '助理' ? '#52c41a' : '#fa8c16',
          fontWeight: 500
        }}>
          {role}
        </span>
      )
    },
    {
      title: '管理员',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
      align: 'center',
      render: (isAdmin) => (
        isAdmin ? (
          <Tag color="red">管理员</Tag>
        ) : (
          <Tag color="default">普通用户</Tag>
        )
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此人员吗？"
            onConfirm={() => handleDelete(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    form.setFieldsValue({
      username: record.username || record.phone,
      name: record.name,
      email: record.email || `${record.phone}@asiantech.com`,
      phone: record.phone,
      clinic: 'ASIANTECH PTE. LTD.',
      role: record.role,
      address: record.address || '',
      isAdmin: record.isAdmin || false
    })
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    setPersonnel(personnel.filter(item => item.key !== key))
    message.success('删除成功')
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑
        setPersonnel(personnel.map(item => 
          item.key === editingRecord.key 
            ? { ...item, name: values.name, phone: values.phone, role: values.role, isAdmin: values.isAdmin }
            : item
        ))
        message.success('编辑成功')
      } else {
        // 新增
        const now = new Date()
        const createTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
        const newRecord = {
          key: Date.now().toString(),
          ...values,
          createTime
        }
        setPersonnel([...personnel, newRecord])
        message.success('添加成功')
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="personnel-auth-container">
      <Card 
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>人员管理</span>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新建人员
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={personnel}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑人员' : '新建人员'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: isFactoryAdmin ? '助理' : '医生', isAdmin: false }}
        >
          <div className="personnel-form-grid">
            <div className="personnel-form-row">
              <label className="personnel-form-label">用户名:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="username"
                  noStyle
                  rules={[
                    { required: true, message: '请输入用户名' },
                    { min: 3, message: '用户名至少3位' }
                  ]}
                >
                  <Input placeholder="请输入用户名" disabled={!!editingRecord} />
                </Form.Item>
              </div>
              <label className="personnel-form-label">真实姓名:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{ required: true, message: '请输入真实姓名' }]}
                >
                  <Input placeholder="请输入真实姓名" />
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row">
              <label className="personnel-form-label">邮箱:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="email"
                  noStyle
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </div>
              <label className="personnel-form-label">联系电话:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="phone"
                  noStyle
                  rules={[
                    { required: true, message: '请输入手机号' },
                    { pattern: /^[0-9]+$/, message: '请输入有效的手机号' }
                  ]}
                >
                  <Input placeholder="请输入手机号" />
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row">
              <label className="personnel-form-label">{isFactoryAdmin ? '所属工厂:' : '所属诊所:'}</label>
              <div className="personnel-form-control">
                <Form.Item name="clinic" noStyle initialValue="ASIANTECH PTE. LTD.">
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="personnel-form-label">角色:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="role"
                  noStyle
                  rules={[{ required: true, message: '请选择角色' }]}
                >
                  <Select placeholder="请选择角色">
                    {allowedRoles.map(r => (
                      <Option key={r} value={r}>{r}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row full-width">
              <label className="personnel-form-label">地址:</label>
              <div className="personnel-form-control-full">
                <Form.Item name="address" noStyle>
                  <Input.TextArea 
                    placeholder="请输入地址" 
                    rows={2}
                    style={{ resize: 'none' }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row">
              <label className="personnel-form-label"></label>
              <div className="personnel-form-control" style={{ gridColumn: 'span 3' }}>
                <Form.Item
                  name="isAdmin"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>设为管理员</Checkbox>
                </Form.Item>
              </div>
            </div>

            {!editingRecord && (
              <>
                <div className="personnel-form-row">
                  <label className="personnel-form-label">密码:</label>
                  <div className="personnel-form-control">
                    <Form.Item
                      name="password"
                      noStyle
                      rules={[
                        { required: true, message: '请输入密码' },
                        { min: 6, message: '密码至少6位' }
                      ]}
                    >
                      <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                  </div>
                </div>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default PersonnelAuth


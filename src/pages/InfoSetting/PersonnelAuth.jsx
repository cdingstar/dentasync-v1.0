import { useState, useMemo } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm, Checkbox, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './PersonnelAuth.css'

const { Option } = Select

function PersonnelAuth({ currentUser }) {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [form] = Form.useForm()

  const tempRole = currentUser?.tempRole
  const isFactoryAdmin = tempRole === 'factory_admin'
  const isClinicAdmin = tempRole === 'clinic_admin'
  const isSuperAdmin = tempRole === 'super_admin'
  const allowedRoles = useMemo(() => {
    if (isFactoryAdmin) return ['assistant', 'technician']
    if (isClinicAdmin || isSuperAdmin) return ['doctor', 'assistant', 'admin']
    return ['doctor', 'assistant', 'admin']
  }, [isFactoryAdmin, isClinicAdmin, isSuperAdmin])

  // Personnel data
  const [personnel, setPersonnel] = useState([
    {
      key: '1',
      username: 'huang_xr',
      name: 'Tom Huang',
      phone: '006598625613',
      email: 'huang_xr@asiantech.com',
      createTime: '2019-02-19 10:30:00',
      role: 'doctor',
      isAdmin: true
    },
    {
      key: '2',
      username: 'pacific',
      name: 'Pacific Dental',
      phone: '6588094949',
      email: 'pacific@asiantech.com',
      createTime: '2019-03-15 14:20:00',
      role: 'doctor',
      isAdmin: false
    },
    {
      key: '3',
      username: 'joey_chen',
      name: 'Dr.JoeyChen ChienJou',
      phone: '6586918170',
      email: 'joey.chen@asiantech.com',
      createTime: '2018-08-24 09:15:00',
      role: 'doctor',
      isAdmin: false
    },
    {
      key: '4',
      username: 'joel_goh',
      name: 'Dr.Joel Goh Jin Teck',
      phone: '6598166631',
      email: 'joel.goh@asiantech.com',
      createTime: '2019-02-19 16:45:00',
      role: 'doctor',
      isAdmin: false
    }
  ])

  const columns = [
    {
      title: t('personnel.index'),
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: t('personnel.username'),
      dataIndex: 'username',
      key: 'username',
      width: 150
    },
    {
      title: t('personnel.name'),
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: t('personnel.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: t('personnel.email'),
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: t('personnel.role'),
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <span style={{ 
          color: role === 'doctor' ? '#1890ff' : role === 'assistant' ? '#52c41a' : '#fa8c16',
          fontWeight: 500
        }}>
          {t(`personnel.roles.${role}`)}
        </span>
      )
    },
    {
      title: t('personnel.isAdmin'),
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
      align: 'center',
      render: (isAdmin) => (
        isAdmin ? (
          <Tag color="red">{t('personnel.admin')}</Tag>
        ) : (
          <Tag color="default">{t('personnel.user')}</Tag>
        )
      )
    },
    {
      title: t('personnel.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: t('personnel.action'),
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
            {t('personnel.editAction')}
          </Button>
          <Popconfirm
            title={t('personnel.deleteConfirm')}
            onConfirm={() => handleDelete(record.key)}
            okText={t('common.confirm')}
            cancelText={t('common.cancel')}
          >
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
            >
              {t('personnel.deleteAction')}
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
    message.success(t('personnel.deleteSuccess'))
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // Edit
        setPersonnel(personnel.map(item => 
          item.key === editingRecord.key 
            ? { ...item, name: values.name, phone: values.phone, role: values.role, isAdmin: values.isAdmin }
            : item
        ))
        message.success(t('personnel.editSuccess'))
      } else {
        // Add
        const now = new Date()
        const createTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
        const newRecord = {
          key: Date.now().toString(),
          ...values,
          createTime
        }
        setPersonnel([...personnel, newRecord])
        message.success(t('personnel.addSuccess'))
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
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>{t('personnel.title')}</span>}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t('personnel.create')}
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={personnel}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => t('common.totalItems', { count: total })
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={editingRecord ? t('personnel.edit') : t('personnel.create')}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: isFactoryAdmin ? 'assistant' : 'doctor', isAdmin: false }}
        >
          <div className="personnel-form-grid">
            <div className="personnel-form-row">
              <label className="personnel-form-label">{t('personnel.username')}:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="username"
                  noStyle
                  rules={[
                    { required: true, message: t('personnel.usernameRequired') },
                    { min: 3, message: t('personnel.usernameMin') }
                  ]}
                >
                  <Input placeholder={t('personnel.username')} disabled={!!editingRecord} />
                </Form.Item>
              </div>
              <label className="personnel-form-label">{t('personnel.name')}:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{ required: true, message: t('personnel.nameRequired') }]}
                >
                  <Input placeholder={t('personnel.namePlaceholder')} />
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row">
              <label className="personnel-form-label">{t('personnel.email')}:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="email"
                  noStyle
                  rules={[
                    { required: true, message: t('personnel.emailRequired') },
                    { type: 'email', message: t('personnel.emailInvalid') }
                  ]}
                >
                  <Input placeholder={t('personnel.email')} />
                </Form.Item>
              </div>
              <label className="personnel-form-label">{t('personnel.phone')}:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="phone"
                  noStyle
                  rules={[
                    { required: true, message: t('personnel.phoneRequired') },
                    { pattern: /^[0-9]+$/, message: t('personnel.phoneInvalid') }
                  ]}
                >
                  <Input placeholder={t('personnel.phone')} />
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row">
              <label className="personnel-form-label">{isFactoryAdmin ? t('personnel.factoryLabel') : t('personnel.clinicLabel')}</label>
              <div className="personnel-form-control">
                <Form.Item name="clinic" noStyle initialValue="ASIANTECH PTE. LTD.">
                  <Input disabled />
                </Form.Item>
              </div>
              <label className="personnel-form-label">{t('personnel.role')}:</label>
              <div className="personnel-form-control">
                <Form.Item
                  name="role"
                  noStyle
                  rules={[{ required: true, message: t('personnel.roleRequired') }]}
                >
                  <Select placeholder={t('personnel.rolePlaceholder')}>
                    {allowedRoles.map(r => (
                      <Option key={r} value={r}>{t(`personnel.roles.${r}`)}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="personnel-form-row full-width">
              <label className="personnel-form-label">{t('personnel.address')}</label>
              <div className="personnel-form-control-full">
                <Form.Item name="address" noStyle>
                  <Input.TextArea 
                    placeholder={t('personnel.addressPlaceholder')} 
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
                  <Checkbox>{t('personnel.setAdmin')}</Checkbox>
                </Form.Item>
              </div>
            </div>

            {!editingRecord && (
              <>
                <div className="personnel-form-row">
                  <label className="personnel-form-label">{t('personnel.password')}</label>
                  <div className="personnel-form-control">
                    <Form.Item
                      name="password"
                      noStyle
                      rules={[
                        { required: true, message: t('personnel.passwordRequired') },
                        { min: 6, message: t('personnel.passwordMin') }
                      ]}
                    >
                      <Input.Password placeholder={t('personnel.password')} />
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


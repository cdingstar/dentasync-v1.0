import { useState } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, DatePicker, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './PatientArchive.css'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input

function PatientArchive() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      patientName: 'lee siew ngoh',
      patientId: '22603908',
      phone: '+65 1234 5678',
      gender: 'female',
      birthday: '1985-06-15',
      addPerson: 'Tom Huang',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-08 11:04:14'
    },
    {
      key: '2',
      patientName: 'Roslan Bin Mohd Sayir',
      patientId: 'PA0296',
      phone: '+65 9876 5432',
      gender: 'male',
      birthday: '1978-03-22',
      addPerson: 'Tom Huang',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-06 09:44:37'
    },
    {
      key: '3',
      patientName: 'ONG QUNXIANG',
      patientId: '65601887',
      phone: '+65 6560 1887',
      gender: 'male',
      birthday: '1992-12-05',
      addPerson: 'Tom Huang',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-11-01 13:00:45'
    },
    {
      key: '4',
      patientName: 'ONG LOO ER',
      patientId: 'c65978',
      phone: '+65 6559 7800',
      gender: 'female',
      birthday: '1990-08-30',
      addPerson: 'Tom Huang',
      clinic: 'ASIANTECH PTE. LTD.',
      notes: '',
      createTime: '2025-10-30 18:49:56'
    }
  ])
  const [form] = Form.useForm()

  const columns = [
    {
      title: t('patient.index'),
      key: 'index',
      width: 60,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: t('patient.id'),
      dataIndex: 'patientId',
      key: 'patientId',
      width: 120,
      fixed: 'left'
    },
    {
      title: t('patient.name'),
      dataIndex: 'patientName',
      key: 'patientName',
      width: 180,
      fixed: 'left',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: t('patient.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: t('patient.gender'),
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender) => t(`common.gender.${gender}`)
    },
    {
      title: t('patient.birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      width: 120
    },
    {
      title: t('patient.addPerson'),
      dataIndex: 'addPerson',
      key: 'addPerson',
      width: 120
    },
    {
      title: t('patient.createTime'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: t('patient.notes'),
      dataIndex: 'notes',
      key: 'notes',
      width: 150,
      ellipsis: true
    },
    {
      title: t('personnel.action'),
      key: 'action',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size={0}>
          <Button type="link" size="small" onClick={() => handleViewOrders(record)}>
            {t('patient.viewOrders')}
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {t('patient.edit')}
          </Button>
          <Button 
            type="link" 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            {t('patient.delete')}
          </Button>
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    // Set default values
    form.setFieldsValue({
      addPerson: 'Tom Huang'
    })
    setIsModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    form.setFieldsValue({
      patientName: record.patientName,
      phone: record.phone,
      gender: record.gender,
      birthday: record.birthday ? dayjs(record.birthday) : null,
      addPerson: record.addPerson,
      notes: record.notes
    })
    setIsModalVisible(true)
  }

  const handleDelete = (key) => {
    Modal.confirm({
      title: t('patient.deleteConfirmTitle'),
      content: t('patient.deleteConfirmContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setDataSource(dataSource.filter(item => item.key !== key))
        message.success(t('patient.deleteSuccess'))
      }
    })
  }

  const handleViewOrders = (record) => {
    // Jump to all orders page, and pass patient name or ID as search keyword
    navigate('/order-management/all', {
      state: {
        searchKeyword: record.patientName // Can use record.patientId or record.patientName
      }
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null
      }

      if (editingRecord) {
        // Edit - Keep original patientId and clinic
        const newData = dataSource.map(item => 
          item.key === editingRecord.key ? { 
            ...item, 
            ...formattedValues,
            patientId: item.patientId,  // Keep original patient ID
            clinic: item.clinic  // Keep original clinic
          } : item
        )
        setDataSource(newData)
        message.success(t('patient.editSuccess'))
      } else {
        // Add - Auto-generate patient ID
        const newRecord = {
          key: Date.now().toString(),
          ...formattedValues,
          patientId: `PA${Date.now().toString().slice(-6)}`,  // Auto-generate patient ID
          clinic: 'ASIANTECH PTE. LTD.',  // Default clinic
          createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
        setDataSource([newRecord, ...dataSource])
        message.success(t('patient.addSuccess'))
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleSearch = () => {
    message.info(`${t('patient.search')}: ${searchText}`)
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
      <Card
        title={<span style={{ fontSize: '16px', fontWeight: 500 }}>{t('patient.title')}</span>}
        extra={
          <Space>
            <Input 
              placeholder={t('patient.searchPlaceholder')} 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              onPressEnter={handleSearch}
            />
            <Button type="primary" onClick={handleSearch}>{t('patient.search')}</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              {t('patient.add')}
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 20,
            showTotal: (total) => t('common.totalItems', { count: total }),
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['20', '50', '100']
          }}
        />
      </Card>

      {/* Add/Edit Patient Modal */}
      <Modal
        title={
          <div className="modal-title">
            {editingRecord ? t('patient.modalEditTitle') : t('patient.modalAddTitle')}
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
        width={800}
        closable={false}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        className="patient-modal"
      >
        <Form form={form} layout="vertical">
          <div className="patient-form-grid">
            {/* Left Column */}
            <div className="patient-form-column">
              <Form.Item
                label={<span className="required-label">{t('patient.name')}</span>}
                name="patientName"
                rules={[{ required: true, message: t('patient.nameRequired') }]}
              >
                <Input placeholder={t('patient.namePlaceholder')} />
              </Form.Item>
              
              <Form.Item
                label={t('patient.gender')}
                name="gender"
              >
                <Select placeholder={t('patient.genderPlaceholder')} allowClear>
                  <Option value="male">{t('patient.male')}</Option>
                  <Option value="female">{t('patient.female')}</Option>
                  <Option value="unknown">{t('patient.unknown')}</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                label={t('patient.addPerson')}
                name="addPerson"
              >
                <Input disabled style={{ background: '#f5f5f5' }} />
              </Form.Item>
            </div>
            
            {/* Right Column */}
            <div className="patient-form-column">
              <Form.Item
                label={<span className="required-label">{t('patient.phone')}</span>}
                name="phone"
                rules={[
                  { required: true, message: t('patient.phoneRequired') },
                  { pattern: /^[0-9+\-\s()]+$/, message: t('patient.phoneError') }
                ]}
              >
                <Input placeholder={t('patient.phonePlaceholder')} />
              </Form.Item>
              
              <Form.Item
                label={t('patient.birthday')}
                name="birthday"
              >
                <DatePicker 
                  placeholder={t('patient.birthdayPlaceholder')} 
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </div>
          </div>
          
          {/* Notes take up full width */}
          <Form.Item
            label={t('patient.notes')}
            name="notes"
            className="patient-form-full-width"
          >
            <TextArea 
              placeholder={t('patient.notesPlaceholder')} 
              rows={2} 
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PatientArchive

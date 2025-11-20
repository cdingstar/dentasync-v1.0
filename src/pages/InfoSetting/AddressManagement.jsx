import React, { useState } from 'react'
import { Card, Form, Input, Button, Modal, Table, Space, message } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'
import './AddressManagement.css'

const { TextArea } = Input

function AddressManagement() {
  const [addressForm] = Form.useForm()
  const [addressList, setAddressList] = useState([
    {
      key: '1',
      receiver: '朱华昌',
      phone: '13410490092',
      region: '中国 / 广东省 / 深圳市 / 宝安区',
      detailAddress: '福海街道荔园路56号恺辉茂工业园A411(请转:黄总)',
      isDefault: true
    },
    {
      key: '2',
      receiver: '黄向荣',
      phone: '006598625613',
      region: 'Singapore',
      detailAddress: '东区 Bendemeer 994 Bendemeer Road, #02-04 B-Central',
      isDefault: false
    }
  ])
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  // 新增地址
  const handleAddAddress = () => {
    setEditingAddress(null)
    addressForm.resetFields()
    setIsAddressModalVisible(true)
  }

  // 编辑地址
  const handleEditAddress = (record) => {
    setEditingAddress(record)
    addressForm.setFieldsValue({
      receiver: record.receiver,
      phone: record.phone,
      region: record.region,
      detailAddress: record.detailAddress
    })
    setIsAddressModalVisible(true)
  }

  // 删除地址
  const handleDeleteAddress = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      onOk: () => {
        setAddressList(addressList.filter(item => item.key !== key))
        message.success('删除成功')
      }
    })
  }

  // 保存地址
  const handleAddressModalOk = () => {
    addressForm.validateFields().then(values => {
      if (editingAddress) {
        // 编辑地址
        const newList = addressList.map(item =>
          item.key === editingAddress.key
            ? { ...item, ...values }
            : item
        )
        setAddressList(newList)
        message.success('修改成功')
      } else {
        // 新增地址
        const newAddress = {
          key: Date.now().toString(),
          ...values,
          isDefault: addressList.length === 0
        }
        setAddressList([...addressList, newAddress])
        message.success('添加成功')
      }
      setIsAddressModalVisible(false)
      addressForm.resetFields()
    })
  }

  // 设置默认地址
  const handleSetDefault = (key) => {
    const newList = addressList.map(item => ({
      ...item,
      isDefault: item.key === key
    }))
    setAddressList(newList)
    message.success('已设置为默认地址')
  }

  // 地址列表表格列配置
  const addressColumns = [
    {
      title: '收货人',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 100
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: '所在地区',
      dataIndex: 'region',
      key: 'region',
      width: 200
    },
    {
      title: '详细地址',
      dataIndex: 'detailAddress',
      key: 'detailAddress',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditAddress(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAddress(record.key)}
          >
            删除
          </Button>
          {!record.isDefault && (
            <Button
              type="link"
              size="small"
              onClick={() => handleSetDefault(record.key)}
            >
              设为默认
            </Button>
          )}
          {record.isDefault && (
            <span style={{ color: '#1890ff', fontSize: '12px' }}>默认地址</span>
          )}
        </Space>
      )
    }
  ]

  return (
    <div className="address-management-container">
      <Card 
        title={<span className="section-title">地址管理</span>} 
        className="section-card"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
            新增地址
          </Button>
        }
      >
        <Table
          columns={addressColumns}
          dataSource={addressList}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* 地址编辑/新增弹窗 */}
      <Modal
        title={
          <div className="modal-title">
            {editingAddress ? '编辑地址' : '新增地址'}
            <CloseOutlined 
              className="modal-close-icon" 
              onClick={() => setIsAddressModalVisible(false)}
            />
          </div>
        }
        open={isAddressModalVisible}
        onOk={handleAddressModalOk}
        onCancel={() => setIsAddressModalVisible(false)}
        width={800}
        closable={false}
        okText="确定"
        cancelText="取消"
        className="address-modal"
      >
        <Form form={addressForm} layout="vertical">
          <div className="address-form-grid">
            {/* 左列 */}
            <div className="address-form-column">
              <Form.Item
                label={<span className="required-label">收货人</span>}
                name="receiver"
                rules={[{ required: true, message: '请输入收货人' }]}
              >
                <Input placeholder="请输入收货人" />
              </Form.Item>
              
              <Form.Item
                label={<span className="required-label">所在地区</span>}
                name="region"
                rules={[{ required: true, message: '请选择所在地区' }]}
              >
                <Input placeholder="中国 / 广东省 / 深圳市 / 宝安区" />
              </Form.Item>
            </div>
            
            {/* 右列 */}
            <div className="address-form-column">
              <Form.Item
                label={<span className="required-label">联系电话</span>}
                name="phone"
                rules={[
                  { required: true, message: '请输入联系电话' },
                  { pattern: /^[0-9+\-\s()]+$/, message: '请输入有效的电话号码' }
                ]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </div>
          </div>
          
          {/* 详细地址占满一行 */}
          <Form.Item
            label={<span className="required-label">详细地址</span>}
            name="detailAddress"
            rules={[{ required: true, message: '请输入详细地址' }]}
            className="address-form-full-width"
          >
            <TextArea 
              placeholder="请输入详细地址" 
              rows={3} 
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddressManagement

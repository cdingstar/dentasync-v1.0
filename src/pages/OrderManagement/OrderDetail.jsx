import { useState, useEffect } from 'react'
import { Card, Descriptions, Tag, Button, Tabs, Select, InputNumber, Timeline, Upload, Modal, Form, Input, message } from 'antd'
import { useParams, useLocation } from 'react-router-dom'
import { MessageOutlined, PlusOutlined, UploadOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import MessagesModal from '../../components/MessagesModal/MessagesModal'
import './OrderDetail.css'

function OrderDetail() {
  const { orderNo } = useParams()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('detail')
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('')
  const [currentProgress, setCurrentProgress] = useState(0)
  const [progressNodes, setProgressNodes] = useState([])
  const [isAddNodeModalVisible, setIsAddNodeModalVisible] = useState(false)
  const [nodeForm] = Form.useForm()
  const [uploadedNodeImages, setUploadedNodeImages] = useState([])
  const [uploadedNodeFiles, setUploadedNodeFiles] = useState([])

  // 从路由状态中获取订单数据，如果没有则使用模拟数据
  const orderData = location.state?.orderData || {
    orderNo: orderNo,
    patientName: 'lee siew ngoh',
    doctor: '黄向荣',
    createTime: '2025-11-10 10:30:00',
    practiceUnit: 'ASIANTECH PTE. LTD.',
    responsibleUnit: '后齐科技',
    deliveryTime: '2025-11-12 12:30:00',
    progress: 65,
    status: 'processing',
    orderType: '标准订单',
    orderCategory: '全瓷牙冠',
    // 订单详细信息
    clinic: 'ASIANTECH PTE. LTD.',
    factory: '南宁市后齐科技',
    receiver: '朱华昌',
    address: '中国广东省深圳市宝安区福海街道展城社区',
    patientPhone: '13800138000',
    gender: '女',
    age: '45',
    // 产品信息
    productName: '全瓷牙冠',
    toothPosition: '11, 12, 13',
    repairMethod: '新做',
    moldingMethod: '口扫',
    scanDevice: '先临',
    connectionMethod: '单冠',
    // 颜色设定
    mainColor: 'A2',
    neckColor: 'A1',
    middleColor: 'A2',
    cuttingEdgeColor: 'A3',
    // 备注
    remarks: '请注意患者对颜色要求较高，需要特别注意颜色匹配',
    // 其他设置
    trialStatus: '试戴蜡型外形',
    designSchemes: ['前牙美学设计', '咬合重建'],
    attachments: [
      { name: '旧模', count: 2 },
      { name: '咬胶', count: 1 },
      { name: '定位柱', count: 3 }
    ],
    uploadedImages: [
      { name: '口内照片1.jpg', url: 'https://via.placeholder.com/200x200/1890ff/ffffff?text=口内照片1' },
      { name: '口内照片2.jpg', url: 'https://via.placeholder.com/200x200/52c41a/ffffff?text=口内照片2' },
      { name: 'X光片.jpg', url: 'https://via.placeholder.com/200x200/faad14/ffffff?text=X光片' }
    ],
    uploadedFiles: [
      { name: '扫描文件.stl' },
      { name: '设计方案.pdf' },
      { name: '患者病历.doc' }
    ],
    threeDFile: 'https://example.com/3d-model.stl',
    // 生产进度节点
    progressNodes: [
      {
        id: 1,
        time: '2025-11-10 10:35:00',
        operator: '张三',
        action: '已接单',
        description: '订单已被接单，准备安排生产',
        images: [],
        files: []
      },
      {
        id: 2,
        time: '2025-11-10 14:20:00',
        operator: '张三',
        action: '安排生产',
        description: '已安排给李四开始生产',
        images: [],
        files: []
      },
      {
        id: 3,
        time: '2025-11-11 09:15:00',
        operator: '李四',
        action: '生产完成',
        description: '生产进度达到100%，完成生产',
        images: [],
        files: []
      }
    ]
  }

  // 初始化状态和进度
  useEffect(() => {
    setCurrentStatus(orderData.status)
    setCurrentProgress(orderData.progress)
    setProgressNodes(orderData.progressNodes || [])
  }, [orderData])

  // 订单状态映射
  const getOrderStatus = (status) => {
    const statusMap = {
      'pending': { text: '待接单', color: 'default' },
      'accepted': { text: '已接单', color: 'processing' },
      'production_33': { text: '生产进度-33%', color: 'processing' },
      'production_66': { text: '生产进度-66%', color: 'processing' },
      'production_100': { text: '生产进度-100%', color: 'success' },
      'shipped': { text: '已发货', color: 'warning' },
      'received': { text: '已收货', color: 'success' },
      'processing': { text: '制作中', color: 'processing' },
      'completed': { text: '已完成', color: 'success' }
    }
    return statusMap[status] || { text: '未知状态', color: 'default' }
  }

  const statusInfo = getOrderStatus(currentStatus)

  // 打开医技沟通
  const handleOpenMessages = () => {
    setIsMessagesModalVisible(true)
  }

  // 处理状态变更
  const handleStatusChange = (value) => {
    setCurrentStatus(value)
    message.success('订单状态已更新')
  }

  // 处理进度变更
  const handleProgressChange = (value) => {
    setCurrentProgress(value)
    message.success(`订单进度已更新为 ${value}%`)
  }

  // 打开添加节点对话框
  const handleAddNode = () => {
    setIsAddNodeModalVisible(true)
    nodeForm.resetFields()
    setUploadedNodeImages([])
    setUploadedNodeFiles([])
  }

  // 添加节点
  const handleNodeSubmit = async () => {
    try {
      const values = await nodeForm.validateFields()
      const newNode = {
        id: progressNodes.length + 1,
        time: new Date().toLocaleString('zh-CN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }).replace(/\//g, '-'),
        operator: values.operator || '当前用户',
        action: values.action,
        description: values.description,
        images: uploadedNodeImages,
        files: uploadedNodeFiles
      }
      setProgressNodes([...progressNodes, newNode])
      setIsAddNodeModalVisible(false)
      message.success('节点添加成功')
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 图片上传配置
  const nodeImageUploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件！')
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedNodeImages([...uploadedNodeImages, {
          name: file.name,
          url: e.target.result
        }])
      }
      reader.readAsDataURL(file)
      return false
    },
    showUploadList: false
  }

  // 文件上传配置
  const nodeFileUploadProps = {
    beforeUpload: (file) => {
      setUploadedNodeFiles([...uploadedNodeFiles, {
        name: file.name,
        size: file.size
      }])
      return false
    },
    showUploadList: false
  }

  // 移除节点图片
  const handleRemoveNodeImage = (index) => {
    setUploadedNodeImages(uploadedNodeImages.filter((_, i) => i !== index))
  }

  // 移除节点文件
  const handleRemoveNodeFile = (index) => {
    setUploadedNodeFiles(uploadedNodeFiles.filter((_, i) => i !== index))
  }

  // Tab页内容
  const tabItems = [
    {
      key: 'detail',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>订单详情</span>
        </div>
      ),
      children: (
        <div className="order-detail-content">
          {/* 基础信息 */}
          <Card 
            title="基础信息" 
            className="detail-section" 
            size="small"
          >
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="订单编号" span={2}>
                {orderData.orderNo}
              </Descriptions.Item>
              <Descriptions.Item label="订单类型">
                {orderData.orderType}
              </Descriptions.Item>
              <Descriptions.Item label="订单类别">
                {orderData.orderCategory}
              </Descriptions.Item>
              <Descriptions.Item label="诊所">
                {orderData.clinic || orderData.practiceUnit}
              </Descriptions.Item>
              <Descriptions.Item label="医生">
                {orderData.doctor}
              </Descriptions.Item>
              <Descriptions.Item label="生产单位">
                {orderData.factory || orderData.responsibleUnit}
              </Descriptions.Item>
              <Descriptions.Item label="收件人">
                {orderData.receiver || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="收件地址" span={2}>
                {orderData.address || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="下单时间">
                {orderData.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="预计到货时间">
                {orderData.deliveryTime}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 患者信息 */}
          <Card title="患者信息" className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="患者姓名">
                {orderData.patientName}
              </Descriptions.Item>
              <Descriptions.Item label="患者手机号">
                {orderData.patientPhone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="性别">
                {orderData.gender === 'male' ? '男' : orderData.gender === 'female' ? '女' : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="年龄">
                {orderData.age || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 产品信息 */}
          <Card title="产品信息" className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="产品名称" span={2}>
                {orderData.productName || orderData.orderCategory}
              </Descriptions.Item>
              <Descriptions.Item label="牙位">
                {orderData.toothPosition || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="修复方式">
                {orderData.repairMethod || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="取模方式">
                {orderData.moldingMethod || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="扫描设备">
                {orderData.scanDevice || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="连接方式">
                {orderData.connectionMethod || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 颜色设定 */}
          {(orderData.mainColor || orderData.neckColor) && (
            <Card title="颜色设定" className="detail-section" size="small">
              <Descriptions bordered column={2} size="small">
                {orderData.mainColor && (
                  <Descriptions.Item label="主体颜色">
                    {orderData.mainColor}
                  </Descriptions.Item>
                )}
                {orderData.neckColor && (
                  <Descriptions.Item label="颈部颜色">
                    {orderData.neckColor}
                  </Descriptions.Item>
                )}
                {orderData.middleColor && (
                  <Descriptions.Item label="中部颜色">
                    {orderData.middleColor}
                  </Descriptions.Item>
                )}
                {orderData.cuttingEdgeColor && (
                  <Descriptions.Item label="切端颜色">
                    {orderData.cuttingEdgeColor}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          )}

          {/* 备注信息 */}
          {orderData.remarks && (
            <Card title="备注信息" className="detail-section" size="small">
              <div style={{ padding: '8px' }}>
                {orderData.remarks}
              </div>
            </Card>
          )}

          {/* 其他设置 */}
          <Card title="其他设置" className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="试戴情况">
                {orderData.trialStatus || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="3D文件">
                {orderData.threeDFile ? (
                  <a href={orderData.threeDFile} target="_blank" rel="noopener noreferrer">
                    查看文件
                  </a>
                ) : '-'}
              </Descriptions.Item>
            </Descriptions>

            {/* 设计方案 */}
            {orderData.designSchemes && orderData.designSchemes.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>设计方案：</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {orderData.designSchemes.map((scheme, index) => (
                    <div key={index} style={{ 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '4px',
                      padding: '8px',
                      minWidth: '100px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>🦷</div>
                      <div style={{ fontSize: '12px' }}>{scheme}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 附件 */}
            {orderData.attachments && orderData.attachments.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>附件：</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {orderData.attachments.map((attachment, index) => (
                    <Tag key={index} color="blue">
                      {attachment.name} × {attachment.count}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* 上传的图片 */}
            {orderData.uploadedImages && orderData.uploadedImages.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>上传的图片：</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {orderData.uploadedImages.map((img, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        width: '100px', 
                        height: '100px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      onClick={() => {
                        Modal.info({
                          title: img.name || `图片${index + 1}`,
                          content: <img src={img.url || img} alt="" style={{ width: '100%' }} />,
                          width: 800,
                          okText: '关闭'
                        })
                      }}
                    >
                      <img 
                        src={img.url || img} 
                        alt={img.name || `图片${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {img.name || `图片${index + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 上传的文件 */}
            {orderData.uploadedFiles && orderData.uploadedFiles.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>上传的文件：</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {orderData.uploadedFiles.map((file, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                        border: '1px solid #d9d9d9'
                      }}
                    >
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>📄</span>
                      <span style={{ flex: 1 }}>{file.name || file}</span>
                      {file.size && (
                        <span style={{ color: '#999', fontSize: '12px' }}>
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )
    },
    {
      key: 'progress',
      label: '订单状态',
      children: (
        <div className="order-detail-content">
          {/* 订单状态记录 */}
          <Card 
            title="订单状态记录" 
            className="detail-section" 
            size="small"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddNode}
              >
                添加节点
              </Button>
            }
          >
            <Timeline
              items={progressNodes.map((node, index) => ({
                dot: index === progressNodes.length - 1 ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : <CheckCircleOutlined style={{ fontSize: '16px' }} />,
                color: index === progressNodes.length - 1 ? 'blue' : 'green',
                children: (
                  <div className="timeline-node">
                    <div className="node-header">
                      <span className="node-action">{node.action}</span>
                      <span className="node-time">{node.time}</span>
                    </div>
                    <div className="node-description">
                      {node.description}
                    </div>
                    {node.operator && (
                      <div className="node-operator">
                        操作人：{node.operator}
                      </div>
                    )}
                    {node.images && node.images.length > 0 && (
                      <div className="node-images">
                        {node.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img.url || img}
                            alt={img.name || `图片${idx + 1}`}
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              objectFit: 'cover',
                              borderRadius: '4px',
                              marginRight: '8px',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              Modal.info({
                                title: '查看图片',
                                content: <img src={img.url || img} alt="" style={{ width: '100%' }} />,
                                width: 800,
                                okText: '关闭'
                              })
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {node.files && node.files.length > 0 && (
                      <div className="node-files">
                        {node.files.map((file, idx) => (
                          <div key={idx} className="file-item-small">
                            📄 {file.name || file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }))}
            />
          </Card>
        </div>
      )
    }
  ]

  return (
    <div className="order-detail-container">
      {/* Tab页 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="order-detail-tabs"
        tabBarExtraContent={
          <Button 
            type="primary" 
            icon={<MessageOutlined />}
            onClick={handleOpenMessages}
          >
            医技沟通
          </Button>
        }
      />

      {/* 消息对话框 */}
      <MessagesModal
        visible={isMessagesModalVisible}
        onClose={() => setIsMessagesModalVisible(false)}
      />

      {/* 添加节点对话框 */}
      <Modal
        title="添加进度节点"
        open={isAddNodeModalVisible}
        onOk={handleNodeSubmit}
        onCancel={() => setIsAddNodeModalVisible(false)}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={nodeForm}
          layout="vertical"
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* 左列 */}
            <div style={{ flex: 1 }}>
              <Form.Item
                label="操作人"
                name="operator"
                rules={[{ required: true, message: '请输入操作人' }]}
              >
                <Input placeholder="请输入操作人姓名" />
              </Form.Item>

              <Form.Item
                label="操作动作"
                name="action"
                rules={[{ required: true, message: '请输入操作动作' }]}
              >
                <Select placeholder="请选择操作动作">
                  <Select.Option value="已接单">已接单</Select.Option>
                  <Select.Option value="安排生产">安排生产</Select.Option>
                  <Select.Option value="开始生产">开始生产</Select.Option>
                  <Select.Option value="生产完成">生产完成</Select.Option>
                  <Select.Option value="质检完成">质检完成</Select.Option>
                  <Select.Option value="打包发货">打包发货</Select.Option>
                  <Select.Option value="已签收">已签收</Select.Option>
                  <Select.Option value="其他">其他</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="当前状态"
                name="status"
                rules={[{ required: true, message: '请选择当前状态' }]}
              >
                <Select placeholder="请选择当前状态">
                  <Select.Option value="pending">待接单</Select.Option>
                  <Select.Option value="accepted">已接单</Select.Option>
                  <Select.Option value="processing">制作中</Select.Option>
                  <Select.Option value="production_33">生产进度-33%</Select.Option>
                  <Select.Option value="production_66">生产进度-66%</Select.Option>
                  <Select.Option value="production_100">生产进度-100%</Select.Option>
                  <Select.Option value="shipped">已发货</Select.Option>
                  <Select.Option value="received">已收货</Select.Option>
                  <Select.Option value="completed">已完成</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="详细描述"
                name="description"
                rules={[{ required: true, message: '请输入详细描述' }]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="请输入详细描述，如:已安排给张三开始生产"
                />
              </Form.Item>
            </div>

            {/* 右列 */}
            <div style={{ flex: 1 }}>
              <Form.Item label="上传图片">
                <div>
                  <Upload {...nodeImageUploadProps} multiple>
                    <Button icon={<UploadOutlined />}>选择图片</Button>
                  </Upload>
                  {uploadedNodeImages.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {uploadedNodeImages.map((img, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <img 
                            src={img.url} 
                            alt={img.name}
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '1px solid #d9d9d9'
                            }}
                          />
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<PlusOutlined style={{ transform: 'rotate(45deg)' }} />}
                            style={{ 
                              position: 'absolute', 
                              top: -8, 
                              right: -8,
                              background: 'white',
                              borderRadius: '50%',
                              padding: '2px'
                            }}
                            onClick={() => handleRemoveNodeImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Form.Item>

              <Form.Item label="上传文件">
                <div>
                  <Upload {...nodeFileUploadProps} multiple>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                  </Upload>
                  {uploadedNodeFiles.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      {uploadedNodeFiles.map((file, index) => (
                        <div 
                          key={index} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '8px',
                            background: '#f5f5f5',
                            borderRadius: '4px',
                            marginBottom: '8px'
                          }}
                        >
                          <span>📄 {file.name}</span>
                          <Button
                            type="text"
                            danger
                            size="small"
                            onClick={() => handleRemoveNodeFile(index)}
                          >
                            删除
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default OrderDetail

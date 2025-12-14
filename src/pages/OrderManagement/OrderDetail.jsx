import { useState, useEffect } from 'react'
import { Card, Descriptions, Tag, Button, Tabs, Select, InputNumber, Timeline, Upload, Modal, Form, Input, message } from 'antd'
import { useParams, useLocation } from 'react-router-dom'
import { MessageOutlined, PlusOutlined, UploadOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import MessagesModal from '../../components/MessagesModal/MessagesModal'
import './OrderDetail.css'

function OrderDetail() {
  const { orderNo } = useParams()
  const location = useLocation()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('detail')
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('')
  const [currentProgress, setCurrentProgress] = useState(0)
  const [progressNodes, setProgressNodes] = useState([])
  const [isAddNodeModalVisible, setIsAddNodeModalVisible] = useState(false)
  const [nodeForm] = Form.useForm()
  const [uploadedNodeImages, setUploadedNodeImages] = useState([])
  const [uploadedNodeFiles, setUploadedNodeFiles] = useState([])

  // Helper for action translation
  const getActionText = (action) => {
    const map = {
      'accepted': t('orderDetail.progress.actions.accepted'),
      'scheduleProduction': t('orderDetail.progress.actions.scheduleProduction'),
      'startProduction': t('orderDetail.progress.actions.startProduction'),
      'productionCompleted': t('orderDetail.progress.actions.productionCompleted'),
      'qualityCheck': t('orderDetail.progress.actions.qualityCheck'),
      'shipping': t('orderDetail.progress.actions.shipping'),
      'received': t('orderDetail.progress.actions.received'),
      'other': t('orderDetail.progress.actions.other')
    }
    return map[action] || action
  }

  // Get order data from route state or use mock data
  const orderData = location.state?.orderData || {
    orderNo: orderNo,
    patientName: 'Lee Siew Ngoh',
    doctor: 'Dr. Huang',
    createTime: '2025-11-10 10:30:00',
    practiceUnit: 'ASIANTECH PTE. LTD.',
    responsibleUnit: 'HOUQI TECH',
    deliveryTime: '2025-11-12 12:30:00',
    progress: 65,
    status: 'processing',
    orderType: t('allOrders.mockData.orderTypes.standard'),
    orderCategory: t('allOrders.mockData.orderCategories.zirconia'),
    // Order details
    clinic: 'ASIANTECH PTE. LTD.',
    factory: 'Nanning HOUQI TECH',
    receiver: 'Zhu Huachang',
    address: 'Fuhai Street, Baoan District, Shenzhen, China',
    patientPhone: '13800138000',
    gender: 'female',
    age: '45',
    // Product info
    productName: t('allOrders.mockData.orderCategories.zirconia'),
    toothPosition: '11, 12, 13',
    repairMethod: 'New',
    moldingMethod: 'Oral Scan',
    scanDevice: 'Shining 3D',
    connectionMethod: 'Single Crown',
    // Color settings
    mainColor: 'A2',
    neckColor: 'A1',
    middleColor: 'A2',
    cuttingEdgeColor: 'A3',
    // Remarks
    remarks: t('orderDetail.mockData.remarks'),
    // Other settings
    trialStatus: t('orderDetail.mockData.trialStatus.waxTrial'),
    designSchemes: [t('orderDetail.mockData.designSchemes.esthetic'), t('orderDetail.mockData.designSchemes.occlusion')],
    attachments: [
      { name: t('orderDetail.mockData.attachments.oldCast'), count: 2 },
      { name: t('orderDetail.mockData.attachments.biteBlock'), count: 1 },
      { name: t('orderDetail.mockData.attachments.positioningPost'), count: 3 }
    ],
    uploadedImages: [
      { name: 'Intraoral 1.jpg', url: 'https://via.placeholder.com/200x200/1890ff/ffffff?text=Intraoral1' },
      { name: 'Intraoral 2.jpg', url: 'https://via.placeholder.com/200x200/52c41a/ffffff?text=Intraoral2' },
      { name: 'X-Ray.jpg', url: 'https://via.placeholder.com/200x200/faad14/ffffff?text=X-Ray' }
    ],
    uploadedFiles: [
      { name: 'Scan.stl' },
      { name: 'Design.pdf' },
      { name: 'MedicalRecord.doc' }
    ],
    threeDFile: 'https://example.com/3d-model.stl',
    // Production progress nodes
    progressNodes: [
      {
        id: 1,
        time: '2025-11-10 10:35:00',
        operator: 'Zhang San',
        action: 'accepted',
        description: t('orderDetail.mockData.descriptions.accepted'),
        images: [],
        files: []
      },
      {
        id: 2,
        time: '2025-11-10 14:20:00',
        operator: 'Zhang San',
        action: 'scheduleProduction',
        description: t('orderDetail.mockData.descriptions.scheduleProduction'),
        images: [],
        files: []
      },
      {
        id: 3,
        time: '2025-11-11 09:15:00',
        operator: 'Li Si',
        action: 'productionCompleted',
        description: t('orderDetail.mockData.descriptions.productionCompleted'),
        images: [],
        files: []
      }
    ]
  }

  // Initialize state and progress
  useEffect(() => {
    setCurrentStatus(orderData.status)
    setCurrentProgress(orderData.progress)
    setProgressNodes(orderData.progressNodes || [])
  }, [orderData])

  // Order status map
  const getOrderStatus = (status) => {
    const statusMap = {
      'pending': { text: t('orderDetail.status.pending'), color: 'default' },
      'accepted': { text: t('orderDetail.status.accepted'), color: 'processing' },
      'production_33': { text: t('orderDetail.status.production_33'), color: 'processing' },
      'production_66': { text: t('orderDetail.status.production_66'), color: 'processing' },
      'production_100': { text: t('orderDetail.status.production_100'), color: 'success' },
      'shipped': { text: t('orderDetail.status.shipped'), color: 'warning' },
      'received': { text: t('orderDetail.status.received'), color: 'success' },
      'processing': { text: t('orderDetail.status.processing'), color: 'processing' },
      'completed': { text: t('orderDetail.status.completed'), color: 'success' }
    }
    return statusMap[status] || { text: t('orderDetail.status.unknown'), color: 'default' }
  }

  const statusInfo = getOrderStatus(currentStatus)

  // Open messages
  const handleOpenMessages = () => {
    setIsMessagesModalVisible(true)
  }

  // Handle status change
  const handleStatusChange = (value) => {
    setCurrentStatus(value)
    message.success(t('orderDetail.status.updateSuccess'))
  }

  // Handle progress change
  const handleProgressChange = (value) => {
    setCurrentProgress(value)
    message.success(t('orderDetail.status.progressUpdateSuccess', { value }))
  }

  // Open add node modal
  const handleAddNode = () => {
    setIsAddNodeModalVisible(true)
    nodeForm.resetFields()
    setUploadedNodeImages([])
    setUploadedNodeFiles([])
  }

  // Submit node
  const handleNodeSubmit = async () => {
    try {
      const values = await nodeForm.validateFields()
      const newNode = {
        id: progressNodes.length + 1,
        time: new Date().toLocaleString(),
        operator: values.operator || t('common.currentUser'),
        action: values.action,
        description: values.description,
        images: uploadedNodeImages,
        files: uploadedNodeFiles
      }
      setProgressNodes([...progressNodes, newNode])
      setIsAddNodeModalVisible(false)
      message.success(t('orderDetail.progress.success'))
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  // Image upload props
  const nodeImageUploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error(t('orderDetail.progress.onlyImages'))
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

  // File upload props
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

  // Remove node image
  const handleRemoveNodeImage = (index) => {
    setUploadedNodeImages(uploadedNodeImages.filter((_, i) => i !== index))
  }

  // Remove node file
  const handleRemoveNodeFile = (index) => {
    setUploadedNodeFiles(uploadedNodeFiles.filter((_, i) => i !== index))
  }

  // Tab items
  const tabItems = [
    {
      key: 'detail',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{t('orderDetail.tabs.detail')}</span>
        </div>
      ),
      children: (
        <div className="order-detail-content">
          {/* Base Info */}
          <Card 
            title={t('orderDetail.sections.baseInfo')}
            className="detail-section" 
            size="small"
          >
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label={t('orderDetail.fields.orderNo')} span={2}>
                {orderData.orderNo}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.orderType')}>
                {orderData.orderType}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.orderCategory')}>
                {orderData.orderCategory}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.clinic')}>
                {orderData.clinic || orderData.practiceUnit}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.doctor')}>
                {orderData.doctor}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.factory')}>
                {orderData.factory || orderData.responsibleUnit}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.receiver')}>
                {orderData.receiver || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.address')} span={2}>
                {orderData.address || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.createTime')}>
                {orderData.createTime}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.deliveryTime')}>
                {orderData.deliveryTime}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Patient Info */}
          <Card title={t('orderDetail.sections.patientInfo')} className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label={t('orderDetail.fields.patientName')}>
                {orderData.patientName}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.patientPhone')}>
                {orderData.patientPhone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.gender')}>
                {orderData.gender === 'male' ? t('quickOrder.baseInfo.options.male') : orderData.gender === 'female' ? t('quickOrder.baseInfo.options.female') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.age')}>
                {orderData.age || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Product Info */}
          <Card title={t('orderDetail.sections.productInfo')} className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label={t('orderDetail.fields.productName')} span={2}>
                {orderData.productName || orderData.orderCategory}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.toothPosition')}>
                {orderData.toothPosition || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.repairMethod')}>
                {orderData.repairMethod || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.moldingMethod')}>
                {orderData.moldingMethod || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.scanDevice')}>
                {orderData.scanDevice || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.connectionMethod')}>
                {orderData.connectionMethod || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Color Settings */}
          {(orderData.mainColor || orderData.neckColor) && (
            <Card title={t('orderDetail.sections.colorSettings')} className="detail-section" size="small">
              <Descriptions bordered column={2} size="small">
                {orderData.mainColor && (
                  <Descriptions.Item label={t('orderDetail.fields.mainColor')}>
                    {orderData.mainColor}
                  </Descriptions.Item>
                )}
                {orderData.neckColor && (
                  <Descriptions.Item label={t('orderDetail.fields.neckColor')}>
                    {orderData.neckColor}
                  </Descriptions.Item>
                )}
                {orderData.middleColor && (
                  <Descriptions.Item label={t('orderDetail.fields.middleColor')}>
                    {orderData.middleColor}
                  </Descriptions.Item>
                )}
                {orderData.cuttingEdgeColor && (
                  <Descriptions.Item label={t('orderDetail.fields.cuttingEdgeColor')}>
                    {orderData.cuttingEdgeColor}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          )}

          {/* Remarks */}
          {orderData.remarks && (
            <Card title={t('orderDetail.sections.remarks')} className="detail-section" size="small">
              <div style={{ padding: '8px' }}>
                {orderData.remarks}
              </div>
            </Card>
          )}

          {/* Other Settings */}
          <Card title={t('orderDetail.sections.otherSettings')} className="detail-section" size="small">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label={t('orderDetail.fields.trialStatus')}>
                {orderData.trialStatus || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={t('orderDetail.fields.threeDFile')}>
                {orderData.threeDFile ? (
                  <a href={orderData.threeDFile} target="_blank" rel="noopener noreferrer">
                    {t('orderDetail.fields.viewFile')}
                  </a>
                ) : '-'}
              </Descriptions.Item>
            </Descriptions>

            {/* Design Schemes */}
            {orderData.designSchemes && orderData.designSchemes.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{t('orderDetail.fields.designScheme')}</div>
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

            {/* Attachments */}
            {orderData.attachments && orderData.attachments.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{t('orderDetail.fields.attachments')}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {orderData.attachments.map((attachment, index) => (
                    <Tag key={index} color="blue">
                      {attachment.name} × {attachment.count}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Images */}
            {orderData.uploadedImages && orderData.uploadedImages.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{t('orderDetail.fields.uploadedImages')}</div>
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
                          title: img.name || `Image ${index + 1}`,
                          content: <img src={img.url || img} alt="" style={{ width: '100%' }} />,
                          width: 800,
                          okText: t('common.close')
                        })
                      }}
                    >
                      <img 
                        src={img.url || img} 
                        alt={img.name || `Image ${index + 1}`}
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
                        {img.name || `Image ${index + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Files */}
            {orderData.uploadedFiles && orderData.uploadedFiles.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{t('orderDetail.fields.uploadedFiles')}</div>
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
      label: t('orderDetail.tabs.progress'),
      children: (
        <div className="order-detail-content">
          {/* Status History */}
          <Card 
            title={t('orderDetail.sections.statusHistory')}
            className="detail-section" 
            size="small"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddNode}
              >
                {t('orderDetail.progress.addNode')}
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
                      <span className="node-action">{getActionText(node.action)}</span>
                      <span className="node-time">{node.time}</span>
                    </div>
                    <div className="node-description">
                      {node.description}
                    </div>
                    {node.operator && (
                      <div className="node-operator">
                        {t('orderDetail.progress.operator')} {node.operator}
                      </div>
                    )}
                    {node.images && node.images.length > 0 && (
                      <div className="node-images">
                        {node.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img.url || img}
                            alt={img.name || `Image ${idx + 1}`}
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
                                title: t('orderDetail.fields.viewImage'),
                                content: <img src={img.url || img} alt="" style={{ width: '100%' }} />,
                                width: 800,
                                okText: t('orderDetail.progress.close')
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
      {/* Tabs */}
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
            {t('orderDetail.messages.open')}
          </Button>
        }
      />

      {/* Messages Modal */}
      <MessagesModal
        visible={isMessagesModalVisible}
        onClose={() => setIsMessagesModalVisible(false)}
      />

      {/* Add Node Modal */}
      <Modal
        title={t('orderDetail.progress.modalTitle')}
        open={isAddNodeModalVisible}
        onOk={handleNodeSubmit}
        onCancel={() => setIsAddNodeModalVisible(false)}
        width={800}
        okText={t('orderDetail.progress.submit')}
        cancelText={t('orderDetail.progress.cancel')}
      >
        <Form
          form={nodeForm}
          layout="vertical"
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              <Form.Item
                label={t('orderDetail.progress.operatorLabel')}
                name="operator"
                rules={[{ required: true, message: t('orderDetail.progress.operatorPlaceholder') }]}
              >
                <Input placeholder={t('orderDetail.progress.operatorPlaceholder')} />
              </Form.Item>

              <Form.Item
                label={t('orderDetail.progress.actionLabel')}
                name="action"
                rules={[{ required: true, message: t('orderDetail.progress.actionPlaceholder') }]}
              >
                <Select placeholder={t('orderDetail.progress.actionPlaceholder')}>
                  <Select.Option value="accepted">{t('orderDetail.progress.actions.accepted')}</Select.Option>
                  <Select.Option value="scheduleProduction">{t('orderDetail.progress.actions.scheduleProduction')}</Select.Option>
                  <Select.Option value="startProduction">{t('orderDetail.progress.actions.startProduction')}</Select.Option>
                  <Select.Option value="productionCompleted">{t('orderDetail.progress.actions.productionCompleted')}</Select.Option>
                  <Select.Option value="qualityCheck">{t('orderDetail.progress.actions.qualityCheck')}</Select.Option>
                  <Select.Option value="shipping">{t('orderDetail.progress.actions.shipping')}</Select.Option>
                  <Select.Option value="received">{t('orderDetail.progress.actions.received')}</Select.Option>
                  <Select.Option value="other">{t('orderDetail.progress.actions.other')}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={t('orderDetail.progress.statusLabel')}
                name="status"
                rules={[{ required: true, message: t('orderDetail.progress.statusPlaceholder') }]}
              >
                <Select placeholder={t('orderDetail.progress.statusPlaceholder')}>
                  <Select.Option value="pending">{t('orderDetail.status.pending')}</Select.Option>
                  <Select.Option value="accepted">{t('orderDetail.status.accepted')}</Select.Option>
                  <Select.Option value="processing">{t('orderDetail.status.processing')}</Select.Option>
                  <Select.Option value="production_33">{t('orderDetail.status.production_33')}</Select.Option>
                  <Select.Option value="production_66">{t('orderDetail.status.production_66')}</Select.Option>
                  <Select.Option value="production_100">{t('orderDetail.status.production_100')}</Select.Option>
                  <Select.Option value="shipped">{t('orderDetail.status.shipped')}</Select.Option>
                  <Select.Option value="received">{t('orderDetail.status.received')}</Select.Option>
                  <Select.Option value="completed">{t('orderDetail.status.completed')}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={t('orderDetail.progress.descriptionLabel')}
                name="description"
                rules={[{ required: true, message: t('orderDetail.progress.descriptionPlaceholder') }]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder={t('orderDetail.progress.descriptionPlaceholder')}
                />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div style={{ flex: 1 }}>
              <Form.Item label={t('orderDetail.progress.uploadImage')}>
                <div>
                  <Upload {...nodeImageUploadProps} multiple>
                    <Button icon={<UploadOutlined />}>{t('orderDetail.progress.selectImages')}</Button>
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

              <Form.Item label={t('orderDetail.progress.uploadFile')}>
                <div>
                  <Upload {...nodeFileUploadProps} multiple>
                    <Button icon={<UploadOutlined />}>{t('orderDetail.progress.selectFiles')}</Button>
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
                            {t('orderDetail.progress.delete')}
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

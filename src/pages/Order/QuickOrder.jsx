import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Select, Button, Row, Col, Upload, message, Radio, InputNumber, Tag, Divider, Table, Space } from 'antd'
import { UploadOutlined, PlusOutlined, CloseCircleOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons'
import ColorSelector from '../../components/ColorSelector/ColorSelector'
import ToothSelector from '../../components/ToothSelector/ToothSelector'
import './QuickOrder.css'

const { Option } = Select
const { TextArea } = Input

function QuickOrder() {
  const [form] = Form.useForm()
  const [productList, setProductList] = useState([
    {
      id: 1,
      productName: '点击选择产品',
      toothPosition: { topLeft: [8, 3, 1], topRight: [5], bottomLeft: [7, 6], bottomRight: [7] },
      repairMethod: '新做',
      moldingMethod: '常规取模',
      scanDevice: '先临',
      scanNumber: '12345566',
      connectionMethod: '单冠'
    }
  ])
  const [colorSettings, setColorSettings] = useState([
    {
      id: 1,
      toothPosition: { topLeft: '', topRight: '', bottomLeft: '', bottomRight: '' },
      mainColor: '',
      neckColor: '',
      middleColor: '',
      cuttingEdgeColor: '',
      baseColor: '',
      toothBodyColor: '',
      customColor: ''
    }
  ])
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [selectedAttachments, setSelectedAttachments] = useState(['旧模', '咬胶', '定位柱', '取模托盘'])
  
  // 颜色选择器状态
  const [colorSelectorVisible, setColorSelectorVisible] = useState(false)
  const [currentColorField, setCurrentColorField] = useState({ id: null, field: null })

  // 牙位选择器状态
  const [toothSelectorVisible, setToothSelectorVisible] = useState(false)
  const [currentToothField, setCurrentToothField] = useState({ id: null, type: null }) // type: 'product' 或 'color'

  // 移除自动生成的 useEffect
  // useEffect(() => {
  //   ...
  // }, [])

  const handleSubmit = (values) => {
    console.log('提交订单:', values, { productList, uploadedImages, uploadedFiles })
    message.success('订单提交成功！')
    form.resetFields()
    setProductList([])
    setUploadedImages([])
    setUploadedFiles([])
  }

  // 添加产品
  const handleAddProduct = () => {
    const newProduct = {
      id: productList.length + 1,
      productName: '点击选择产品',
      toothPosition: { topLeft: '', topRight: '', bottomLeft: '', bottomRight: '' },
      repairMethod: '新做',
      moldingMethod: '常规取模',
      scanDevice: '先临',
      scanNumber: '',
      connectionMethod: '单冠',
      color: 'A1'
    }
    setProductList([...productList, newProduct])
  }

  // 选择产品
  const handleSelectProduct = (id) => {
    message.info('打开产品选择弹窗')
    // 这里可以打开产品选择弹窗
  }

  // 选择扫描设备
  const handleSelectScanDevice = (id) => {
    message.info('打开扫描设备选择弹窗')
    // 这里可以打开扫描设备选择弹窗
  }

  // 选择颜色
  const handleSelectColor = (id) => {
    message.info('打开颜色选择弹窗')
    // 这里可以打开颜色选择弹窗
  }

  // 更新牙位
  const handleUpdateToothPosition = (id, position, value) => {
    setProductList(productList.map(item => 
      item.id === id ? { 
        ...item, 
        toothPosition: { ...item.toothPosition, [position]: value } 
      } : item
    ))
  }

  // 删除产品
  const handleDeleteProduct = (id) => {
    setProductList(productList.filter(item => item.id !== id))
  }

  // 更新产品字段
  const handleUpdateProduct = (id, field, value) => {
    setProductList(productList.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  // 移除附件标签
  const handleRemoveAttachment = (item) => {
    setSelectedAttachments(selectedAttachments.filter(a => a !== item))
  }

  // 图片上传
  const imageUploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件！')
        return false
      }
      // 模拟添加图片
      setUploadedImages([...uploadedImages, { name: file.name, url: URL.createObjectURL(file) }])
      return false
    }
  }

  // 文件上传
  const fileUploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      setUploadedFiles([...uploadedFiles, { name: file.name }])
      return false
    }
  }

  // 删除上传的图片
  const handleRemoveImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  // 删除上传的文件
  const handleRemoveFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  // 添加颜色设定行
  const handleAddColorSetting = () => {
    const newColorSetting = {
      id: colorSettings.length + 1,
      toothPosition: { topLeft: '', topRight: '', bottomLeft: '', bottomRight: '' },
      mainColor: '',
      neckColor: '',
      middleColor: '',
      cuttingEdgeColor: '',
      baseColor: '',
      toothBodyColor: '',
      customColor: ''
    }
    setColorSettings([...colorSettings, newColorSetting])
  }

  // 删除颜色设定行
  const handleDeleteColorSetting = (id) => {
    setColorSettings(colorSettings.filter(item => item.id !== id))
  }

  // 更新颜色设定
  const handleUpdateColorSetting = (id, field, value) => {
    setColorSettings(colorSettings.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  // 更新颜色设定的牙位
  const handleUpdateColorToothPosition = (id, position, value) => {
    setColorSettings(colorSettings.map(item => 
      item.id === id ? { 
        ...item, 
        toothPosition: { ...item.toothPosition, [position]: value } 
      } : item
    ))
  }

  // 打开颜色选择器
  const handleOpenColorSelector = (id, field) => {
    setCurrentColorField({ id, field })
    setColorSelectorVisible(true)
  }

  // 选择颜色后的回调
  const handleColorSelect = (color) => {
    if (currentColorField.id && currentColorField.field) {
      handleUpdateColorSetting(currentColorField.id, currentColorField.field, color)
    }
  }

  // 打开牙位选择器
  const handleOpenToothSelector = (id, type) => {
    setCurrentToothField({ id, type })
    setToothSelectorVisible(true)
  }

  // 确认牙位选择
  const handleToothConfirm = (selectedTeeth) => {
    if (!currentToothField.id || !currentToothField.type) return

    if (currentToothField.type === 'product') {
      // 更新产品信息的牙位
      setProductList(productList.map(item =>
        item.id === currentToothField.id
          ? { ...item, toothPosition: selectedTeeth }
          : item
      ))
    } else if (currentToothField.type === 'color') {
      // 更新颜色设定的牙位
      setColorSettings(colorSettings.map(item =>
        item.id === currentToothField.id
          ? { ...item, toothPosition: selectedTeeth }
          : item
      ))
    }
  }

  return (
    <div className="quick-order-container">
      <h2 className="page-title">一键下单</h2>
      
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* 基础信息 */}
        <Card title="基础信息" className="section-card">
          <div className="base-info-row">
            <div className="info-item">
              <span className="info-label">诊所</span>
              <Form.Item name="clinic" style={{ marginBottom: 0 }}>
                <Select placeholder="ASIANTECH PTE. LTD." className="info-input">
                  <Option value="ASIANTECH">ASIANTECH PTE. LTD.</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">医生</span>
              <Form.Item name="doctor" rules={[{ required: true, message: '请选择医生' }]} style={{ marginBottom: 0 }}>
                <Select placeholder="黄向荣" className="info-input">
                  <Option value="黄向荣">黄向荣</Option>
                  <Option value="李医生">李医生</Option>
                  <Option value="王医生">王医生</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">生产单位</span>
              <Form.Item name="factory" style={{ marginBottom: 0 }}>
                <Select placeholder="南宁市..." className="info-input">
                  <Option value="南宁">南宁市...</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">收件人</span>
              <Form.Item name="receiver" style={{ marginBottom: 0 }}>
                <Input placeholder="朱华昌" className="info-input" />
              </Form.Item>
            </div>
            <div className="info-item info-item-wide">
              <span className="info-label">收件地址</span>
              <Form.Item name="address" style={{ marginBottom: 0 }}>
                <Input placeholder="中国广东省深圳市宝安区福海街道展城..." className="info-input" />
              </Form.Item>
            </div>
          </div>
        </Card>

        {/* 患者信息 */}
        <Card title="患者信息" className="section-card">
          <div className="base-info-row">
            <div className="info-item">
              <span className="info-label">患者</span>
              <Form.Item name="patientName" style={{ marginBottom: 0 }}>
                <Input placeholder="请输入患者姓名" className="info-input" />
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">患者手机号</span>
              <Form.Item name="patientPhone" style={{ marginBottom: 0 }}>
                <Input placeholder="请输入患者" className="info-input" />
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">性别</span>
              <Form.Item name="gender" style={{ marginBottom: 0 }}>
                <Select placeholder="请选择性别" className="info-input">
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="info-item">
              <span className="info-label">年龄</span>
              <Form.Item name="age" style={{ marginBottom: 0 }}>
                <Input placeholder="请输入年龄" className="info-input" />
              </Form.Item>
            </div>
          </div>
        </Card>

        {/* 产品信息 */}
        <Card 
          title={`产品信息 (${productList.length})`}
          className="section-card"
          extra={
            <Button type="primary" onClick={handleAddProduct}>
              新增产品
            </Button>
          }
        >
          <div className="product-table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>产品名称</th>
                  <th>牙位</th>
                  <th>取模方式</th>
                  <th>扫描设备</th>
                  <th>连接方式</th>
                  <th>修复方式</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Button 
                        type="default"
                        onClick={() => handleSelectProduct(product.id)}
                        style={{ width: '100%' }}
                      >
                        {product.productName}
                      </Button>
                    </td>
                    <td>
                      <div 
                        className="tooth-grid clickable" 
                        onClick={() => handleOpenToothSelector(product.id, 'product')}
                        title="点击选择牙位"
                      >
                        <div className="tooth-row">
                          <div className="tooth-cell-display">
                            {Array.isArray(product.toothPosition.topLeft) 
                              ? product.toothPosition.topLeft.join(',') 
                              : product.toothPosition.topLeft}
                          </div>
                          <div className="tooth-cell-display">
                            {Array.isArray(product.toothPosition.topRight) 
                              ? product.toothPosition.topRight.join(',') 
                              : product.toothPosition.topRight}
                          </div>
                        </div>
                        <div className="tooth-row">
                          <div className="tooth-cell-display">
                            {Array.isArray(product.toothPosition.bottomLeft) 
                              ? product.toothPosition.bottomLeft.join(',') 
                              : product.toothPosition.bottomLeft}
                          </div>
                          <div className="tooth-cell-display">
                            {Array.isArray(product.toothPosition.bottomRight) 
                              ? product.toothPosition.bottomRight.join(',') 
                              : product.toothPosition.bottomRight}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Select 
                        value={product.moldingMethod}
                        onChange={(value) => handleUpdateProduct(product.id, 'moldingMethod', value)}
                        style={{ width: '100%' }}
                      >
                        <Option value="常规取模">常规取模</Option>
                        <Option value="口内扫描">口内扫描</Option>
                      </Select>
                    </td>
                    <td>
                      <Button 
                        type="default"
                        onClick={() => handleSelectScanDevice(product.id)}
                        style={{ width: '100%' }}
                      >
                        {product.scanDevice && product.scanNumber 
                          ? `${product.scanDevice}：${product.scanNumber}` 
                          : '选择扫描设备'}
                      </Button>
                    </td>
                    <td>
                      <Select 
                        value={product.connectionMethod}
                        onChange={(value) => handleUpdateProduct(product.id, 'connectionMethod', value)}
                        style={{ width: '100%' }}
                      >
                        <Option value="单冠">单冠</Option>
                        <Option value="桥体">桥体</Option>
                      </Select>
                    </td>
                    <td>
                      <Select 
                        value={product.repairMethod}
                        onChange={(value) => handleUpdateProduct(product.id, 'repairMethod', value)}
                        style={{ width: '100%' }}
                      >
                        <Option value="新做">新做</Option>
                        <Option value="返修">返修</Option>
                        <Option value="重做">重做</Option>
                      </Select>
                    </td>
                    <td>
                      <Button 
                        type="link" 
                        danger 
                        size="small"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 颜色设定 */}
        <Card 
          title="颜色设定"
          className="section-card"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddColorSetting}>
              添加一行
            </Button>
          }
        >
          <div className="product-table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>牙位</th>
                  <th>主色</th>
                  <th>颈部颜色</th>
                  <th>中部颜色</th>
                  <th>切端颜色</th>
                  <th>基牙颜色</th>
                  <th>牙体颜色</th>
                  <th>自定义色</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {colorSettings.map((setting, index) => (
                  <tr key={setting.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div 
                        className="tooth-grid clickable"
                        onClick={() => handleOpenToothSelector(setting.id, 'color')}
                        title="点击选择牙位"
                      >
                        <div className="tooth-row">
                          <div className="tooth-cell-display">
                            {Array.isArray(setting.toothPosition.topLeft) 
                              ? setting.toothPosition.topLeft.join(',') 
                              : setting.toothPosition.topLeft}
                          </div>
                          <div className="tooth-cell-display">
                            {Array.isArray(setting.toothPosition.topRight) 
                              ? setting.toothPosition.topRight.join(',') 
                              : setting.toothPosition.topRight}
                          </div>
                        </div>
                        <div className="tooth-row">
                          <div className="tooth-cell-display">
                            {Array.isArray(setting.toothPosition.bottomLeft) 
                              ? setting.toothPosition.bottomLeft.join(',') 
                              : setting.toothPosition.bottomLeft}
                          </div>
                          <div className="tooth-cell-display">
                            {Array.isArray(setting.toothPosition.bottomRight) 
                              ? setting.toothPosition.bottomRight.join(',') 
                              : setting.toothPosition.bottomRight}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Input 
                        value={setting.mainColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'mainColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.neckColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'neckColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.middleColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'middleColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.cuttingEdgeColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'cuttingEdgeColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.baseColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'baseColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.toothBodyColor}
                        onClick={() => handleOpenColorSelector(setting.id, 'toothBodyColor')}
                        readOnly
                        placeholder="点击选择"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <Input 
                        value={setting.customColor}
                        onChange={(e) => handleUpdateColorSetting(setting.id, 'customColor', e.target.value)}
                        placeholder="请输入自定义..."
                      />
                    </td>
                    <td>
                      <Button 
                        type="link" 
                        danger 
                        size="small"
                        onClick={() => handleDeleteColorSetting(setting.id)}
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 其他设置 */}
        <Card title="其他设置" className="section-card">
          <Form.Item label="试戴情况" name="trialStatus">
            <Select placeholder="请选择试戴情况" allowClear>
              <Option value="试戴蜡型外形">试戴蜡型外形</Option>
              <Option value="试戴内冠">试戴内冠</Option>
              <Option value="试戴颜色">试戴颜色</Option>
              <Option value="试戴车瓷外形">试戴车瓷外形</Option>
              <Option value="试戴基台">试戴基台</Option>
              <Option value="试戴基台蜡冠">试戴基台蜡冠</Option>
            </Select>
          </Form.Item>

          <Form.Item label="设计方案">
            <div className="design-options">
              <div className="design-item">
                <div className="design-img-wrapper">
                  <div className="design-img-placeholder">
                    <span>正常覆合覆盖</span>
                  </div>
                  <Button type="text" className="design-close" icon={<span>×</span>} />
                </div>
                <p>正常覆合覆盖</p>
              </div>
              <div className="design-item">
                <div className="design-img-wrapper">
                  <div className="design-img-placeholder">
                    <span>窝沟不染色</span>
                  </div>
                  <Button type="text" className="design-close" icon={<span>×</span>} />
                </div>
                <p>窝沟不染色</p>
              </div>
              <div className="design-item">
                <div className="design-img-wrapper">
                  <div className="design-img-placeholder">
                    <span>颌面沟嵴明显</span>
                  </div>
                  <Button type="text" className="design-close" icon={<span>×</span>} />
                </div>
                <p>颌面沟嵴明显</p>
              </div>
              <div className="design-item">
                <div className="design-img-wrapper">
                  <div className="design-img-placeholder">
                    <span>功能尖锐</span>
                  </div>
                  <Button type="text" className="design-close" icon={<span>×</span>} />
                </div>
                <p>功能尖锐</p>
              </div>
              <Button type="dashed" className="add-design-btn">
                + 选择方案
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="选择附件">
            <div className="attachment-tags">
              <Button type="dashed" size="small">+ 选择附件</Button>
              {selectedAttachments.map((item, index) => (
                <Tag 
                  key={index} 
                  closable 
                  onClose={() => handleRemoveAttachment(item)}
                  color="blue"
                >
                  {item} * 1
                </Tag>
              ))}
            </div>
          </Form.Item>

          <Form.Item label="图片上传">
            <div className="upload-section">
              <div className="uploaded-images">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="uploaded-item">
                    <img src={img.url} alt={img.name} />
                    <CloseCircleOutlined 
                      className="remove-icon" 
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                ))}
                <Upload {...imageUploadProps} showUploadList={false}>
                  <div className="upload-btn">
                    <PlusOutlined />
                    <div>图片上传</div>
                  </div>
                </Upload>
              </div>
            </div>
          </Form.Item>

          <Form.Item label="上传文件">
            <div className="file-upload-section">
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-icon">📄</span>
                    <span className="file-name">{file.name}</span>
                    <DeleteOutlined 
                      className="delete-icon" 
                      onClick={() => handleRemoveFile(index)}
                    />
                  </div>
                ))}
              </div>
              <Upload {...fileUploadProps} showUploadList={false}>
                <Button icon={<PlusOutlined />}>+ 上传文件</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item label="3D文件">
            <Upload {...fileUploadProps} showUploadList={false}>
              <Button type="primary" ghost icon={<PlusOutlined />}>
                + 3D文件
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="文字备注">
            <Input.TextArea 
              rows={4} 
              placeholder="请输入文字备注"
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Card>

        {/* 提交按钮 */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            提交订单
          </Button>
          <Button size="large" style={{ marginLeft: 16 }} onClick={() => form.resetFields()}>
            重置
          </Button>
        </div>
      </Form>

      {/* 颜色选择器 */}
      <ColorSelector
        visible={colorSelectorVisible}
        onClose={() => setColorSelectorVisible(false)}
        onSelect={handleColorSelect}
        fieldType={currentColorField.field}
        currentValue={
          currentColorField.id && currentColorField.field
            ? colorSettings.find(s => s.id === currentColorField.id)?.[currentColorField.field]
            : ''
        }
      />

      {/* 牙位选择器 */}
      <ToothSelector
        visible={toothSelectorVisible}
        onClose={() => setToothSelectorVisible(false)}
        onConfirm={handleToothConfirm}
        initialValue={
          currentToothField.id && currentToothField.type
            ? currentToothField.type === 'product'
              ? productList.find(p => p.id === currentToothField.id)?.toothPosition
              : colorSettings.find(s => s.id === currentToothField.id)?.toothPosition
            : { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] }
        }
      />
    </div>
  )
}

export default QuickOrder

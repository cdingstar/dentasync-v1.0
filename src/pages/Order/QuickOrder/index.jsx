import React, { useState, useEffect } from 'react'
import { Form, Button, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import ColorSelector from '../../../components/ColorSelector/ColorSelector'
import ToothSelector from '../../../components/ToothSelector/ToothSelector'
import ProductSelectorModal from '../../../components/ProductSelectorModal/ProductSelectorModal'
import ImplantParamsModal from '../../../components/ImplantParamsModal/ImplantParamsModal'
import BaseInfo from './BaseInfo'
import PatientInfo from './PatientInfo'
import ProductInfo from './ProductInfo'
import ImplantParams from './ImplantParams'
import ColorSettings from './ColorSettings'
import OtherSettings from './OtherSettings'
import './QuickOrder.css'

function QuickOrder() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  
  /**
   * 订单模式：
   * - 'direct': 直接下单模式（一键下单）
   * - 'create': 从待下单页面新建订单
   * - 'edit': 从待下单页面编辑订单
   */
  const orderMode = location.state?.mode || 'direct'
  const editingOrder = location.state?.orderData || null
  const selectedProduct = location.state?.selectedProduct || null  // 从产品库页面传递的产品信息
  
  // 调试日志
  console.log('=== 快速下单页面初始化 ===')
  console.log('location.state:', location.state)
  console.log('orderMode:', orderMode)
  console.log('editingOrder:', editingOrder)
  console.log('selectedProduct:', selectedProduct)
  
  // 根据模式确定配置
  const modeConfig = {
    direct: {
      title: '一键下单',
      buttonText: '提交订单',
      shouldReturnToPending: false
    },
    create: {
      title: '新建订单（保存）',
      buttonText: '保存订单',
      shouldReturnToPending: true
    },
    edit: {
      title: '编辑订单',
      buttonText: '保存订单',
      shouldReturnToPending: true
    }
  }
  
  const config = modeConfig[orderMode]
  console.log('当前配置:', config)
  
  // 初始化产品列表 - 如果从产品库页面跳转过来，则使用传递的产品信息
  const getInitialProductList = () => {
    if (selectedProduct) {
      // 从产品库页面跳转，使用传递的产品信息
      return [{
        id: 1,
        productName: selectedProduct.name || '点击选择产品',
        productId: selectedProduct.productId,
        productCode: selectedProduct.productCode,
        toothPosition: { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] },
        repairMethod: '新做',
        moldingMethod: '常规取模',
        scanDevice: '先临',
        scanNumber: '',
        connectionMethod: '单冠'
      }]
    }
    // 默认空列表或示例产品
    return [{
      id: 1,
      productName: '点击选择产品',
      toothPosition: { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] },
      repairMethod: '新做',
      moldingMethod: '常规取模',
      scanDevice: '先临',
      scanNumber: '',
      connectionMethod: '单冠'
    }]
  }
  
  const [productList, setProductList] = useState(getInitialProductList())
  const [implantParamsList, setImplantParamsList] = useState([]) // 种植参数列表
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
  const [currentToothField, setCurrentToothField] = useState({ id: null, type: null })

  // 产品选择器状态
  const [productSelectorVisible, setProductSelectorVisible] = useState(false)
  const [currentProductId, setCurrentProductId] = useState(null)
  
  // 种植参数选择器状态
  const [implantParamsVisible, setImplantParamsVisible] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null) // 暂存待处理的产品信息
  const [editingImplantParams, setEditingImplantParams] = useState(null) // 编辑模式下的种植参数

  // 编辑模式 - 回填表单数据
  useEffect(() => {
    if (orderMode === 'edit' && editingOrder) {
      console.log(`[${orderMode}模式] 回填订单数据:`, editingOrder)
      
      // 回填基础表单数据
      form.setFieldsValue({
        doctor: editingOrder.doctor,
        patientName: editingOrder.patient,
        factory: editingOrder.factory,
        // 可以添加更多字段回填
      })
    }
  }, [orderMode, editingOrder, form])

  const handleSubmit = (values) => {
    console.log(`[${orderMode}模式] 提交订单 - 表单数据:`, values)
    console.log(`[${orderMode}模式] 产品列表:`, productList)
    console.log(`[${orderMode}模式] 配置:`, config)
    
    if (config.shouldReturnToPending) {
      // 保存订单并返回待下单页面 (create 或 edit 模式)
      const orderData = {
        ...values,
        productList,
        implantParamsList,
        uploadedImages,
        uploadedFiles,
        colorSettings
      }
      
      // 编辑模式：保留原订单的 key、creator 和 createTime
      if (orderMode === 'edit' && editingOrder) {
        orderData.orderKey = editingOrder.key
        orderData.creator = editingOrder.creator
        orderData.createTime = editingOrder.createTime
        console.log(`[${orderMode}模式] 保留订单信息:`, { 
          key: editingOrder.key, 
          creator: editingOrder.creator, 
          createTime: editingOrder.createTime 
        })
      }
      
      console.log(`[${orderMode}模式] 返回待下单页面, 订单数据:`, orderData)
      
      const successMessage = orderMode === 'edit' 
        ? '订单更新成功！正在返回...' 
        : '订单保存成功！正在返回...'
      message.success(successMessage)
      
      // 返回待下单页面并传递订单数据
      navigate('/order/pending', { 
        state: { 
          newOrder: orderData,
          mode: orderMode,
          timestamp: Date.now()
        },
        replace: true
      })
    } else {
      // 直接下单模式 (direct)
      console.log('[direct模式] 直接提交订单')
      message.success('订单提交成功！')
      form.resetFields()
      setProductList([])
      setImplantParamsList([])
      setUploadedImages([])
      setUploadedFiles([])
    }
  }

  // 产品相关方法
  const handleAddProduct = () => {
    const newProductId = productList.length + 1
    const newProduct = {
      id: newProductId,
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
    
    // 自动打开产品选择器对话框
    setCurrentProductId(newProductId)
    setProductSelectorVisible(true)
  }

  const handleSelectProduct = (id) => {
    setCurrentProductId(id)
    setProductSelectorVisible(true)
  }

  const handleProductSelect = (product) => {
    console.log('选择的产品:', product)
    
    // 检查产品名称是否包含"种植"
    if (product.name && product.name.includes('种植')) {
      console.log('检测到种植产品，打开种植参数选择器')
      // 暂存产品信息，等待用户填写种植参数
      setPendingProduct({
        ...product,
        productId: currentProductId
      })
      setEditingImplantParams(null) // 新增模式
      setImplantParamsVisible(true)
    } else {
      // 非种植产品，直接更新
      if (currentProductId) {
        setProductList(productList.map(item => 
          item.id === currentProductId 
            ? { 
                ...item, 
                productName: product.name,
                productId: product.key,
                productCode: product.productCode
              } 
            : item
        ))
        message.success(`已选择产品: ${product.name}`)
      }
    }
  }
  
  // 处理种植参数确认
  const handleImplantParamsConfirm = (params) => {
    console.log('种植参数:', params)
    
    if (editingImplantParams) {
      // 修改模式：更新现有参数
      setImplantParamsList(implantParamsList.map(item => 
        item.productId === editingImplantParams.productId
          ? { ...item, params }
          : item
      ))
      message.success('种植参数已更新')
      setEditingImplantParams(null)
    } else if (pendingProduct && currentProductId) {
      // 新增模式：更新产品列表并添加种植参数
      setProductList(productList.map(item => 
        item.id === currentProductId 
          ? { 
              ...item, 
              productName: pendingProduct.name,
              productId: pendingProduct.key,
              productCode: pendingProduct.productCode
            } 
          : item
      ))
      
      // 添加种植参数到列表
      setImplantParamsList([...implantParamsList, {
        productId: currentProductId,
        productName: pendingProduct.name,
        params
      }])
      
      message.success(`已选择产品: ${pendingProduct.name}`)
      setPendingProduct(null)
    }
  }
  
  // 编辑种植参数
  const handleEditImplantParams = (productId) => {
    const implantParam = implantParamsList.find(item => item.productId === productId)
    if (implantParam) {
      setEditingImplantParams(implantParam)
      setImplantParamsVisible(true)
    }
  }
  
  // 删除种植参数
  const handleDeleteImplantParams = (productId) => {
    setImplantParamsList(implantParamsList.filter(item => item.productId !== productId))
    message.success('已删除种植参数')
  }

  const handleSelectScanDevice = (id) => {
    message.info('打开扫描设备选择弹窗')
  }

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter(item => item.id !== id))
    // 同时删除对应的种植参数
    setImplantParamsList(implantParamsList.filter(item => item.productId !== id))
  }

  const handleUpdateProduct = (id, field, value) => {
    setProductList(productList.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  // 颜色设定相关方法
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

  const handleDeleteColorSetting = (id) => {
    setColorSettings(colorSettings.filter(item => item.id !== id))
  }

  const handleUpdateColorSetting = (id, field, value) => {
    setColorSettings(colorSettings.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleOpenColorSelector = (id, field) => {
    setCurrentColorField({ id, field })
    setColorSelectorVisible(true)
  }

  const handleColorSelect = (color) => {
    if (currentColorField.id && currentColorField.field) {
      handleUpdateColorSetting(currentColorField.id, currentColorField.field, color)
    }
  }

  // 牙位选择器相关方法
  const handleOpenToothSelector = (id, type) => {
    setCurrentToothField({ id, type })
    setToothSelectorVisible(true)
  }

  const handleToothConfirm = (selectedTeeth) => {
    if (!currentToothField.id || !currentToothField.type) return

    if (currentToothField.type === 'product') {
      setProductList(productList.map(item =>
        item.id === currentToothField.id
          ? { ...item, toothPosition: selectedTeeth }
          : item
      ))
    } else if (currentToothField.type === 'color') {
      setColorSettings(colorSettings.map(item =>
        item.id === currentToothField.id
          ? { ...item, toothPosition: selectedTeeth }
          : item
      ))
    }
  }

  // 附件相关方法
  const handleRemoveAttachment = (item) => {
    setSelectedAttachments(selectedAttachments.filter(a => a !== item))
  }

  // 文件上传相关方法
  const imageUploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件！')
        return false
      }
      setUploadedImages([...uploadedImages, { name: file.name, url: URL.createObjectURL(file) }])
      return false
    }
  }

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      setUploadedFiles([...uploadedFiles, { name: file.name }])
      return false
    }
  }

  const handleRemoveImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleRemoveFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="quick-order-container">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* 基础信息 */}
        <BaseInfo />

        {/* 患者信息 */}
        <PatientInfo />

        {/* 产品信息 */}
        <ProductInfo
          productList={productList}
          onAddProduct={handleAddProduct}
          onSelectProduct={handleSelectProduct}
          onOpenToothSelector={handleOpenToothSelector}
          onUpdateProduct={handleUpdateProduct}
          onSelectScanDevice={handleSelectScanDevice}
          onDeleteProduct={handleDeleteProduct}
        />

        {/* 种植参数 */}
        <ImplantParams
          implantParamsList={implantParamsList}
          onEditParams={handleEditImplantParams}
          onDeleteParams={handleDeleteImplantParams}
        />

        {/* 颜色设定 */}
        <ColorSettings
          colorSettings={colorSettings}
          onAddColorSetting={handleAddColorSetting}
          onOpenToothSelector={handleOpenToothSelector}
          onOpenColorSelector={handleOpenColorSelector}
          onUpdateColorSetting={handleUpdateColorSetting}
          onDeleteColorSetting={handleDeleteColorSetting}
        />

        {/* 其他设置 */}
        <OtherSettings
          uploadedImages={uploadedImages}
          uploadedFiles={uploadedFiles}
          selectedAttachments={selectedAttachments}
          onRemoveImage={handleRemoveImage}
          onRemoveFile={handleRemoveFile}
          onRemoveAttachment={handleRemoveAttachment}
          imageUploadProps={imageUploadProps}
          fileUploadProps={fileUploadProps}
        />

        {/* 提交按钮 */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            {config.buttonText}
          </Button>
          <Button size="large" style={{ marginLeft: 16 }} onClick={() => {
            form.resetFields()
            setImplantParamsList([])
          }}>
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

      {/* 产品选择器 */}
      <ProductSelectorModal
        visible={productSelectorVisible}
        onClose={() => setProductSelectorVisible(false)}
        onSelect={handleProductSelect}
      />
      
      {/* 种植参数选择器 */}
      <ImplantParamsModal
        visible={implantParamsVisible}
        onClose={() => {
          setImplantParamsVisible(false)
          setPendingProduct(null)
          setEditingImplantParams(null)
        }}
        onConfirm={handleImplantParamsConfirm}
        initialValues={editingImplantParams?.params || {}}
      />
    </div>
  )
}

export default QuickOrder

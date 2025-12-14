import React, { useState, useEffect } from 'react'
import { Form, Button, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  
  /**
   * Order Mode:
   * - 'direct': Direct order mode (One-click order)
   * - 'create': Create new order from pending orders page
   * - 'edit': Edit order from pending orders page
   */
  const orderMode = location.state?.mode || 'direct'
  const editingOrder = location.state?.orderData || null
  const selectedProduct = location.state?.selectedProduct || null  // Product info passed from product library page
  
  // Debug logs
  console.log('=== Quick Order Page Init ===')
  console.log('location.state:', location.state)
  console.log('orderMode:', orderMode)
  console.log('editingOrder:', editingOrder)
  console.log('selectedProduct:', selectedProduct)
  
  // Determine config based on mode
  const modeConfig = {
    direct: {
      title: t('quickOrder.modes.direct.title'),
      buttonText: t('quickOrder.modes.direct.button'),
      shouldReturnToPending: false
    },
    create: {
      title: t('quickOrder.modes.create.title'),
      buttonText: t('quickOrder.modes.create.button'),
      shouldReturnToPending: true
    },
    edit: {
      title: t('quickOrder.modes.edit.title'),
      buttonText: t('quickOrder.modes.edit.button'),
      shouldReturnToPending: true
    }
  }
  
  const config = modeConfig[orderMode]
  console.log('Current config:', config)
  
  // Initialize product list - if redirected from product library page, use passed product info
  const getInitialProductList = () => {
    if (selectedProduct) {
      // 从产品库页面跳转，使用传递的产品信息
      return [{
        id: 1,
        productName: selectedProduct.name || t('quickOrder.defaults.clickToSelect'),
        productId: selectedProduct.productId,
        productCode: selectedProduct.productCode,
        toothPosition: { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] },
        repairMethod: t('quickOrder.productInfo.options.new'),
        moldingMethod: t('quickOrder.productInfo.options.normalMolding'),
        scanDevice: t('quickOrder.productInfo.options.shining3d'),
        scanNumber: '',
        connectionMethod: t('quickOrder.productInfo.options.singleCrown')
      }]
    }
    // Default empty list or sample product
    return [{
      id: 1,
      productName: t('quickOrder.defaults.clickToSelect'),
      toothPosition: { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] },
      repairMethod: t('quickOrder.productInfo.options.new'),
      moldingMethod: t('quickOrder.productInfo.options.normalMolding'),
      scanDevice: t('quickOrder.productInfo.options.shining3d'),
      scanNumber: '',
      connectionMethod: t('quickOrder.productInfo.options.singleCrown')
    }]
  }
  
  const [productList, setProductList] = useState(getInitialProductList())
  const [implantParamsList, setImplantParamsList] = useState([]) // Implant params list
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
  const [selectedAttachments, setSelectedAttachments] = useState([
    t('attachmentSelector.items.oldMold'),
    t('attachmentSelector.items.biteWax'),
    t('attachmentSelector.items.locatorPin'),
    t('attachmentSelector.items.tray')
  ])
  
  // Color selector state
  const [colorSelectorVisible, setColorSelectorVisible] = useState(false)
  const [currentColorField, setCurrentColorField] = useState({ id: null, field: null })

  // Tooth selector state
  const [toothSelectorVisible, setToothSelectorVisible] = useState(false)
  const [currentToothField, setCurrentToothField] = useState({ id: null, type: null })

  // Product selector state
  const [productSelectorVisible, setProductSelectorVisible] = useState(false)
  const [currentProductId, setCurrentProductId] = useState(null)
  
  // Implant params selector state
  const [implantParamsVisible, setImplantParamsVisible] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null) // Temporary pending product info
  const [editingImplantParams, setEditingImplantParams] = useState(null) // Implant params in edit mode

  // Edit mode - Fill form data
  useEffect(() => {
    if (orderMode === 'edit' && editingOrder) {
      console.log(`[${orderMode}模式] 回填订单数据:`, editingOrder)
      
      // 回填基础表单数据
      // Fill basic form data
      form.setFieldsValue({
        doctor: editingOrder.doctor,
        patientName: editingOrder.patient,
        factory: editingOrder.factory,
        // Can add more fields to fill
      })
    }
  }, [orderMode, editingOrder, form])

  const handleSubmit = (values) => {
    console.log(`[${orderMode} mode] Submit order - Form data:`, values)
    console.log(`[${orderMode} mode] Product list:`, productList)
    console.log(`[${orderMode} mode] Config:`, config)
    
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
        console.log(`[${orderMode} mode] Retain order info:`, { 
          key: editingOrder.key, 
          creator: editingOrder.creator, 
          createTime: editingOrder.createTime 
        })
      }
      
      console.log(`[${orderMode} mode] Return to pending page, order data:`, orderData)
      
      const successMessage = orderMode === 'edit' 
        ? t('quickOrder.messages.orderUpdated') 
        : t('quickOrder.messages.orderSaved')
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
      console.log('[direct mode] Submit order directly')
      message.success(t('quickOrder.messages.orderSubmitted'))
      form.resetFields()
      setProductList([])
      setImplantParamsList([])
      setUploadedImages([])
      setUploadedFiles([])
    }
  }

  // Product related methods
  const handleAddProduct = () => {
    const newProductId = productList.length + 1
    const newProduct = {
      id: newProductId,
      productName: t('quickOrder.productInfo.placeholders.clickToSelectProduct'),
      toothPosition: { topLeft: '', topRight: '', bottomLeft: '', bottomRight: '' },
      repairMethod: t('quickOrder.productInfo.options.new'),
      moldingMethod: t('quickOrder.productInfo.options.normalMolding'),
      scanDevice: t('quickOrder.productInfo.options.shining3d'),
      scanNumber: '',
      connectionMethod: t('quickOrder.productInfo.options.singleCrown'),
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
    console.log('Selected product:', product)
    
    // 检查产品名称是否包含"种植"
    if (product.name && (product.name.includes('种植') || product.name.includes('Implant'))) {
      console.log('Detected implant product, opening implant params selector')
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
        message.success(t('quickOrder.messages.productSelected', { name: product.name }))
      }
    }
  }
  
  // Handle implant params confirmation
  const handleImplantParamsConfirm = (params) => {
    console.log('Implant params:', params)
    
    if (editingImplantParams) {
      // 修改模式：更新现有参数
      setImplantParamsList(implantParamsList.map(item => 
        item.productId === editingImplantParams.productId
          ? { ...item, params }
          : item
      ))
      message.success(t('quickOrder.messages.paramsUpdated'))
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
      
      message.success(t('quickOrder.messages.productSelected', { name: pendingProduct.name }))
      setPendingProduct(null)
    }
  }
  
  // Edit implant params
  const handleEditImplantParams = (productId) => {
    const implantParam = implantParamsList.find(item => item.productId === productId)
    if (implantParam) {
      setEditingImplantParams(implantParam)
      setImplantParamsVisible(true)
    }
  }
  
  // Delete implant params
  const handleDeleteImplantParams = (productId) => {
    setImplantParamsList(implantParamsList.filter(item => item.productId !== productId))
    message.success(t('quickOrder.messages.paramsDeleted'))
  }

  const handleSelectScanDevice = (id) => {
    message.info(t('quickOrder.messages.openScanDevice'))
  }

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter(item => item.id !== id))
    // Also delete corresponding implant params
    setImplantParamsList(implantParamsList.filter(item => item.productId !== id))
  }

  const handleUpdateProduct = (id, field, value) => {
    setProductList(productList.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  // Color settings related methods
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

  // Tooth selector related methods
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

  // Attachment related methods
  const handleRemoveAttachment = (item) => {
    setSelectedAttachments(selectedAttachments.filter(a => a !== item))
  }

  // File upload related methods
  const imageUploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error(t('quickOrder.messages.imageOnly'))
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
        {/* Basic Info */}
        <BaseInfo />

        {/* Patient Info */}
        <PatientInfo />

        {/* Product Info */}
        <ProductInfo
          productList={productList}
          onAddProduct={handleAddProduct}
          onSelectProduct={handleSelectProduct}
          onOpenToothSelector={handleOpenToothSelector}
          onUpdateProduct={handleUpdateProduct}
          onSelectScanDevice={handleSelectScanDevice}
          onDeleteProduct={handleDeleteProduct}
        />

        {/* Implant Params */}
        <ImplantParams
          implantParamsList={implantParamsList}
          onEditParams={handleEditImplantParams}
          onDeleteParams={handleDeleteImplantParams}
        />

        {/* Color Settings */}
        <ColorSettings
          colorSettings={colorSettings}
          onAddColorSetting={handleAddColorSetting}
          onOpenToothSelector={handleOpenToothSelector}
          onOpenColorSelector={handleOpenColorSelector}
          onUpdateColorSetting={handleUpdateColorSetting}
          onDeleteColorSetting={handleDeleteColorSetting}
        />

        {/* Other Settings */}
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

        {/* Submit Button */}
        <div className="submit-section">
          <Button type="primary" htmlType="submit" size="large">
            {config.buttonText}
          </Button>
          <Button size="large" style={{ marginLeft: 16 }} onClick={() => {
            form.resetFields()
            setImplantParamsList([])
          }}>
            {t('quickOrder.actions.reset')}
          </Button>
        </div>
      </Form>

      {/* Color Selector */}
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

      {/* Tooth Selector */}
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

      {/* Product Selector */}
      <ProductSelectorModal
        visible={productSelectorVisible}
        onClose={() => setProductSelectorVisible(false)}
        onSelect={handleProductSelect}
      />
      
      {/* Implant Params Selector */}
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

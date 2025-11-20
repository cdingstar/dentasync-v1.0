import React from 'react'
import { Modal } from 'antd'
import ProductLibrarySelector from '../ProductLibrarySelector/ProductLibrarySelector'
import './ProductSelectorModal.css'

/**
 * 产品选择器对话框组件
 * @param {Boolean} visible - 是否显示对话框
 * @param {Function} onClose - 关闭对话框回调
 * @param {Function} onSelect - 选择产品回调 (product) => void
 */
function ProductSelectorModal({ visible, onClose, onSelect }) {
  const handleProductSelect = (product) => {
    if (onSelect) {
      onSelect(product)
    }
    onClose()
  }

  return (
    <Modal
      title="选择产品"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      className="product-selector-modal"
    >
      <ProductLibrarySelector 
        onProductSelect={handleProductSelect}
        actionButtonText="选择"
      />
    </Modal>
  )
}

export default ProductSelectorModal

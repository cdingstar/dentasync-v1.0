import React from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import ProductLibrarySelector from '../ProductLibrarySelector/ProductLibrarySelector'
import './ProductSelectorModal.css'

/**
 * Product selector modal component
 * @param {Boolean} visible - Whether modal is visible
 * @param {Function} onClose - Close callback
 * @param {Function} onSelect - Select product callback (product) => void
 */
function ProductSelectorModal({ visible, onClose, onSelect }) {
  const { t } = useTranslation()

  const handleProductSelect = (product) => {
    if (onSelect) {
      onSelect(product)
    }
    onClose()
  }

  return (
    <Modal
      title={t('productLibrary.title')}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      className="product-selector-modal"
    >
      <ProductLibrarySelector 
        onProductSelect={handleProductSelect}
        actionButtonText={t('productLibrary.actions.select')}
      />
    </Modal>
  )
}

export default ProductSelectorModal

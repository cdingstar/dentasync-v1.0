import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductLibrarySelector from '../../components/ProductLibrarySelector/ProductLibrarySelector'
import './ProductLibraryOrder.css'

function ProductLibraryOrder() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Handle product selection - navigate to Quick Order page
  const handleProductSelect = (product) => {
    console.log('Select product and navigate to Quick Order:', product)
    
    // Navigate to Quick Order page and pass product info
    navigate('/order/quick', {
      state: {
        selectedProduct: {
          name: product.name,
          productCode: product.productCode,
          productId: product.key
        }
      }
    })
  }

  return (
    <div className="product-library-order-container">
      {/* Use encapsulated Product Library Selector component */}
      <ProductLibrarySelector 
        onProductSelect={handleProductSelect}
        actionButtonText={t('productLibraryOrder.actionButton')}
      />
    </div>
  )
}

export default ProductLibraryOrder

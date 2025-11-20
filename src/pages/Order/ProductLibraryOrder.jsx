import { useNavigate } from 'react-router-dom'
import ProductLibrarySelector from '../../components/ProductLibrarySelector/ProductLibrarySelector'
import './ProductLibraryOrder.css'

function ProductLibraryOrder() {
  const navigate = useNavigate()

  // 处理产品选择 - 跳转到一键下单页面
  const handleProductSelect = (product) => {
    console.log('选择产品并跳转到一键下单:', product)
    
    // 跳转到一键下单页面，并传递产品信息
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
      {/* 使用封装的产品库选择器组件 */}
      <ProductLibrarySelector 
        onProductSelect={handleProductSelect}
        actionButtonText="下单"
      />
    </div>
  )
}

export default ProductLibraryOrder

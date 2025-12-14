import React, { useState } from 'react'
import { Card, Button, Row, Col, Tree, Pagination } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ProductLibrarySelector.css'

/**
 * Reusable product library selector component
 * @param {Function} onProductSelect - Select product callback (product) => void
 * @param {String} actionButtonText - Action button text, default "Order"
 */
function ProductLibrarySelector({ 
  onProductSelect,
  actionButtonText
}) {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('implant')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const defaultActionText = t('productLibrary.actions.order')
  const finalActionText = actionButtonText || defaultActionText

  // Category Data
  const categoryTree = [
    {
      title: t('productLibrary.categories.all'),
      key: 'all'
    },
    {
      title: t('productLibrary.categories.implant'),
      key: 'implant',
      children: [
        { title: t('productLibrary.categories.implantT'), key: 'implant-1' },
        { title: t('productLibrary.categories.implantD2'), key: 'implant-2', 
          children: [
            { title: t('productLibrary.categories.allCeramic'), key: 'implant-2-1' },
            { title: t('productLibrary.categories.allZirconia'), key: 'implant-2-2' },
            { title: t('productLibrary.categories.metalPorcelain'), key: 'implant-2-3' },
            { title: t('productLibrary.categories.metalCrown'), key: 'implant-2-4' }
          ]
        },
        { title: t('productLibrary.categories.traditional'), key: 'implant-3',
          children: [
            { title: t('productLibrary.categories.allCeramic'), key: 'implant-3-1' },
            { title: t('productLibrary.categories.allZirconia'), key: 'implant-3-2' }
          ]
        }
      ]
    }
  ]

  // Category Tabs
  const categoryTabs = [
    { key: 'shine', label: t('productLibrary.categories.shine') },
    { key: 'zirconia', label: t('productLibrary.categories.zirconia') },
    { key: 'metal', label: t('productLibrary.categories.metal') },
    { key: 'castPorcelain', label: t('productLibrary.categories.castPorcelain') },
    { key: 'removable', label: t('productLibrary.categories.removable') },
    { key: 'implant', label: t('productLibrary.categories.implant') },
    { key: 'ortho', label: t('productLibrary.categories.ortho') },
    { key: 'mengdaqi', label: t('productLibrary.categories.mengdaqi') },
    { key: 'bonding', label: t('productLibrary.categories.bonding') },
    { key: 'other', label: t('productLibrary.categories.other') }
  ]

  // Product Library Data
  const allProducts = [
    {
      key: '1',
      productCode: 'DN-ZR-001',
      name: t('productLibrary.products.digitalZirconia.name'),
      category: 'implant',
      material: t('productLibrary.products.digitalZirconia.material'),
      price: null,
      unit: t('productLibrary.products.digitalZirconia.unit'),
      description: t('productLibrary.products.digitalZirconia.description'),
      image: null
    },
    {
      key: '2',
      productCode: 'DN-ZR-002',
      name: t('productLibrary.products.japanZirconia.name'),
      category: 'implant',
      material: t('productLibrary.products.japanZirconia.material'),
      price: null,
      unit: t('productLibrary.products.japanZirconia.unit'),
      description: t('productLibrary.products.japanZirconia.description'),
      image: null
    },
    {
      key: '3',
      productCode: 'DN-ZR-003',
      name: t('productLibrary.products.germanZirconia.name'),
      category: 'implant',
      material: t('productLibrary.products.germanZirconia.material'),
      price: null,
      unit: t('productLibrary.products.germanZirconia.unit'),
      description: t('productLibrary.products.germanZirconia.description'),
      image: null
    },
    {
      key: '4',
      productCode: 'DN-BR-001',
      name: t('productLibrary.products.fixedBridge.name'),
      category: 'castPorcelain',
      material: t('productLibrary.products.fixedBridge.material'),
      price: 4500,
      unit: t('productLibrary.products.fixedBridge.unit'),
      description: t('productLibrary.products.fixedBridge.description'),
      image: null
    },
    {
      key: '5',
      productCode: 'DN-VN-001',
      name: t('productLibrary.products.veneer.name'),
      category: 'veneer',
      material: t('productLibrary.products.veneer.material'),
      price: 3200,
      unit: t('productLibrary.products.veneer.unit'),
      description: t('productLibrary.products.veneer.description'),
      image: null
    }
  ]

  // Filter products based on selected category
  const products = allProducts.filter(p =>  
    selectedCategory === 'all' ? true : p.category === selectedCategory
  )

  // Handle category selection
  const handleCategorySelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedCategory(selectedKeys[0])
    }
  }

  // Products for current page
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayProducts = products.slice(startIndex, endIndex)

  return (
    <div className="product-library-selector">
      {/* Main Content Area */}
      <div className="content-wrapper">
        <Row gutter={16}>
          {/* Left Category Tree */}
          <Col span={4}>
            <Card title={t('productLibrary.labels.allCategories')} className="category-card">
              <Tree
                defaultExpandAll
                defaultSelectedKeys={['implant']}
                treeData={categoryTree}
                onSelect={handleCategorySelect}
              />
            </Card>
          </Col>

          {/* Right Product Display */}
          <Col span={20}>
            {/* Category Tabs */}
            <div className="category-tabs">
              {categoryTabs.map((tab, index) => (
                <div 
                  key={index}
                  className={`category-tab ${tab.key === selectedCategory ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Product Cards */}
            <div className="products-grid">
              <Row gutter={[16, 16]}>
                {displayProducts.map(product => (
                  <Col span={8} key={product.key}>
                    <Card className="product-card">
                      <div className="product-image">
                        <div className="image-placeholder">
                          <div className="placeholder-icon">📦</div>
                          <div className="placeholder-text">{t('productLibrary.labels.noImage')}</div>
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">
                          {product.price ? `¥${product.price}` : t('productLibrary.labels.externalPrice')}
                        </p>
                        <Button 
                          type="primary" 
                          block
                          icon={<ShoppingCartOutlined />}
                          onClick={() => onProductSelect && onProductSelect(product)}
                        >
                          {finalActionText}
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={products.length}
                onChange={(page, size) => {
                  setCurrentPage(page)
                  setPageSize(size)
                }}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => t('productLibrary.labels.totalItems', { count: total })}
                pageSizeOptions={[10, 20, 50]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductLibrarySelector

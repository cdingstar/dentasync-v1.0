import React, { useState } from 'react'
import { Card, Button, Space, Modal, Form, Input, Select, message, Row, Col, Tree, Pagination } from 'antd'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import './ProductLibraryOrder.css'

const { Option } = Select
const { TextArea } = Input
const { Search } = Input

function ProductLibraryOrder() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('种植类')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [form] = Form.useForm()

  // 分类数据
  const categoryTree = [
    {
      title: '全部',
      key: 'all'
    },
    {
      title: '种植类',
      key: 'implant',
      children: [
        { title: '固齿贝壳(T系列)', key: 'implant-1' },
        { title: 'D2个性种植系统', key: 'implant-2', 
          children: [
            { title: '全瓷类', key: 'implant-2-1' },
            { title: '全锆类', key: 'implant-2-2' },
            { title: '全属烤瓷类', key: 'implant-2-3' },
            { title: '全属冠类', key: 'implant-2-4' }
          ]
        },
        { title: '传统种植', key: 'implant-3',
          children: [
            { title: '全瓷类', key: 'implant-3-1' },
            { title: '全锆类', key: 'implant-3-2' }
          ]
        }
      ]
    }
  ]

  // 产品分类标签
  const categoryTabs = [
    '闪耀系列', '氧化锆类', '全属类', '铸瓷类', '活动类', '种植类', '正畸类', '萌大齐', '粘接类', '其他类'
  ]

  // 产品库数据
  const allProducts = [
    {
      key: '1',
      productCode: 'DN-ZR-001',
      name: '数码氧化锆种植全瓷牙',
      category: '种植类',
      material: '氧化锆',
      price: null, // 设置外部价格
      unit: '颗',
      description: '高强度氧化锆全瓷牙冠，美观耐用',
      image: null
    },
    {
      key: '2',
      productCode: 'DN-ZR-002',
      name: '日本氧化锆种植全瓷牙',
      category: '种植类',
      material: '氧化锆',
      price: null,
      unit: '颗',
      description: '日本进口氧化锆材料',
      image: null
    },
    {
      key: '3',
      productCode: 'DN-ZR-003',
      name: '德瓷氧化锆种植全瓷牙',
      category: '种植类',
      material: '氧化锆',
      price: null,
      unit: '颗',
      description: '德国工艺氧化锆',
      image: null
    },
    {
      key: '4',
      productCode: 'DN-BR-001',
      name: '固定牙桥',
      category: '铸瓷类',
      material: '金属烤瓷',
      price: 4500,
      unit: '组',
      description: '3单位金属烤瓷固定桥',
      image: null
    },
    {
      key: '5',
      productCode: 'DN-VN-001',
      name: '瓷贴面',
      category: '贴面',
      material: '全瓷',
      price: 3200,
      unit: '片',
      description: '超薄全瓷贴面，自然美观',
      image: null
    }
  ]

  // 根据选择的分类过滤产品
  const products = allProducts.filter(p => 
    selectedCategory === '种植类' ? p.category === '种植类' : true
  )

  // 处理分类选择
  const handleCategorySelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedCategory(selectedKeys[0])
    }
  }

  // 处理下单
  const handleOrder = (product) => {
    setIsModalVisible(true)
    form.setFieldsValue({
      productName: product.name,
      productCode: product.productCode
    })
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('提交订单:', values)
      message.success('订单提交成功！')
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  // 分页显示的产品
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayProducts = products.slice(startIndex, endIndex)

  return (
    <div className="product-library-order-container">
      <h2 className="page-title">产品库下单</h2>
      
      {/* 搜索栏 */}
      <Card className="search-bar-card">
        <Row gutter={16} align="middle">
          <Col span={4}>
            <span className="search-label">诊所</span>
            <Select defaultValue="ASIANTECH PTE. LTD." style={{ width: '100%' }}>
              <Option value="ASIANTECH PTE. LTD.">ASIANTECH PTE. LTD.</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className="search-label">生产单位</span>
            <Select defaultValue="南宁市..." style={{ width: '100%' }}>
              <Option value="南宁市...">南宁市...</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className="search-label">产品名称</span>
            <Search placeholder="请输入产品名称" />
          </Col>
          <Col span={3}>
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          </Col>
          <Col span={2}>
            <Button>重置</Button>
          </Col>
        </Row>
      </Card>

      {/* 主内容区 */}
      <div className="content-wrapper">
        <Row gutter={16}>
          {/* 左侧分类树 */}
          <Col span={4}>
            <Card title="全部类别" className="category-card">
              <Tree
                defaultExpandAll
                defaultSelectedKeys={['implant']}
                treeData={categoryTree}
                onSelect={handleCategorySelect}
              />
            </Card>
          </Col>

          {/* 右侧产品展示 */}
          <Col span={20}>
            {/* 分类标签 */}
            <div className="category-tabs">
              {categoryTabs.map((tab, index) => (
                <div 
                  key={index}
                  className={`category-tab ${tab === '种植类' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* 产品卡片 */}
            <div className="products-grid">
              <Row gutter={[16, 16]}>
                {displayProducts.map(product => (
                  <Col span={8} key={product.key}>
                    <Card className="product-card">
                      <div className="product-image">
                        <div className="image-placeholder">
                          <div className="placeholder-icon">📦</div>
                          <div className="placeholder-text">暂无图片</div>
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">
                          {product.price ? `¥${product.price}` : '设置外部价格'}
                        </p>
                        <Button 
                          type="primary" 
                          block
                          icon={<ShoppingCartOutlined />}
                          onClick={() => handleOrder(product)}
                        >
                          下单
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* 分页 */}
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
                showTotal={(total) => `共 ${total} 条`}
                pageSizeOptions={[10, 20, 50]}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* 下单弹窗 */}
      <Modal
        title="填写订单信息"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="产品名称"
            name="productName"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="产品编号"
            name="productCode"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="患者姓名"
            name="patientName"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
          <Form.Item
            label="患者编号"
            name="patientNo"
          >
            <Input placeholder="请输入患者编号" />
          </Form.Item>
          <Form.Item
            label="诊所医生"
            name="doctor"
            rules={[{ required: true, message: '请输入医生姓名' }]}
          >
            <Input placeholder="请输入医生姓名" />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remarks"
          >
            <TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductLibraryOrder

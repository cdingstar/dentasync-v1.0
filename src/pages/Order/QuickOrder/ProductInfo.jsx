import React from 'react'
import { Card, Button, Select } from 'antd'

const { Option } = Select

function ProductInfo({ 
  productList, 
  onAddProduct, 
  onSelectProduct, 
  onOpenToothSelector,
  onUpdateProduct,
  onSelectScanDevice,
  onDeleteProduct 
}) {
  return (
    <Card 
      title={`产品信息 (${productList.length})`}
      className="section-card"
      extra={
        <Button type="primary" onClick={onAddProduct}>
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
                    onClick={() => onSelectProduct(product.id)}
                    style={{ width: '100%' }}
                  >
                    {product.productName}
                  </Button>
                </td>
                <td>
                  <div 
                    className="tooth-grid clickable" 
                    onClick={() => onOpenToothSelector(product.id, 'product')}
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
                    onChange={(value) => onUpdateProduct(product.id, 'moldingMethod', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="常规取模">常规取模</Option>
                    <Option value="口内扫描">口内扫描</Option>
                  </Select>
                </td>
                <td>
                  <Button 
                    type="default"
                    onClick={() => onSelectScanDevice(product.id)}
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
                    onChange={(value) => onUpdateProduct(product.id, 'connectionMethod', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="单冠">单冠</Option>
                    <Option value="桥体">桥体</Option>
                  </Select>
                </td>
                <td>
                  <Select 
                    value={product.repairMethod}
                    onChange={(value) => onUpdateProduct(product.id, 'repairMethod', value)}
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
                    onClick={() => onDeleteProduct(product.id)}
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
  )
}

export default ProductInfo

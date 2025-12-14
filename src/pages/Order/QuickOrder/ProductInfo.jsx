import React from 'react'
import { Card, Button, Select } from 'antd'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Card 
      title={`${t('quickOrder.productInfo.title')} (${productList.length})`}
      className="section-card"
      extra={
        <Button type="primary" onClick={onAddProduct}>
          {t('quickOrder.productInfo.actions.add')}
        </Button>
      }
    >
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t('quickOrder.productInfo.columns.no')}</th>
              <th>{t('quickOrder.productInfo.columns.name')}</th>
              <th>{t('quickOrder.productInfo.columns.toothPosition')}</th>
              <th>{t('quickOrder.productInfo.columns.moldingMethod')}</th>
              <th>{t('quickOrder.productInfo.columns.scanDevice')}</th>
              <th>{t('quickOrder.productInfo.columns.connectionMethod')}</th>
              <th>{t('quickOrder.productInfo.columns.repairMethod')}</th>
              <th>{t('quickOrder.productInfo.columns.action')}</th>
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
                    title={t('quickOrder.productInfo.placeholders.clickToSelectTooth')}
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
                    <Option value="常规取模">{t('quickOrder.productInfo.options.normalMolding')}</Option>
                    <Option value="口内扫描">{t('quickOrder.productInfo.options.intraoralScan')}</Option>
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
                      : t('quickOrder.productInfo.placeholders.selectScanDevice')}
                  </Button>
                </td>
                <td>
                  <Select 
                    value={product.connectionMethod}
                    onChange={(value) => onUpdateProduct(product.id, 'connectionMethod', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="单冠">{t('quickOrder.productInfo.options.singleCrown')}</Option>
                    <Option value="桥体">{t('quickOrder.productInfo.options.bridge')}</Option>
                  </Select>
                </td>
                <td>
                  <Select 
                    value={product.repairMethod}
                    onChange={(value) => onUpdateProduct(product.id, 'repairMethod', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="新做">{t('quickOrder.productInfo.options.new')}</Option>
                    <Option value="返修">{t('quickOrder.productInfo.options.repair')}</Option>
                    <Option value="重做">{t('quickOrder.productInfo.options.redo')}</Option>
                  </Select>
                </td>
                <td>
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    {t('quickOrder.productInfo.actions.delete')}
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

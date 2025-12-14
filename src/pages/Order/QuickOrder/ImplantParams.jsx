import React from 'react'
import { Card, Button } from 'antd'
import { useTranslation } from 'react-i18next'

function ImplantParams({ 
  implantParamsList, 
  onEditParams,
  onDeleteParams 
}) {
  const { t } = useTranslation()

  // 格式化种植参数显示
  const formatParams = (params) => {
    if (!params) return '-'
    
    return (
      <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
        <div><strong>{t('quickOrder.implantParams.labels.system')}：</strong>{params.implantSystem || '-'}</div>
        <div><strong>{t('quickOrder.implantParams.labels.model')}：</strong>{params.implantModel || '-'}</div>
        <div><strong>{t('quickOrder.implantParams.labels.diameter')}：</strong>{params.healingCapDiameter || '-'}</div>
        <div><strong>{t('quickOrder.implantParams.labels.post')}：</strong>{params.impressionPost || '-'}</div>
        <div><strong>{t('quickOrder.implantParams.labels.repair')}：</strong>{params.repairMethod || '-'}</div>
      </div>
    )
  }

  if (implantParamsList.length === 0) {
    return null
  }

  return (
    <Card 
      title={`${t('quickOrder.implantParams.title')} (${implantParamsList.length})`}
      className="section-card"
    >
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>{t('quickOrder.implantParams.columns.no')}</th>
              <th>{t('quickOrder.implantParams.columns.params')}</th>
              <th style={{ width: '150px' }}>{t('quickOrder.implantParams.columns.action')}</th>
            </tr>
          </thead>
          <tbody>
            {implantParamsList.map((item, index) => (
              <tr key={item.productId}>
                <td>{index + 1}</td>
                <td>{formatParams(item.params)}</td>
                <td>
                  <Button 
                    type="link" 
                    size="small"
                    onClick={() => onEditParams(item.productId)}
                    style={{ marginRight: 8 }}
                  >
                    {t('quickOrder.implantParams.actions.edit')}
                  </Button>
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => onDeleteParams(item.productId)}
                  >
                    {t('quickOrder.implantParams.actions.delete')}
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

export default ImplantParams

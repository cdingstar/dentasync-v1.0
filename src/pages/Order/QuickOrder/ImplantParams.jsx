import React from 'react'
import { Card, Button } from 'antd'

function ImplantParams({ 
  implantParamsList, 
  onEditParams,
  onDeleteParams 
}) {
  // 格式化种植参数显示
  const formatParams = (params) => {
    if (!params) return '-'
    
    return (
      <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
        <div><strong>种植系统：</strong>{params.implantSystem || '-'}</div>
        <div><strong>植体型号：</strong>{params.implantModel || '-'}</div>
        <div><strong>愈合帽直径：</strong>{params.healingCapDiameter || '-'}</div>
        <div><strong>取模杆：</strong>{params.impressionPost || '-'}</div>
        <div><strong>修复方式：</strong>{params.repairMethod || '-'}</div>
      </div>
    )
  }

  if (implantParamsList.length === 0) {
    return null
  }

  return (
    <Card 
      title={`种植参数 (${implantParamsList.length})`}
      className="section-card"
    >
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>序号</th>
              <th>种植参数</th>
              <th style={{ width: '150px' }}>操作</th>
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
                    修改
                  </Button>
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => onDeleteParams(item.productId)}
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

export default ImplantParams

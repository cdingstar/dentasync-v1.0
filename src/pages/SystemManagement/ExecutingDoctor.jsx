import React from 'react'
import { Card, Badge } from 'antd'

function ExecutingDoctor() {
  return (
    <div style={{ padding: '24px' }}>
      <Card title={
        <span>
          执业医生 <Badge count={5} style={{ marginLeft: '8px' }} />
        </span>
      }>
        <p style={{ color: '#999', fontSize: '16px' }}>执业医生管理页面</p>
      </Card>
    </div>
  )
}

export default ExecutingDoctor

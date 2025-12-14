import React from 'react'
import { Card, Badge } from 'antd'
import { useTranslation } from 'react-i18next'

function ExecutingDoctor() {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '24px' }}>
      <Card title={
        <span>
          {t('executingDoctor.title')} <Badge count={5} style={{ marginLeft: '8px' }} />
        </span>
      }>
        <p style={{ color: '#999', fontSize: '16px' }}>{t('executingDoctor.content')}</p>
      </Card>
    </div>
  )
}

export default ExecutingDoctor

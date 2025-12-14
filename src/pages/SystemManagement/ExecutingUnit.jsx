import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

function ExecutingUnit() {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '24px' }}>
      <Card title={t('executingUnit.title')}>
        <p style={{ color: '#999', fontSize: '16px' }}>{t('executingUnit.content')}</p>
      </Card>
    </div>
  )
}

export default ExecutingUnit

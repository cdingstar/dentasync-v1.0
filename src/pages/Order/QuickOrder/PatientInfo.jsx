import React from 'react'
import { Card, Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select

function PatientInfo() {
  const { t } = useTranslation()

  return (
    <Card title={t('quickOrder.patientInfo.title')} className="section-card">
      <div className="base-info-row">
        <div className="info-item">
          <span className="info-label">{t('quickOrder.patientInfo.name')}</span>
          <Form.Item name="patientName" style={{ marginBottom: 0 }}>
            <Input placeholder={t('quickOrder.patientInfo.placeholders.enterName')} className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.patientInfo.phone')}</span>
          <Form.Item name="patientPhone" style={{ marginBottom: 0 }}>
            <Input placeholder={t('quickOrder.patientInfo.placeholders.enterPhone')} className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.patientInfo.gender')}</span>
          <Form.Item name="gender" style={{ marginBottom: 0 }}>
            <Select placeholder={t('quickOrder.patientInfo.placeholders.selectGender')} className="info-input">
              <Option value="male">{t('quickOrder.patientInfo.options.male')}</Option>
              <Option value="female">{t('quickOrder.patientInfo.options.female')}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.patientInfo.age')}</span>
          <Form.Item name="age" style={{ marginBottom: 0 }}>
            <Input placeholder={t('quickOrder.patientInfo.placeholders.enterAge')} className="info-input" />
          </Form.Item>
        </div>
      </div>
    </Card>
  )
}

export default PatientInfo

import React from 'react'
import { Card, Form, Select, Input } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select

function BaseInfo() {
  const { t } = useTranslation()

  return (
    <Card title={t('quickOrder.baseInfo.title')} className="section-card">
      <div className="base-info-row">
        <div className="info-item">
          <span className="info-label">{t('quickOrder.baseInfo.clinic')}</span>
          <Form.Item name="clinic" style={{ marginBottom: 0 }}>
            <Select placeholder={t('quickOrder.baseInfo.mockData.clinicName')} className="info-input">
              <Option value="ASIANTECH">{t('quickOrder.baseInfo.mockData.clinicName')}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.baseInfo.doctor')}</span>
          <Form.Item name="doctor" rules={[{ required: true, message: t('quickOrder.baseInfo.placeholders.selectDoctor') }]} style={{ marginBottom: 0 }}>
            <Select placeholder={t('quickOrder.baseInfo.placeholders.selectDoctor')} className="info-input">
              <Option value="黄向荣">{t('quickOrder.baseInfo.mockData.doctorHuang')}</Option>
              <Option value="李医生">{t('quickOrder.baseInfo.mockData.doctorLi')}</Option>
              <Option value="王医生">{t('quickOrder.baseInfo.mockData.doctorWang')}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.baseInfo.factory')}</span>
          <Form.Item name="factory" style={{ marginBottom: 0 }}>
            <Select placeholder={t('quickOrder.baseInfo.factory')} className="info-input">
              <Option value="南宁">{t('quickOrder.baseInfo.mockData.factoryNanning')}</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">{t('quickOrder.baseInfo.receiver')}</span>
          <Form.Item name="receiver" style={{ marginBottom: 0 }}>
            <Input placeholder={t('quickOrder.baseInfo.placeholders.enterReceiver')} className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item info-item-wide">
          <span className="info-label">{t('quickOrder.baseInfo.address')}</span>
          <Form.Item name="address" style={{ marginBottom: 0 }}>
            <Input placeholder={t('quickOrder.baseInfo.placeholders.enterAddress')} className="info-input" />
          </Form.Item>
        </div>
      </div>
    </Card>
  )
}

export default BaseInfo

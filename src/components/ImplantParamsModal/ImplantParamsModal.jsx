import React, { useState, useEffect } from 'react'
import { Modal, Select, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import './ImplantParamsModal.css'

const { Option } = Select

function ImplantParamsModal({ visible, onClose, onConfirm, initialValues = {} }) {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  // Check if it is edit mode
  const isEditMode = initialValues && Object.keys(initialValues).length > 0

  // Implant system options
  const implantSystems = [
    { label: t('implantParams.options.systems.carls'), value: t('implantParams.options.systems.carls') },
    { label: t('implantParams.options.systems.implant'), value: t('implantParams.options.systems.implant') }
  ]
  
  // Implant model options
  const implantModels = [
    { label: t('implantParams.options.models.wide50'), value: t('implantParams.options.models.wide50') },
    { label: t('implantParams.options.models.wide45'), value: t('implantParams.options.models.wide45') },
    { label: t('implantParams.options.models.standard40'), value: t('implantParams.options.models.standard40') },
    { label: t('implantParams.options.models.narrow35'), value: t('implantParams.options.models.narrow35') }
  ]
  
  // Healing cap diameter options
  const healingCapDiameters = [
    { label: t('implantParams.options.healingCaps.d45'), value: t('implantParams.options.healingCaps.d45') },
    { label: t('implantParams.options.healingCaps.d50'), value: t('implantParams.options.healingCaps.d50') },
    { label: t('implantParams.options.healingCaps.d55'), value: t('implantParams.options.healingCaps.d55') },
    { label: t('implantParams.options.healingCaps.d60'), value: t('implantParams.options.healingCaps.d60') }
  ]
  
  // Impression post options
  const impressionPosts = [
    { label: t('implantParams.options.impressionPosts.open'), value: t('implantParams.options.impressionPosts.open') },
    { label: t('implantParams.options.impressionPosts.closed'), value: t('implantParams.options.impressionPosts.closed') }
  ]
  
  // Repair method options
  const repairMethods = [
    { label: t('implantParams.options.repairMethods.screw'), value: t('implantParams.options.repairMethods.screw') },
    { label: t('implantParams.options.repairMethods.cement'), value: t('implantParams.options.repairMethods.cement') },
    { label: t('implantParams.options.repairMethods.hybrid'), value: t('implantParams.options.repairMethods.hybrid') }
  ]

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        implantSystem: initialValues.implantSystem || t('implantParams.options.systems.carls'),
        implantModel: initialValues.implantModel || t('implantParams.options.models.wide50'),
        healingCapDiameter: initialValues.healingCapDiameter || '',
        impressionPost: initialValues.impressionPost || '',
        repairMethod: initialValues.repairMethod || ''
      })
    }
  }, [visible, initialValues, form])

  const handleConfirm = () => {
    form.validateFields().then(values => {
      onConfirm(values)
      onClose()
    })
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={isEditMode ? t('implantParams.editTitle') : t('implantParams.title')}
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      width={400}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
    >
      <Form
        form={form}
        layout="vertical"
        className="implant-params-form"
      >
        <Form.Item
          name="implantSystem"
          label={t('implantParams.system')}
          rules={[{ required: true, message: t('implantParams.systemPlaceholder') }]}
        >
          <Select placeholder={t('implantParams.systemPlaceholder')} suffixIcon={<span>▼</span>}>
            {implantSystems.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="implantModel"
          label={t('implantParams.model')}
          rules={[{ required: true, message: t('implantParams.modelPlaceholder') }]}
        >
          <Select placeholder={t('implantParams.modelPlaceholder')} suffixIcon={<span>▼</span>}>
            {implantModels.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="healingCapDiameter"
          label={t('implantParams.healingCap')}
          rules={[{ required: true, message: t('implantParams.healingCapPlaceholder') }]}
        >
          <Select placeholder={t('implantParams.healingCapPlaceholder')} suffixIcon={<span>▼</span>}>
            {healingCapDiameters.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="impressionPost"
          label={t('implantParams.impressionPost')}
          rules={[{ required: true, message: t('implantParams.impressionPostPlaceholder') }]}
        >
          <Select placeholder={t('implantParams.impressionPostPlaceholder')} suffixIcon={<span>▼</span>}>
            {impressionPosts.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="repairMethod"
          label={t('implantParams.repairMethod')}
          rules={[{ required: true, message: t('implantParams.repairMethodPlaceholder') }]}
        >
          <Select placeholder={t('implantParams.repairMethodPlaceholder')} suffixIcon={<span>▼</span>}>
            {repairMethods.map(item => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ImplantParamsModal

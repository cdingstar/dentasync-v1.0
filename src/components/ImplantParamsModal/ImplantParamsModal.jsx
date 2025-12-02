import React, { useState, useEffect } from 'react'
import { Modal, Select, Form } from 'antd'
import './ImplantParamsModal.css'

const { Option } = Select

function ImplantParamsModal({ visible, onClose, onConfirm, initialValues = {} }) {
  const [form] = Form.useForm()

  // 判断是否为编辑模式
  const isEditMode = initialValues && Object.keys(initialValues).length > 0

  // 种植系统选项
  const implantSystems = ['卡尔斯系统', '种植系统']
  
  // 植体型号选项
  const implantModels = ['宽型 5.0', '宽型 4.5', '标准型 4.0', '窄型 3.5']
  
  // 愈合帽直径选项
  const healingCapDiameters = ['4.5mm', '5.0mm', '5.5mm', '6.0mm']
  
  // 取模杆选项
  const impressionPosts = ['开放式取模杆', '闭合式取模杆']
  
  // 修复方式选项
  const repairMethods = ['螺丝固位', '粘接固位', '混合固位']

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        implantSystem: initialValues.implantSystem || '卡尔斯系统',
        implantModel: initialValues.implantModel || '宽型 5.0',
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
      title={isEditMode ? "修改种植参数" : "种植参数选择"}
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      width={400}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        className="implant-params-form"
      >
        <Form.Item
          name="implantSystem"
          label="种植系统"
          rules={[{ required: true, message: '请选择种植系统' }]}
        >
          <Select placeholder="请选择种植系统" suffixIcon={<span>▼</span>}>
            {implantSystems.map(system => (
              <Option key={system} value={system}>{system}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="implantModel"
          label="植体型号"
          rules={[{ required: true, message: '请选择植体型号' }]}
        >
          <Select placeholder="请选择植体型号" suffixIcon={<span>▼</span>}>
            {implantModels.map(model => (
              <Option key={model} value={model}>{model}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="healingCapDiameter"
          label="愈合帽直径"
          rules={[{ required: true, message: '请选择愈合帽直径' }]}
        >
          <Select placeholder="请选择愈合帽" suffixIcon={<span>▼</span>}>
            {healingCapDiameters.map(diameter => (
              <Option key={diameter} value={diameter}>{diameter}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="impressionPost"
          label="取模杆"
          rules={[{ required: true, message: '请选择取模杆' }]}
        >
          <Select placeholder="请选择取模杆" suffixIcon={<span>▼</span>}>
            {impressionPosts.map(post => (
              <Option key={post} value={post}>{post}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="repairMethod"
          label="修复方式"
          rules={[{ required: true, message: '请选择修复方式' }]}
        >
          <Select placeholder="请选择修复方式" suffixIcon={<span>▼</span>}>
            {repairMethods.map(method => (
              <Option key={method} value={method}>{method}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ImplantParamsModal

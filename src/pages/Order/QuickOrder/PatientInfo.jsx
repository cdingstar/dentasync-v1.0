import React from 'react'
import { Card, Form, Input, Select } from 'antd'

const { Option } = Select

function PatientInfo() {
  return (
    <Card title="患者信息" className="section-card">
      <div className="base-info-row">
        <div className="info-item">
          <span className="info-label">患者</span>
          <Form.Item name="patientName" style={{ marginBottom: 0 }}>
            <Input placeholder="请输入患者姓名" className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">患者手机号</span>
          <Form.Item name="patientPhone" style={{ marginBottom: 0 }}>
            <Input placeholder="请输入患者" className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">性别</span>
          <Form.Item name="gender" style={{ marginBottom: 0 }}>
            <Select placeholder="请选择性别" className="info-input">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">年龄</span>
          <Form.Item name="age" style={{ marginBottom: 0 }}>
            <Input placeholder="请输入年龄" className="info-input" />
          </Form.Item>
        </div>
      </div>
    </Card>
  )
}

export default PatientInfo

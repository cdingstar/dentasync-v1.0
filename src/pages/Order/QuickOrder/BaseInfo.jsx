import React from 'react'
import { Card, Form, Select, Input } from 'antd'

const { Option } = Select

function BaseInfo() {
  return (
    <Card title="基础信息" className="section-card">
      <div className="base-info-row">
        <div className="info-item">
          <span className="info-label">诊所</span>
          <Form.Item name="clinic" style={{ marginBottom: 0 }}>
            <Select placeholder="ASIANTECH PTE. LTD." className="info-input">
              <Option value="ASIANTECH">ASIANTECH PTE. LTD.</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">医生</span>
          <Form.Item name="doctor" rules={[{ required: true, message: '请选择医生' }]} style={{ marginBottom: 0 }}>
            <Select placeholder="黄向荣" className="info-input">
              <Option value="黄向荣">黄向荣</Option>
              <Option value="李医生">李医生</Option>
              <Option value="王医生">王医生</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">生产单位</span>
          <Form.Item name="factory" style={{ marginBottom: 0 }}>
            <Select placeholder="南宁市..." className="info-input">
              <Option value="南宁">南宁市...</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info-item">
          <span className="info-label">收件人</span>
          <Form.Item name="receiver" style={{ marginBottom: 0 }}>
            <Input placeholder="朱华昌" className="info-input" />
          </Form.Item>
        </div>
        <div className="info-item info-item-wide">
          <span className="info-label">收件地址</span>
          <Form.Item name="address" style={{ marginBottom: 0 }}>
            <Input placeholder="中国广东省深圳市宝安区福海街道展城..." className="info-input" />
          </Form.Item>
        </div>
      </div>
    </Card>
  )
}

export default BaseInfo

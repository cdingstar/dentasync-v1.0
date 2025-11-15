import React, { useState } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, message } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import './ColorSelector.css'

const { TabPane } = Tabs

function ColorSelector({ visible, onClose, onSelect, currentValue, fieldType }) {
  const [activeTab, setActiveTab] = useState('vita-classic')

  // VITA Classic 色卡数据 - 按ABCD分组
  const vitaClassicColors = {
    'A': ['A1', 'A2', 'A3', 'A3.5', 'A4'],
    'B': ['B1', 'B2', 'B3', 'B4'],
    'C': ['C1', 'C2', 'C3', 'C4'],
    'D': ['D2', 'D3', 'D4']
  }

  // VITA 3D-Master 色卡数据 - 按12345分组
  const vita3DMasterColors = {
    '1': ['1M1', '1M2'],
    '2': ['2L1.5', '2L2.5', '2M1', '2M2', '2M3', '2R1.5', '2R2.5'],
    '3': ['3L1.5', '3L2.5', '3M1', '3M2', '3M3', '3R1.5', '3R2.5'],
    '4': ['4L1.5', '4L2.5', '4M1', '4M2', '4M3', '4R1.5', '4R2.5'],
    '5': ['5M1', '5M2', '5M3']
  }

  // 特殊色数据
  const specialColors = [
    { id: 'fluorosis', label: '氟斑牙' },
    { id: 'tetracycline', label: '四环素牙' },
    { id: 'metal-post', label: '金属桩' },
    { id: 'fiber-post', label: '纤维桩' }
  ]

  // 处理颜色选择
  const handleColorSelect = (color) => {
    onSelect(color)
    onClose()
  }

  // 判断是否为基牙颜色字段
  const isBaseColorField = fieldType === 'baseColor'

  // 处理图片上传
  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      message.success('图片上传成功')
      onSelect(`图片:${info.file.name}`)
      onClose()
    }
  }

  const uploadProps = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件！')
        return false
      }
      // 模拟上传成功
      handleColorSelect(`图片:${file.name}`)
      return false
    }
  }

  return (
    <Modal
      title="选择颜色"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="color-selector-modal"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* VITA Classic 标签页 - 4x5布局 */}
        <TabPane tab="VITA Classic (16色)" key="vita-classic">
          <div className="color-grid-container">
            {Object.entries(vitaClassicColors).map(([group, colors]) => (
              <div key={group} className="color-row-group">
                <Row gutter={[8, 8]} align="middle">
                  <Col span={2} className="group-label-col">
                    <div className="group-label">{group}</div>
                  </Col>
                  {colors.map(color => (
                    <Col key={color} span={4}>
                      <Button
                        className={`color-btn ${currentValue === color ? 'selected' : ''}`}
                        onClick={() => handleColorSelect(color)}
                      >
                        {color}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        </TabPane>

        {/* VITA 3D-Master 标签页 - 5x7布局 */}
        <TabPane tab="VITA 3D MASTER (29色)" key="vita-3d-master">
          <div className="color-grid-container">
            {Object.entries(vita3DMasterColors).map(([group, colors]) => (
              <div key={group} className="color-row-group">
                <Row gutter={[8, 8]} align="middle">
                  <Col span={2} className="group-label-col">
                    <div className="group-label">{group}</div>
                  </Col>
                  {colors.map(color => (
                    <Col key={color} span={Math.floor(22 / 7)}>
                      <Button
                        className={`color-btn ${currentValue === color ? 'selected' : ''}`}
                        onClick={() => handleColorSelect(color)}
                      >
                        {color}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        </TabPane>

        {/* 特殊色标签页 - 仅在基牙颜色时可用 */}
        <TabPane tab="特殊色" key="special-colors" disabled={!isBaseColorField}>
          <div className="special-color-container">
            <Row gutter={[16, 16]}>
              {specialColors.map(color => (
                <Col key={color.id} span={12}>
                  <Button
                    className={`special-color-btn ${currentValue === color.label ? 'selected' : ''}`}
                    onClick={() => handleColorSelect(color.label)}
                    block
                  >
                    {color.label}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </TabPane>

        {/* 图片标签页 */}
        <TabPane tab="图片" key="image">
          <div className="image-upload-container">
            <Upload {...uploadProps}>
              <Button 
                type="primary" 
                icon={<PictureOutlined />} 
                size="large"
                className="upload-image-btn"
              >
                上传图片
              </Button>
            </Upload>
            <p className="upload-tip">支持 JPG、PNG 等图片格式</p>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default ColorSelector

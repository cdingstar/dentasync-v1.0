import React, { useState } from 'react'
import { Modal, Tabs, Button, Row, Col, Upload, message } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ColorSelector.css'

const { TabPane } = Tabs

function ColorSelector({ visible, onClose, onSelect, currentValue, fieldType }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('vita-classic')

  // VITA Classic Color Data - Grouped by ABCD
  const vitaClassicColors = {
    'A': ['A1', 'A2', 'A3', 'A3.5', 'A4'],
    'B': ['B1', 'B2', 'B3', 'B4'],
    'C': ['C1', 'C2', 'C3', 'C4'],
    'D': ['D2', 'D3', 'D4']
  }

  // VITA 3D-Master Color Data - Grouped by 12345
  const vita3DMasterColors = {
    '1': ['1M1', '1M2'],
    '2': ['2L1.5', '2L2.5', '2M1', '2M2', '2M3', '2R1.5', '2R2.5'],
    '3': ['3L1.5', '3L2.5', '3M1', '3M2', '3M3', '3R1.5', '3R2.5'],
    '4': ['4L1.5', '4L2.5', '4M1', '4M2', '4M3', '4R1.5', '4R2.5'],
    '5': ['5M1', '5M2', '5M3']
  }

  // Special Color Data
  const specialColors = [
    { id: 'fluorosis', label: t('colorSelector.specialColors.fluorosis') },
    { id: 'tetracycline', label: t('colorSelector.specialColors.tetracycline') },
    { id: 'metal-post', label: t('colorSelector.specialColors.metalPost') },
    { id: 'fiber-post', label: t('colorSelector.specialColors.fiberPost') }
  ]

  // Handle color selection
  const handleColorSelect = (color) => {
    onSelect(color)
    onClose()
  }

  // Check if it is a base color field
  const isBaseColorField = fieldType === 'baseColor'

  // Handle image upload
  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(t('colorSelector.messages.uploadSuccess'))
      onSelect(`Image:${info.file.name}`)
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
        message.error(t('colorSelector.messages.onlyImages'))
        return false
      }
      // Simulate upload success
      handleColorSelect(`Image:${file.name}`)
      return false
    }
  }

  return (
    <Modal
      title={t('colorSelector.title')}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="color-selector-modal"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* VITA Classic Tab - 4x5 Layout */}
        <TabPane tab={t('colorSelector.tabs.vitaClassic')} key="vita-classic">
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

        {/* VITA 3D-Master Tab - 5x7 Layout */}
        <TabPane tab={t('colorSelector.tabs.vita3DMaster')} key="vita-3d-master">
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

        {/* Special Colors Tab - Only available for base color */}
        <TabPane tab={t('colorSelector.tabs.special')} key="special-colors" disabled={!isBaseColorField}>
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

        {/* Image Tab */}
        <TabPane tab={t('colorSelector.tabs.image')} key="image">
          <div className="image-upload-container">
            <Upload {...uploadProps}>
              <Button 
                type="primary" 
                icon={<PictureOutlined />} 
                size="large"
                className="upload-image-btn"
              >
                {t('colorSelector.actions.upload')}
              </Button>
            </Upload>
            <p className="upload-tip">{t('colorSelector.messages.uploadTip')}</p>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default ColorSelector

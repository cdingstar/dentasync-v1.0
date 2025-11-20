import React, { useState } from 'react'
import { Card, Form, Select, Button, Upload, Tag, Input } from 'antd'
import { PlusOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import DesignSchemeModal from '../../../components/DesignSchemeModal/DesignSchemeModal'
import AttachmentSelectorModal from '../../../components/AttachmentSelectorModal/AttachmentSelectorModal'

const { Option } = Select

function OtherSettings({ 
  uploadedImages,
  uploadedFiles,
  selectedAttachments,
  onRemoveImage,
  onRemoveFile,
  onRemoveAttachment,
  imageUploadProps,
  fileUploadProps
}) {
  const [designSchemeVisible, setDesignSchemeVisible] = useState(false)
  const [selectedDesignSchemes, setSelectedDesignSchemes] = useState({})
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false)
  const [selectedAttachmentsList, setSelectedAttachmentsList] = useState([])

  // 处理设计方案选择
  const handleDesignSchemeConfirm = (schemes) => {
    setSelectedDesignSchemes(schemes)
  }

  // 移除某个设计方案
  const handleRemoveScheme = (category) => {
    setSelectedDesignSchemes(prev => {
      const newSchemes = { ...prev }
      delete newSchemes[category]
      return newSchemes
    })
  }

  // 获取已选中的方案列表
  const getSelectedSchemesList = () => {
    return Object.values(selectedDesignSchemes)
  }

  // 处理附件选择确认
  const handleAttachmentConfirm = (attachments) => {
    setSelectedAttachmentsList(attachments)
  }

  // 移除某个附件
  const handleRemoveAttachment = (name) => {
    setSelectedAttachmentsList(prev => 
      prev.filter(item => item.name !== name)
    )
  }

  return (
    <Card title="其他设置" className="section-card">
      <Form.Item label="试戴情况" name="trialStatus">
        <Select placeholder="请选择试戴情况" allowClear>
          <Option value="试戴蜡型外形">试戴蜡型外形</Option>
          <Option value="试戴内冠">试戴内冠</Option>
          <Option value="试戴颜色">试戴颜色</Option>
          <Option value="试戴车瓷外形">试戴车瓷外形</Option>
          <Option value="试戴基台">试戴基台</Option>
          <Option value="试戴基台蜡冠">试戴基台蜡冠</Option>
        </Select>
      </Form.Item>

      <Form.Item label="设计方案">
        <div className="design-options">
          {getSelectedSchemesList().map((scheme, index) => (
            <div key={scheme.id} className="design-item">
              <div className="design-img-wrapper">
                <div className="design-img-placeholder">
                  <span>🦷</span>
                </div>
                <Button 
                  type="text" 
                  className="design-close" 
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    // 找到该方案所属的分类
                    const category = Object.keys(selectedDesignSchemes).find(
                      key => selectedDesignSchemes[key].id === scheme.id
                    )
                    if (category) {
                      handleRemoveScheme(category)
                    }
                  }}
                />
              </div>
              <p>{scheme.name}</p>
            </div>
          ))}
          <Button 
            type="dashed" 
            className="add-design-btn"
            onClick={() => setDesignSchemeVisible(true)}
          >
            + 选择方案
          </Button>
        </div>
      </Form.Item>

      {/* 设计方案选择对话框 */}
      <DesignSchemeModal
        visible={designSchemeVisible}
        onClose={() => setDesignSchemeVisible(false)}
        onConfirm={handleDesignSchemeConfirm}
        initialSelection={selectedDesignSchemes}
      />

      <Form.Item label="选择附件">
        <div className="attachment-tags">
          <Button 
            type="dashed" 
            size="small"
            onClick={() => setAttachmentModalVisible(true)}
          >
            + 选择附件
          </Button>
          {selectedAttachmentsList.map((item, index) => (
            <Tag 
              key={index} 
              closable 
              onClose={() => handleRemoveAttachment(item.name)}
              color="blue"
            >
              {item.name} * {item.count}
            </Tag>
          ))}
        </div>
      </Form.Item>

      {/* 附件选择对话框 */}
      <AttachmentSelectorModal
        visible={attachmentModalVisible}
        onClose={() => setAttachmentModalVisible(false)}
        onConfirm={handleAttachmentConfirm}
        initialSelection={selectedAttachmentsList}
      />

      <Form.Item label="图片上传">
        <div className="upload-section">
          <div className="uploaded-images">
            {uploadedImages.map((img, index) => (
              <div key={index} className="uploaded-item">
                <img src={img.url} alt={img.name} />
                <CloseCircleOutlined 
                  className="remove-icon" 
                  onClick={() => onRemoveImage(index)}
                />
              </div>
            ))}
            <Upload {...imageUploadProps} showUploadList={false}>
              <div className="upload-btn">
                <PlusOutlined />
                <div>图片上传</div>
              </div>
            </Upload>
          </div>
        </div>
      </Form.Item>

      <Form.Item label="上传文件">
        <div className="file-upload-section">
          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-icon">📄</span>
                <span className="file-name">{file.name}</span>
                <DeleteOutlined 
                  className="delete-icon" 
                  onClick={() => onRemoveFile(index)}
                />
              </div>
            ))}
          </div>
          <Upload {...fileUploadProps} showUploadList={false}>
            <Button icon={<PlusOutlined />}>+ 上传文件</Button>
          </Upload>
        </div>
      </Form.Item>

      <Form.Item label="3D文件">
        <Upload {...fileUploadProps} showUploadList={false}>
          <Button type="primary" ghost icon={<PlusOutlined />}>
            + 3D文件
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="文字备注">
        <Input.TextArea 
          rows={4} 
          placeholder="请输入文字备注"
          maxLength={500}
          showCount
        />
      </Form.Item>
    </Card>
  )
}

export default OtherSettings

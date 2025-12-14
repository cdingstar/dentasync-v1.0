import React, { useState } from 'react'
import { Card, Form, Select, Button, Upload, Tag, Input } from 'antd'
import { PlusOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
    <Card title={t('quickOrder.otherSettings.title')} className="section-card">
      <Form.Item label={t('quickOrder.otherSettings.labels.trialStatus')} name="trialStatus">
        <Select placeholder={t('quickOrder.otherSettings.placeholders.selectTrialStatus')} allowClear>
          <Option value="试戴蜡型外形">{t('quickOrder.otherSettings.trialOptions.waxShape')}</Option>
          <Option value="试戴内冠">{t('quickOrder.otherSettings.trialOptions.innerCrown')}</Option>
          <Option value="试戴颜色">{t('quickOrder.otherSettings.trialOptions.color')}</Option>
          <Option value="试戴车瓷外形">{t('quickOrder.otherSettings.trialOptions.porcelainShape')}</Option>
          <Option value="试戴基台">{t('quickOrder.otherSettings.trialOptions.abutment')}</Option>
          <Option value="试戴基台蜡冠">{t('quickOrder.otherSettings.trialOptions.abutmentWaxCrown')}</Option>
        </Select>
      </Form.Item>

      <Form.Item label={t('quickOrder.otherSettings.labels.designScheme')}>
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
            + {t('quickOrder.otherSettings.actions.selectScheme')}
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

      <Form.Item label={t('quickOrder.otherSettings.labels.attachments')}>
        <div className="attachment-tags">
          <Button 
            type="dashed" 
            size="small"
            onClick={() => setAttachmentModalVisible(true)}
          >
            + {t('quickOrder.otherSettings.actions.selectAttachment')}
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

      <Form.Item label={t('quickOrder.otherSettings.labels.imageUpload')}>
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
                <div>{t('quickOrder.otherSettings.actions.uploadImage')}</div>
              </div>
            </Upload>
          </div>
        </div>
      </Form.Item>

      <Form.Item label={t('quickOrder.otherSettings.labels.fileUpload')}>
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
            <Button icon={<PlusOutlined />}>+ {t('quickOrder.otherSettings.actions.uploadFile')}</Button>
          </Upload>
        </div>
      </Form.Item>

      <Form.Item label={t('quickOrder.otherSettings.labels.file3d')}>
        <Upload {...fileUploadProps} showUploadList={false}>
          <Button type="primary" ghost icon={<PlusOutlined />}>
            + {t('quickOrder.otherSettings.actions.upload3d')}
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item label={t('quickOrder.otherSettings.labels.remarks')}>
        <Input.TextArea 
          rows={4} 
          placeholder={t('quickOrder.otherSettings.placeholders.enterRemarks')}
          maxLength={500}
          showCount
        />
      </Form.Item>
    </Card>
  )
}

export default OtherSettings

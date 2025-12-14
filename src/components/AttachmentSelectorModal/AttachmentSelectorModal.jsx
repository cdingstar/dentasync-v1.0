import React, { useState, useEffect } from 'react'
import { Modal, Button, InputNumber } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './AttachmentSelectorModal.css'

/**
 * Attachment selection modal
 * @param {Boolean} visible - Whether to show the modal
 * @param {Function} onClose - Close callback
 * @param {Function} onConfirm - Confirm callback, parameter is array of selected attachments [{name, count}]
 * @param {Array} initialSelection - Initially selected attachments
 */
function AttachmentSelectorModal({ visible, onClose, onConfirm, initialSelection = [] }) {
  const { t } = useTranslation()
  const [selectedAttachments, setSelectedAttachments] = useState({})

  // Attachment list data
  const attachmentList = [
    { label: t('attachmentSelector.items.factoryArticulator'), value: t('attachmentSelector.items.factoryArticulator') },
    { label: t('attachmentSelector.items.articulatorPad'), value: t('attachmentSelector.items.articulatorPad') },
    { label: t('attachmentSelector.items.screwAttachment'), value: t('attachmentSelector.items.screwAttachment') },
    { label: t('attachmentSelector.items.faceBow'), value: t('attachmentSelector.items.faceBow') },
    { label: t('attachmentSelector.items.bracket'), value: t('attachmentSelector.items.bracket') },
    { label: t('attachmentSelector.items.screw'), value: t('attachmentSelector.items.screw') },
    { label: t('attachmentSelector.items.band'), value: t('attachmentSelector.items.band') },
    { label: t('attachmentSelector.items.impressionPost'), value: t('attachmentSelector.items.impressionPost') },
    { label: t('attachmentSelector.items.oldMold'), value: t('attachmentSelector.items.oldMold') },
    { label: t('attachmentSelector.items.analog'), value: t('attachmentSelector.items.analog') },
    { label: t('attachmentSelector.items.doctorArticulator'), value: t('attachmentSelector.items.doctorArticulator') },
    { label: t('attachmentSelector.items.usbDisk'), value: t('attachmentSelector.items.usbDisk') },
    { label: t('attachmentSelector.items.waxCrown'), value: t('attachmentSelector.items.waxCrown') },
    { label: t('attachmentSelector.items.refMold'), value: t('attachmentSelector.items.refMold') },
    { label: t('attachmentSelector.items.biteWax'), value: t('attachmentSelector.items.biteWax') },
    { label: t('attachmentSelector.items.transferScrew'), value: t('attachmentSelector.items.transferScrew') },
    { label: t('attachmentSelector.items.warrantyCard'), value: t('attachmentSelector.items.warrantyCard') },
    { label: t('attachmentSelector.items.abutmentNote'), value: t('attachmentSelector.items.abutmentNote') },
    { label: t('attachmentSelector.items.locator'), value: t('attachmentSelector.items.locator') },
    { label: t('attachmentSelector.items.impressionCap'), value: t('attachmentSelector.items.impressionCap') },
    { label: t('attachmentSelector.items.abutment'), value: t('attachmentSelector.items.abutment') },
    { label: t('attachmentSelector.items.oldTooth'), value: t('attachmentSelector.items.oldTooth') },
    { label: t('attachmentSelector.items.transferPost'), value: t('attachmentSelector.items.transferPost') },
    { label: t('attachmentSelector.items.impressionPostScrew'), value: t('attachmentSelector.items.impressionPostScrew') },
    { label: t('attachmentSelector.items.waxRim'), value: t('attachmentSelector.items.waxRim') },
    { label: t('attachmentSelector.items.tray'), value: t('attachmentSelector.items.tray') },
    { label: t('attachmentSelector.items.oldTray'), value: t('attachmentSelector.items.oldTray') },
    { label: t('attachmentSelector.items.abutmentScrew'), value: t('attachmentSelector.items.abutmentScrew') },
    { label: t('attachmentSelector.items.diagnosticWax'), value: t('attachmentSelector.items.diagnosticWax') },
    { label: t('attachmentSelector.items.locatorPin'), value: t('attachmentSelector.items.locatorPin') }
  ]

  // Initialize selection state
  useEffect(() => {
    if (visible && initialSelection.length > 0) {
      const initState = {}
      initialSelection.forEach(item => {
        if (typeof item === 'string') {
          // Compatible with old format "Attachment Name * Count"
          const match = item.match(/(.+?)\s*\*\s*(\d+)/)
          if (match) {
            initState[match[1].trim()] = parseInt(match[2])
          } else {
            initState[item] = 1
          }
        } else if (item.name) {
          // New format {name, count}
          initState[item.name] = item.count || 1
        }
      })
      setSelectedAttachments(initState)
    }
  }, [visible, initialSelection])

  // Toggle attachment selection
  const toggleAttachment = (name) => {
    setSelectedAttachments(prev => {
      const newState = { ...prev }
      if (newState[name]) {
        delete newState[name]
      } else {
        newState[name] = 1
      }
      return newState
    })
  }

  // Update attachment count
  const updateCount = (name, count) => {
    if (count < 1) {
      // Remove attachment if count is less than 1
      setSelectedAttachments(prev => {
        const newState = { ...prev }
        delete newState[name]
        return newState
      })
    } else {
      setSelectedAttachments(prev => ({
        ...prev,
        [name]: count
      }))
    }
  }

  // Increment count
  const incrementCount = (name) => {
    updateCount(name, (selectedAttachments[name] || 0) + 1)
  }

  // Decrement count
  const decrementCount = (name) => {
    const currentCount = selectedAttachments[name] || 0
    if (currentCount > 1) {
      updateCount(name, currentCount - 1)
    } else {
      updateCount(name, 0) // Remove
    }
  }

  // Check if selected
  const isSelected = (name) => {
    return !!selectedAttachments[name]
  }

  // Get attachment display label
  const getAttachmentLabel = (name) => {
    const item = attachmentList.find(i => i.value === name)
    return item ? item.label : name
  }

  // Confirm selection
  const handleConfirm = () => {
    const result = Object.entries(selectedAttachments).map(([name, count]) => ({
      name,
      count
    }))
    onConfirm && onConfirm(result)
    onClose()
  }

  // Cancel
  const handleCancel = () => {
    onClose()
  }

  // Get selected attachments list
  const getSelectedList = () => {
    return Object.entries(selectedAttachments).map(([name, count]) => ({
      name,
      count
    }))
  }

  return (
    <Modal
      title={t('attachmentSelector.title')}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={900}
      className="attachment-selector-modal"
    >
      <div className="attachment-modal-content">
        {/* Left: Attachment selection area */}
        <div className="attachment-left">
          <div className="attachment-grid">
            {attachmentList.map((item, index) => (
              <Button
                key={index}
                type={isSelected(item.value) ? 'primary' : 'default'}
                className={`attachment-btn ${isSelected(item.value) ? 'selected' : ''}`}
                onClick={() => toggleAttachment(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Right: Selected attachments list */}
        <div className="attachment-right">
          <div className="selected-header">{t('attachmentSelector.selectedHeader')}</div>
          <div className="selected-list">
            {getSelectedList().map((item, index) => (
              <div key={index} className="selected-item">
                <span className="item-name">{getAttachmentLabel(item.name)}</span>
                <div className="count-control">
                  <Button
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => decrementCount(item.name)}
                  />
                  <InputNumber
                    size="small"
                    min={1}
                    max={999}
                    value={item.count}
                    onChange={(value) => updateCount(item.name, value || 1)}
                    className="count-input"
                  />
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => incrementCount(item.name)}
                  />
                </div>
              </div>
            ))}
            {getSelectedList().length === 0 && (
              <div className="empty-tip">{t('attachmentSelector.emptyTip')}</div>
            )}
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="modal-footer">
        <Button onClick={handleCancel}>{t('common.cancel')}</Button>
        <Button type="primary" onClick={handleConfirm}>
          {t('common.confirm')}
        </Button>
      </div>
    </Modal>
  )
}

export default AttachmentSelectorModal

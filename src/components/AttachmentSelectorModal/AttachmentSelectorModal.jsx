import React, { useState, useEffect } from 'react'
import { Modal, Button, InputNumber } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import './AttachmentSelectorModal.css'

/**
 * 附件选择对话框
 * @param {Boolean} visible - 是否显示对话框
 * @param {Function} onClose - 关闭对话框回调
 * @param {Function} onConfirm - 确认选择回调，参数为选中的附件数组 [{name, count}]
 * @param {Array} initialSelection - 初始选中的附件
 */
function AttachmentSelectorModal({ visible, onClose, onConfirm, initialSelection = [] }) {
  const [selectedAttachments, setSelectedAttachments] = useState({})

  // 附件列表数据
  const attachmentList = [
    '工厂颌架', '颌架垫片', '螺丝附件', '颜面弓', '托槽',
    '螺旋', '带环', '取模杆', '旧模', '替代体',
    '医生颌架', 'U盘', '蜡冠', '参考模', '咬胶',
    '转移杆螺丝', '保证卡', '基台发货单', '定位器', '印模帽',
    '基台', '旧牙', '转移杆', '取模杆螺丝', '蜡堤',
    '托盘', '旧托', '基台螺丝', '诊断蜡型'
  ]

  // 初始化选中状态
  useEffect(() => {
    if (visible && initialSelection.length > 0) {
      const initState = {}
      initialSelection.forEach(item => {
        if (typeof item === 'string') {
          // 兼容旧格式 "附件名 * 数量"
          const match = item.match(/(.+?)\s*\*\s*(\d+)/)
          if (match) {
            initState[match[1].trim()] = parseInt(match[2])
          } else {
            initState[item] = 1
          }
        } else if (item.name) {
          // 新格式 {name, count}
          initState[item.name] = item.count || 1
        }
      })
      setSelectedAttachments(initState)
    }
  }, [visible, initialSelection])

  // 切换附件选中状态
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

  // 更新附件数量
  const updateCount = (name, count) => {
    if (count < 1) {
      // 数量小于1时移除该附件
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

  // 增加数量
  const incrementCount = (name) => {
    updateCount(name, (selectedAttachments[name] || 0) + 1)
  }

  // 减少数量
  const decrementCount = (name) => {
    const currentCount = selectedAttachments[name] || 0
    if (currentCount > 1) {
      updateCount(name, currentCount - 1)
    } else {
      updateCount(name, 0) // 移除
    }
  }

  // 检查是否选中
  const isSelected = (name) => {
    return !!selectedAttachments[name]
  }

  // 确认选择
  const handleConfirm = () => {
    const result = Object.entries(selectedAttachments).map(([name, count]) => ({
      name,
      count
    }))
    onConfirm && onConfirm(result)
    onClose()
  }

  // 取消
  const handleCancel = () => {
    onClose()
  }

  // 获取已选中的附件列表
  const getSelectedList = () => {
    return Object.entries(selectedAttachments).map(([name, count]) => ({
      name,
      count
    }))
  }

  return (
    <Modal
      title="选择附件"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={900}
      className="attachment-selector-modal"
    >
      <div className="attachment-modal-content">
        {/* 左侧：附件选择区 */}
        <div className="attachment-left">
          <div className="attachment-grid">
            {attachmentList.map((name, index) => (
              <Button
                key={index}
                type={isSelected(name) ? 'primary' : 'default'}
                className={`attachment-btn ${isSelected(name) ? 'selected' : ''}`}
                onClick={() => toggleAttachment(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        {/* 右侧：已选附件列表 */}
        <div className="attachment-right">
          <div className="selected-header">已选附件</div>
          <div className="selected-list">
            {getSelectedList().map((item, index) => (
              <div key={index} className="selected-item">
                <span className="item-name">{item.name}</span>
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
              <div className="empty-tip">请从左侧选择附件</div>
            )}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="modal-footer">
        <Button onClick={handleCancel}>取消</Button>
        <Button type="primary" onClick={handleConfirm}>
          确定
        </Button>
      </div>
    </Modal>
  )
}

export default AttachmentSelectorModal

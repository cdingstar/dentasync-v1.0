import React, { useState } from 'react'
import { Modal, Tabs, Badge } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './DesignSchemeModal.css'

const { TabPane } = Tabs

/**
 * 设计方案选择对话框
 * @param {Boolean} visible - 是否显示对话框
 * @param {Function} onClose - 关闭对话框回调
 * @param {Function} onConfirm - 确认选择回调，参数为选中的方案 { category: item }
 * @param {Object} initialSelection - 初始选中的方案
 */
function DesignSchemeModal({ visible, onClose, onConfirm, initialSelection = {} }) {
  const [selectedSchemes, setSelectedSchemes] = useState(initialSelection)
  const [activeTab, setActiveTab] = useState('design')

  // 设计方案数据
  const schemeData = {
    design: {
      label: '设计',
      items: [
        { id: 'design-1', name: '对颌合', image: null },
        { id: 'design-2', name: '鼻基柱到', image: null },
        { id: 'design-3', name: '正常覆合覆盖', image: null },
        { id: 'design-4', name: '咬合', image: null }
      ]
    },
    color: {
      label: '颜色',
      items: [
        { id: 'color-1', name: '窝沟不染色', image: null },
        { id: 'color-2', name: '窝沟染色', image: null },
        { id: 'color-3', name: '自然染色', image: null },
        { id: 'color-4', name: '重度染色', image: null }
      ]
    },
    shape: {
      label: '外形',
      items: [
        { id: 'shape-1', name: '颌面沟嵴明显', image: null },
        { id: 'shape-2', name: '颌面沟嵴平缓', image: null },
        { id: 'shape-3', name: '功能尖锐', image: null },
        { id: 'shape-4', name: '功能尖钝', image: null }
      ]
    },
    surface: {
      label: '冠面设计',
      items: [
        { id: 'surface-1', name: '光滑表面', image: null },
        { id: 'surface-2', name: '纹理表面', image: null },
        { id: 'surface-3', name: '自然表面', image: null }
      ]
    },
    edge: {
      label: '螺孔头',
      items: [
        { id: 'edge-1', name: '圆形螺孔', image: null },
        { id: 'edge-2', name: '方形螺孔', image: null },
        { id: 'edge-3', name: '封闭螺孔', image: null }
      ]
    },
    collar: {
      label: '邻接',
      items: [
        { id: 'collar-1', name: '紧密邻接', image: null },
        { id: 'collar-2', name: '标准邻接', image: null },
        { id: 'collar-3', name: '宽松邻接', image: null }
      ]
    },
    margin: {
      label: '边缘',
      items: [
        { id: 'margin-1', name: '刀刃边缘', image: null },
        { id: 'margin-2', name: '标准边缘', image: null },
        { id: 'margin-3', name: '厚重边缘', image: null }
      ]
    },
    body: {
      label: '坯体',
      items: [
        { id: 'body-1', name: '标准厚度', image: null },
        { id: 'body-2', name: '加厚坯体', image: null },
        { id: 'body-3', name: '减薄坯体', image: null }
      ]
    },
    occlusion: {
      label: '咬合',
      items: [
        { id: 'occlusion-1', name: '正常咬合', image: null },
        { id: 'occlusion-2', name: '浅咬合', image: null },
        { id: 'occlusion-3', name: '深咬合', image: null }
      ]
    }
  }

  // 处理方案选择
  const handleSelectScheme = (category, item) => {
    setSelectedSchemes(prev => {
      const newSelection = { ...prev }
      
      // 如果点击的是已选中的项，则取消选中
      if (newSelection[category]?.id === item.id) {
        delete newSelection[category]
      } else {
        // 否则选中该项（单选）
        newSelection[category] = item
      }
      
      return newSelection
    })
  }

  // 处理确认
  const handleConfirm = () => {
    onConfirm && onConfirm(selectedSchemes)
    onClose()
  }

  // 检查某个分类是否有选中项
  const hasSelection = (category) => {
    return !!selectedSchemes[category]
  }

  // 检查某个项是否被选中
  const isSelected = (category, itemId) => {
    return selectedSchemes[category]?.id === itemId
  }

  return (
    <Modal
      title="设计方案"
      open={visible}
      onCancel={onClose}
      onOk={handleConfirm}
      okText="确定"
      cancelText="取消"
      width={900}
      className="design-scheme-modal"
    >
      <div className="scheme-title">选择设计方案</div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="scheme-tabs"
      >
        {Object.entries(schemeData).map(([key, data]) => (
          <TabPane
            tab={
              <Badge dot={hasSelection(key)} offset={[8, 0]}>
                <span>{data.label}</span>
              </Badge>
            }
            key={key}
          >
            <div className="scheme-grid">
              {data.items.map(item => (
                <div 
                  key={item.id} 
                  className={`scheme-item ${isSelected(key, item.id) ? 'selected' : ''}`}
                  onClick={() => handleSelectScheme(key, item)}
                >
                  <div className="scheme-img-wrapper">
                    <div className="scheme-img-placeholder">
                      <span>🦷</span>
                    </div>
                    {isSelected(key, item.id) && (
                      <CloseCircleOutlined className="selected-icon" />
                    )}
                  </div>
                  <p className="scheme-name">{item.name}</p>
                </div>
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  )
}

export default DesignSchemeModal

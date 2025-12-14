import React, { useState } from 'react'
import { Modal, Tabs, Badge } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './DesignSchemeModal.css'

const { TabPane } = Tabs

/**
 * Design scheme selection modal
 * @param {Boolean} visible - Whether modal is visible
 * @param {Function} onClose - Close callback
 * @param {Function} onConfirm - Confirm callback, param is selected schemes { category: item }
 * @param {Object} initialSelection - Initial selected schemes
 */
function DesignSchemeModal({ visible, onClose, onConfirm, initialSelection = {} }) {
  const { t } = useTranslation()
  const [selectedSchemes, setSelectedSchemes] = useState(initialSelection)
  const [activeTab, setActiveTab] = useState('design')

  // Design scheme data
  const schemeData = {
    design: {
      label: t('designScheme.tabs.design'),
      items: [
        { id: 'design-1', name: t('designScheme.options.design.opposing'), image: null },
        { id: 'design-2', name: t('designScheme.options.design.nasal'), image: null },
        { id: 'design-3', name: t('designScheme.options.design.normal'), image: null },
        { id: 'design-4', name: t('designScheme.options.design.bite'), image: null }
      ]
    },
    color: {
      label: t('designScheme.tabs.color'),
      items: [
        { id: 'color-1', name: t('designScheme.options.color.noStain'), image: null },
        { id: 'color-2', name: t('designScheme.options.color.stain'), image: null },
        { id: 'color-3', name: t('designScheme.options.color.natural'), image: null },
        { id: 'color-4', name: t('designScheme.options.color.heavy'), image: null }
      ]
    },
    shape: {
      label: t('designScheme.tabs.shape'),
      items: [
        { id: 'shape-1', name: t('designScheme.options.shape.obvious'), image: null },
        { id: 'shape-2', name: t('designScheme.options.shape.smooth'), image: null },
        { id: 'shape-3', name: t('designScheme.options.shape.sharp'), image: null },
        { id: 'shape-4', name: t('designScheme.options.shape.blunt'), image: null }
      ]
    },
    surface: {
      label: t('designScheme.tabs.surface'),
      items: [
        { id: 'surface-1', name: t('designScheme.options.surface.smooth'), image: null },
        { id: 'surface-2', name: t('designScheme.options.surface.texture'), image: null },
        { id: 'surface-3', name: t('designScheme.options.surface.natural'), image: null }
      ]
    },
    edge: {
      label: t('designScheme.tabs.edge'),
      items: [
        { id: 'edge-1', name: t('designScheme.options.edge.round'), image: null },
        { id: 'edge-2', name: t('designScheme.options.edge.square'), image: null },
        { id: 'edge-3', name: t('designScheme.options.edge.closed'), image: null }
      ]
    },
    collar: {
      label: t('designScheme.tabs.collar'),
      items: [
        { id: 'collar-1', name: t('designScheme.options.collar.tight'), image: null },
        { id: 'collar-2', name: t('designScheme.options.collar.standard'), image: null },
        { id: 'collar-3', name: t('designScheme.options.collar.loose'), image: null }
      ]
    },
    margin: {
      label: t('designScheme.tabs.margin'),
      items: [
        { id: 'margin-1', name: t('designScheme.options.margin.knife'), image: null },
        { id: 'margin-2', name: t('designScheme.options.margin.standard'), image: null },
        { id: 'margin-3', name: t('designScheme.options.margin.thick'), image: null }
      ]
    },
    body: {
      label: t('designScheme.tabs.body'),
      items: [
        { id: 'body-1', name: t('designScheme.options.body.standard'), image: null },
        { id: 'body-2', name: t('designScheme.options.body.thick'), image: null },
        { id: 'body-3', name: t('designScheme.options.body.thin'), image: null }
      ]
    },
    occlusion: {
      label: t('designScheme.tabs.occlusion'),
      items: [
        { id: 'occlusion-1', name: t('designScheme.options.occlusion.normal'), image: null },
        { id: 'occlusion-2', name: t('designScheme.options.occlusion.shallow'), image: null },
        { id: 'occlusion-3', name: t('designScheme.options.occlusion.deep'), image: null }
      ]
    }
  }

  // Handle scheme selection
  const handleSelectScheme = (category, item) => {
    setSelectedSchemes(prev => {
      const newSelection = { ...prev }
      
      // If clicking selected item, deselect it
      if (newSelection[category]?.id === item.id) {
        delete newSelection[category]
      } else {
        // Otherwise select it (single selection)
        newSelection[category] = item
      }
      
      return newSelection
    })
  }

  // Handle confirm
  const handleConfirm = () => {
    onConfirm && onConfirm(selectedSchemes)
    onClose()
  }

  // Check if a category has selection
  const hasSelection = (category) => {
    return !!selectedSchemes[category]
  }

  // Check if an item is selected
  const isSelected = (category, itemId) => {
    return selectedSchemes[category]?.id === itemId
  }

  return (
    <Modal
      title={t('designScheme.title')}
      open={visible}
      onCancel={onClose}
      onOk={handleConfirm}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
      width={900}
      className="design-scheme-modal"
    >
      <div className="scheme-title">{t('designScheme.selectTitle')}</div>
      
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

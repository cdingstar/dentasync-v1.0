import React from 'react'
import { Card, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

function ColorSettings({ 
  colorSettings, 
  onAddColorSetting,
  onOpenToothSelector,
  onOpenColorSelector,
  onUpdateColorSetting,
  onDeleteColorSetting 
}) {
  const { t } = useTranslation()

  return (
    <Card 
      title={t('quickOrder.colorSettings.title')}
      className="section-card"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddColorSetting}>
          {t('quickOrder.colorSettings.actions.addRow')}
        </Button>
      }
    >
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t('quickOrder.colorSettings.columns.no')}</th>
              <th>{t('quickOrder.colorSettings.columns.toothPosition')}</th>
              <th>{t('quickOrder.colorSettings.columns.mainColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.neckColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.middleColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.cuttingEdgeColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.baseColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.toothBodyColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.customColor')}</th>
              <th>{t('quickOrder.colorSettings.columns.action')}</th>
            </tr>
          </thead>
          <tbody>
            {colorSettings.map((setting, index) => (
              <tr key={setting.id}>
                <td>{index + 1}</td>
                <td>
                  <div 
                    className="tooth-grid clickable"
                    onClick={() => onOpenToothSelector(setting.id, 'color')}
                    title={t('quickOrder.colorSettings.placeholders.clickToSelectTooth')}
                  >
                    <div className="tooth-row">
                      <div className="tooth-cell-display">
                        {Array.isArray(setting.toothPosition.topLeft) 
                          ? setting.toothPosition.topLeft.join(',') 
                          : setting.toothPosition.topLeft}
                      </div>
                      <div className="tooth-cell-display">
                        {Array.isArray(setting.toothPosition.topRight) 
                          ? setting.toothPosition.topRight.join(',') 
                          : setting.toothPosition.topRight}
                      </div>
                    </div>
                    <div className="tooth-row">
                      <div className="tooth-cell-display">
                        {Array.isArray(setting.toothPosition.bottomLeft) 
                          ? setting.toothPosition.bottomLeft.join(',') 
                          : setting.toothPosition.bottomLeft}
                      </div>
                      <div className="tooth-cell-display">
                        {Array.isArray(setting.toothPosition.bottomRight) 
                          ? setting.toothPosition.bottomRight.join(',') 
                          : setting.toothPosition.bottomRight}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Input 
                    value={setting.mainColor}
                    onClick={() => onOpenColorSelector(setting.id, 'mainColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.neckColor}
                    onClick={() => onOpenColorSelector(setting.id, 'neckColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.middleColor}
                    onClick={() => onOpenColorSelector(setting.id, 'middleColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.cuttingEdgeColor}
                    onClick={() => onOpenColorSelector(setting.id, 'cuttingEdgeColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.baseColor}
                    onClick={() => onOpenColorSelector(setting.id, 'baseColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.toothBodyColor}
                    onClick={() => onOpenColorSelector(setting.id, 'toothBodyColor')}
                    readOnly
                    placeholder={t('quickOrder.colorSettings.placeholders.clickToSelect')}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.customColor}
                    onChange={(e) => onUpdateColorSetting(setting.id, 'customColor', e.target.value)}
                    placeholder={t('quickOrder.colorSettings.placeholders.enterCustom')}
                  />
                </td>
                <td>
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => onDeleteColorSetting(setting.id)}
                  >
                    {t('quickOrder.colorSettings.actions.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default ColorSettings

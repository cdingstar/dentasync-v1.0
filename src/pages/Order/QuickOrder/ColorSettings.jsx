import React from 'react'
import { Card, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function ColorSettings({ 
  colorSettings, 
  onAddColorSetting,
  onOpenToothSelector,
  onOpenColorSelector,
  onUpdateColorSetting,
  onDeleteColorSetting 
}) {
  return (
    <Card 
      title="颜色设定"
      className="section-card"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddColorSetting}>
          添加一行
        </Button>
      }
    >
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>牙位</th>
              <th>主色</th>
              <th>颈部颜色</th>
              <th>中部颜色</th>
              <th>切端颜色</th>
              <th>基牙颜色</th>
              <th>牙体颜色</th>
              <th>自定义色</th>
              <th>操作</th>
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
                    title="点击选择牙位"
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
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.neckColor}
                    onClick={() => onOpenColorSelector(setting.id, 'neckColor')}
                    readOnly
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.middleColor}
                    onClick={() => onOpenColorSelector(setting.id, 'middleColor')}
                    readOnly
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.cuttingEdgeColor}
                    onClick={() => onOpenColorSelector(setting.id, 'cuttingEdgeColor')}
                    readOnly
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.baseColor}
                    onClick={() => onOpenColorSelector(setting.id, 'baseColor')}
                    readOnly
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.toothBodyColor}
                    onClick={() => onOpenColorSelector(setting.id, 'toothBodyColor')}
                    readOnly
                    placeholder="点击选择"
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <Input 
                    value={setting.customColor}
                    onChange={(e) => onUpdateColorSetting(setting.id, 'customColor', e.target.value)}
                    placeholder="请输入自定义..."
                  />
                </td>
                <td>
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => onDeleteColorSetting(setting.id)}
                  >
                    删除
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

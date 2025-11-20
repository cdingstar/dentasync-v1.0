import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import './ToothSelector.css'

function ToothSelector({ visible, onClose, onConfirm, initialValue }) {
  const [selectedTeeth, setSelectedTeeth] = useState([])

  // 定义所有牙齿的编号
  const topLeft = [18, 17, 16, 15, 14, 13, 12, 11]
  const topRight = [21, 22, 23, 24, 25, 26, 27, 28]
  const bottomLeft = [48, 47, 46, 45, 44, 43, 42, 41]
  const bottomRight = [31, 32, 33, 34, 35, 36, 37, 38]

  // 当对话框打开时，解析初始值
  useEffect(() => {
    if (visible && initialValue) {
      const allSelected = []
      
      if (Array.isArray(initialValue.topLeft)) {
        initialValue.topLeft.forEach(num => allSelected.push(10 + num))
      }
      if (Array.isArray(initialValue.topRight)) {
        initialValue.topRight.forEach(num => allSelected.push(20 + num))
      }
      if (Array.isArray(initialValue.bottomLeft)) {
        initialValue.bottomLeft.forEach(num => allSelected.push(40 + num))
      }
      if (Array.isArray(initialValue.bottomRight)) {
        initialValue.bottomRight.forEach(num => allSelected.push(30 + num))
      }
      
      setSelectedTeeth(allSelected)
    } else if (!visible) {
      setSelectedTeeth([])
    }
  }, [visible, initialValue])

  // 切换牙齿选中状态
  const toggleTooth = (toothNumber) => {
    setSelectedTeeth(prev => {
      if (prev.includes(toothNumber)) {
        return prev.filter(t => t !== toothNumber)
      } else {
        return [...prev, toothNumber]
      }
    })
  }

  // 检查牙齿是否被选中
  const isToothSelected = (toothNumber) => {
    return selectedTeeth.includes(toothNumber)
  }

  // 全口选择
  const selectAll = () => {
    setSelectedTeeth([...topLeft, ...topRight, ...bottomLeft, ...bottomRight])
  }

  // 上颌选择
  const selectUpperJaw = () => {
    const upperTeeth = [...topLeft, ...topRight]
    const allUpperSelected = upperTeeth.every(t => selectedTeeth.includes(t))
    if (allUpperSelected) {
      setSelectedTeeth(selectedTeeth.filter(t => !upperTeeth.includes(t)))
    } else {
      const newSelected = [...selectedTeeth]
      upperTeeth.forEach(t => {
        if (!newSelected.includes(t)) {
          newSelected.push(t)
        }
      })
      setSelectedTeeth(newSelected)
    }
  }

  // 下颌选择
  const selectLowerJaw = () => {
    const lowerTeeth = [...bottomLeft, ...bottomRight]
    const allLowerSelected = lowerTeeth.every(t => selectedTeeth.includes(t))
    if (allLowerSelected) {
      setSelectedTeeth(selectedTeeth.filter(t => !lowerTeeth.includes(t)))
    } else {
      const newSelected = [...selectedTeeth]
      lowerTeeth.forEach(t => {
        if (!newSelected.includes(t)) {
          newSelected.push(t)
        }
      })
      setSelectedTeeth(newSelected)
    }
  }

  // 清空选择
  const clearAll = () => {
    setSelectedTeeth([])
  }

  // 确认选择
  const handleConfirm = () => {
    const result = {
      topLeft: selectedTeeth.filter(t => topLeft.includes(t)).map(t => t % 10).sort((a, b) => b - a),
      topRight: selectedTeeth.filter(t => topRight.includes(t)).map(t => t % 10).sort((a, b) => b - a),
      bottomLeft: selectedTeeth.filter(t => bottomLeft.includes(t)).map(t => t % 10).sort((a, b) => b - a),
      bottomRight: selectedTeeth.filter(t => bottomRight.includes(t)).map(t => t % 10).sort((a, b) => b - a)
    }
    onConfirm(result)
    onClose()
  }

  // 获取中间十字架显示的牙位号码
  const getQuadrantDisplay = (quadrant) => {
    const teeth = selectedTeeth
      .filter(t => quadrant.includes(t))
      .map(t => t % 10)
      .sort((a, b) => b - a)
      .join('')
    return teeth
  }

  // 绘制单个牙齿
  const Tooth = ({ number, x, y, rotation = 0 }) => {
    const selected = isToothSelected(number)
    const toothNumber = number % 10
    const is3rdTooth = toothNumber === 3
    
    // 判断3号牙齿的象限，以确定三角形方向
    const isUpperLeft = number === 13  // 左上3
    const isUpperRight = number === 23 // 右上3
    const isLowerLeft = number === 43  // 左下3
    const isLowerRight = number === 33 // 右下3
    
    return (
      <g 
        transform={`translate(${x}, ${y}) rotate(${rotation})`}
        onClick={(e) => { e.stopPropagation(); toggleTooth(number); }}
        className="tooth-group"
      >
        {is3rdTooth ? (
          // 3号牙齿：带弧度的三角形（缩小10%）
          <path
            d={
              isLowerLeft || isUpperLeft
                ? "M -27,-18 Q -31.5,-9 -28.8,0 Q -27,13.5 -22.5,22.5 Q -13.5,28.8 0,30.6 Q 13.5,28.8 22.5,22.5 Q 27,13.5 28.8,0 Q 31.5,-9 27,-18 Q 18,-27 0,-28.8 Q -18,-27 -27,-18 Z"
                : "M 27,-18 Q 31.5,-9 28.8,0 Q 27,13.5 22.5,22.5 Q 13.5,28.8 0,30.6 Q -13.5,28.8 -22.5,22.5 Q -27,13.5 -28.8,0 Q -31.5,-9 -27,-18 Q -18,-27 0,-28.8 Q 18,-27 27,-18 Z"
            }
            className={`tooth-rect ${selected ? 'selected' : ''}`}
            style={{ 
              fill: selected ? '#3b82f6' : 'white',
              stroke: selected ? '#3b82f6' : '#e0e0e0'
            }}
          />
        ) : (
          // 其他牙齿：正常矩形（缩小10%：68 * 0.9 = 61.2）
          <rect
            x="-30.5"
            y="-30.5"
            width="61"
            height="61"
            rx="9"
            className={`tooth-rect ${selected ? 'selected' : ''}`}
          />
        )}
        <text
          x={is3rdTooth ? 0 : 0}
          y={is3rdTooth ? 0 : 0}
          className="tooth-number"
          style={{ fill: selected ? '#fff' : '#d0d0d0' }}
        >
          {toothNumber}
        </text>
      </g>
    )
  }

  return (
    <Modal
      title="选择牙位"
      open={visible}
      onCancel={onClose}
      width={600}
      footer={null}
      className="tooth-selector-modal"
      centered
    >
      <div className="tooth-selector-container">
        {/* SVG牙齿环形图 - 再缩小30% */}
        <div className="teeth-diagram-wrapper">
          <svg width="500" height="500" viewBox="0 0 1000 1000">
            {/* 左上象限 - 18到11，从下到上：8→7→6→5→4→3→2→1 */}
            <Tooth number={18} x={180} y={448} rotation={-85} />  {/* 8 - 左侧底部 */}
            <Tooth number={17} x={180} y={358} rotation={-80} />  {/* 7 */}
            <Tooth number={16} x={185} y={268} rotation={-70} />  {/* 6 */}
            <Tooth number={15} x={200} y={183} rotation={-55} />  {/* 5 */}
            <Tooth number={14} x={235} y={113} rotation={-40} />  {/* 4 */}
            <Tooth number={13} x={295} y={68} rotation={-25} />   {/* 3 */}
            <Tooth number={12} x={370} y={43} rotation={-12} />   {/* 2 */}
            <Tooth number={11} x={455} y={33} rotation={-3} />    {/* 1 - 顶部右侧 */}
            
            {/* 右上象限 - 21到28，镜像对称：1→2→3→4→5→6→7→8 */}
            <Tooth number={21} x={545} y={33} rotation={3} />     {/* 1 - 顶部左侧 */}
            <Tooth number={22} x={630} y={43} rotation={12} />    {/* 2 */}
            <Tooth number={23} x={705} y={68} rotation={25} />    {/* 3 */}
            <Tooth number={24} x={765} y={113} rotation={40} />   {/* 4 */}
            <Tooth number={25} x={800} y={183} rotation={55} />   {/* 5 */}
            <Tooth number={26} x={815} y={268} rotation={70} />   {/* 6 */}
            <Tooth number={27} x={820} y={358} rotation={80} />   {/* 7 */}
            <Tooth number={28} x={820} y={448} rotation={85} />   {/* 8 - 右侧底部 */}
            
            {/* 左下象限 - 48到41，垂直镜像：8→7→6→5→4→3→2→1 */}
            <Tooth number={48} x={180} y={552} rotation={-95} />  {/* 8 - 左侧顶部 */}
            <Tooth number={47} x={180} y={642} rotation={-100} /> {/* 7 */}
            <Tooth number={46} x={185} y={732} rotation={-110} /> {/* 6 */}
            <Tooth number={45} x={200} y={817} rotation={-125} /> {/* 5 */}
            <Tooth number={44} x={235} y={887} rotation={-140} /> {/* 4 */}
            <Tooth number={43} x={295} y={932} rotation={-155} /> {/* 3 */}
            <Tooth number={42} x={370} y={957} rotation={-168} /> {/* 2 */}
            <Tooth number={41} x={455} y={967} rotation={-177} /> {/* 1 - 底部右侧 */}
            
            {/* 右下象限 - 31到38，完全对称：1→2→3→4→5→6→7→8 */}
            <Tooth number={31} x={545} y={967} rotation={177} />  {/* 1 - 底部左侧 */}
            <Tooth number={32} x={630} y={957} rotation={168} />  {/* 2 */}
            <Tooth number={33} x={705} y={932} rotation={155} />  {/* 3 */}
            <Tooth number={34} x={765} y={887} rotation={140} />  {/* 4 */}
            <Tooth number={35} x={800} y={817} rotation={125} />  {/* 5 */}
            <Tooth number={36} x={815} y={732} rotation={110} />  {/* 6 */}
            <Tooth number={37} x={820} y={642} rotation={100} />  {/* 7 */}
            <Tooth number={38} x={820} y={552} rotation={95} />   {/* 8 - 右侧顶部 */}
            
            {/* 中间十字架 */}
            <line x1="300" y1="500" x2="700" y2="500" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="8,4" />
            <line x1="500" y1="300" x2="500" y2="700" stroke="#d9d9d9" strokeWidth="2" />
            
            {/* 中间显示的选中牙位 */}
            <text x="440" y="440" className="selected-numbers-svg" textAnchor="end">
              {getQuadrantDisplay(topLeft)}
            </text>
            <text x="560" y="440" className="selected-numbers-svg" textAnchor="start">
              {getQuadrantDisplay(topRight)}
            </text>
            <text x="440" y="570" className="selected-numbers-svg" textAnchor="end">
              {getQuadrantDisplay(bottomLeft)}
            </text>
            <text x="560" y="570" className="selected-numbers-svg" textAnchor="start">
              {getQuadrantDisplay(bottomRight)}
            </text>
          </svg>
        </div>

        {/* 快捷操作按钮 */}
        <div className="quick-actions">
          <div className="quick-actions-left">
            <Button type="primary" onClick={selectAll} className="btn-primary" size="small">
              🦷 全口
            </Button>
            <Button type="primary" onClick={selectUpperJaw} className="btn-primary" size="small">
              🦷 上颌
            </Button>
            <Button type="primary" onClick={selectLowerJaw} className="btn-primary" size="small">
              🦷 下颌
            </Button>
          </div>
          <div className="quick-actions-right">
            <Button onClick={onClose} size="small">
              取消
            </Button>
            <Button type="primary" onClick={handleConfirm} size="small">
              确定
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ToothSelector

# 附件选择对话框组件

## 组件说明

这是一个用于选择附件及设置数量的对话框组件，左侧显示所有可选附件，右侧显示已选附件及数量调整器。

## 功能特点

✅ **左右布局** - 左侧选择区，右侧已选列表  
✅ **批量选择** - 点击左侧按钮快速选择/取消附件  
✅ **数量调整** - 支持增减按钮和直接输入数量  
✅ **状态同步** - 选中的附件在左侧高亮显示  
✅ **数据回传** - 返回附件名称和数量的结构化数据  

## 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| visible | Boolean | - | 对话框是否可见 |
| onClose | Function | - | 关闭对话框的回调 |
| onConfirm | Function | - | 确认选择的回调，参数为附件数组 |
| initialSelection | Array | [] | 初始选中的附件 |

## 数据结构

### 附件数据格式

```javascript
[
  { name: '工厂颌架', count: 1 },
  { name: '颌架垫片', count: 2 },
  { name: '螺丝附件', count: 1 }
]
```

### 附件列表

共29种附件类型：
- 工厂颌架、颌架垫片、螺丝附件、颜面弓、托槽
- 螺旋、带环、取模杆、旧模、替代体
- 医生颌架、U盘、蜡冠、参考模、咬胶
- 转移杆螺丝、保证卡、基台发货单、定位器、印模帽
- 基台、旧牙、转移杆、取模杆螺丝、蜡堤
- 托盘、旧托、基台螺丝、诊断蜡型

## 使用示例

### 基础使用

```jsx
import React, { useState } from 'react'
import { Button } from 'antd'
import AttachmentSelectorModal from '@/components/AttachmentSelectorModal/AttachmentSelectorModal'

function MyComponent() {
  const [visible, setVisible] = useState(false)
  const [attachments, setAttachments] = useState([])

  const handleConfirm = (selectedAttachments) => {
    console.log('选中的附件:', selectedAttachments)
    setAttachments(selectedAttachments)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>
        选择附件
      </Button>
      
      {/* 显示已选附件 */}
      {attachments.map((item, index) => (
        <Tag key={index}>
          {item.name} * {item.count}
        </Tag>
      ))}
      
      <AttachmentSelectorModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
        initialSelection={attachments}
      />
    </>
  )
}
```

### 在 OtherSettings 中使用

已集成到快速下单页面的"其他设置"模块中：

1. 点击"+ 选择附件"按钮打开对话框
2. 在左侧点击附件按钮进行选择（蓝色表示已选）
3. 在右侧调整每个附件的数量（支持 + - 按钮或直接输入）
4. 点击"确定"保存选择
5. 选中的附件以 Tag 形式显示，格式为"附件名 * 数量"

## 交互说明

### 左侧选择区
- **点击选择**: 点击未选中的附件按钮，该附件被选中并添加到右侧列表（默认数量为1）
- **取消选择**: 点击已选中（蓝色）的附件按钮，该附件被取消选中并从右侧列表移除
- **视觉反馈**: 已选中的附件显示为蓝色主题色

### 右侧数量调整
- **增加数量**: 点击 "+" 按钮，数量 +1
- **减少数量**: 点击 "-" 按钮，数量 -1（最小为1）
- **直接输入**: 可以直接在输入框中输入数量（1-999）
- **移除附件**: 当数量减到0时，该附件从列表中移除

### 数据保存
- **确定**: 保存当前选择并关闭对话框
- **取消**: 放弃本次修改，恢复到上次保存的状态
- **再次打开**: 对话框会保留上次确认的选择状态

## 样式定制

可以通过修改 `AttachmentSelectorModal.css` 文件来定制样式：

- `.attachment-grid` - 左侧按钮网格布局（5列）
- `.attachment-btn` - 附件按钮样式
- `.selected-item` - 右侧列表项样式
- `.count-control` - 数量调整器样式

## 兼容性说明

组件支持两种初始数据格式：

1. **新格式**（推荐）:
```javascript
[
  { name: '工厂颌架', count: 1 },
  { name: '旧模', count: 2 }
]
```

2. **旧格式**（字符串格式）:
```javascript
['工厂颌架 * 1', '旧模 * 2']
```

## 响应式设计

- **桌面端**: 左右布局，附件按钮5列网格
- **移动端**: 上下布局，附件按钮3列网格

## 注意事项

1. 数量输入范围为 1-999
2. 移除附件可以通过左侧取消选中或右侧减少数量至0
3. 对话框关闭不会自动保存，需要点击"确定"按钮
4. 空状态时右侧会显示"请从左侧选择附件"提示

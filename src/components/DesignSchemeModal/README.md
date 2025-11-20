# 设计方案选择对话框组件

## 组件说明

这是一个用于选择设计方案的对话框组件，支持多个分类的单选功能，并在有选中项的 Tab 上显示红点提示。

## 功能特点

✅ **上方Tab布局** - 将分类以 Tab 的形式展示在顶部  
✅ **单选机制** - 每个分类只能选择一个方案，可以不选  
✅ **红点提示** - 有选中项的 Tab 会显示红点徽章  
✅ **状态管理** - 支持初始选中状态和确认后返回选中结果  
✅ **响应式设计** - 支持不同屏幕尺寸  

## 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| visible | Boolean | - | 对话框是否可见 |
| onClose | Function | - | 关闭对话框的回调 |
| onConfirm | Function | - | 确认选择的回调，参数为选中的方案对象 |
| initialSelection | Object | {} | 初始选中的方案 |

## 数据结构

### 选中方案对象结构

```javascript
{
  design: { id: 'design-1', name: '对颌合', image: null },
  color: { id: 'color-1', name: '窝沟不染色', image: null },
  shape: { id: 'shape-3', name: '功能尖锐', image: null }
}
```

### 方案分类

- **设计** (design): 对颌合、鼻基柱到、正常覆合覆盖、咬合
- **颜色** (color): 窝沟不染色、窝沟染色、自然染色、重度染色
- **外形** (shape): 颌面沟嵴明显、颌面沟嵴平缓、功能尖锐、功能尖钝
- **冠面设计** (surface): 光滑表面、纹理表面、自然表面
- **螺孔头** (edge): 圆形螺孔、方形螺孔、封闭螺孔
- **邻接** (collar): 紧密邻接、标准邻接、宽松邻接
- **边缘** (margin): 刀刃边缘、标准边缘、厚重边缘
- **坯体** (body): 标准厚度、加厚坯体、减薄坯体
- **咬合** (occlusion): 正常咬合、浅咬合、深咬合

## 使用示例

### 基础使用

```jsx
import React, { useState } from 'react'
import { Button } from 'antd'
import DesignSchemeModal from '@/components/DesignSchemeModal/DesignSchemeModal'

function MyComponent() {
  const [visible, setVisible] = useState(false)
  const [selectedSchemes, setSelectedSchemes] = useState({})

  const handleConfirm = (schemes) => {
    console.log('选中的方案:', schemes)
    setSelectedSchemes(schemes)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>
        选择设计方案
      </Button>
      
      <DesignSchemeModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
        initialSelection={selectedSchemes}
      />
    </>
  )
}
```

### 在 OtherSettings 中使用

已集成到快速下单页面的"其他设置"模块中：

1. 点击"+ 选择方案"按钮打开对话框
2. 切换不同的 Tab 查看各分类的方案
3. 点击方案卡片进行选择（再次点击可取消）
4. 有选中项的 Tab 会显示红点提示
5. 点击"确定"保存选择，选中的方案会显示在列表中
6. 可以点击方案卡片上的关闭图标移除

## 交互说明

- **选择**: 点击方案卡片即可选中，选中后卡片会有蓝色高亮效果
- **取消选择**: 再次点击已选中的卡片可取消选中
- **单选限制**: 每个分类只能选择一个方案，选择新方案会自动替换之前的选择
- **红点提示**: Tab 上的红点表示该分类已有选中项
- **确认**: 点击"确定"按钮保存选择并关闭对话框
- **取消**: 点击"取消"按钮放弃本次修改

## 样式定制

可以通过修改 `DesignSchemeModal.css` 文件来定制样式：

- `.scheme-grid` - 网格布局
- `.scheme-item` - 方案卡片
- `.scheme-img-wrapper` - 图片容器
- `.selected-icon` - 选中图标
- `.ant-badge-dot` - 红点徽章颜色

## 未来扩展

- 支持方案图片上传和显示
- 支持自定义方案分类
- 支持多选模式
- 支持方案搜索和筛选

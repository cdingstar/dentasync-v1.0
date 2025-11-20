# 产品库选择器组件

## 组件说明

这是一个可复用的产品库选择器组件，用于在不同场景下选择产品。

### 文件结构

```
ProductLibrarySelector/
├── ProductLibrarySelector.jsx   # 主组件
├── ProductLibrarySelector.css   # 样式文件
└── README.md                     # 说明文档
```

### 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| onProductSelect | Function | - | 选择产品时的回调函数，参数为选中的产品对象 |
| showSearchBar | Boolean | true | 是否显示搜索栏 |
| actionButtonText | String | '下单' | 操作按钮的文字 |

### 使用示例

```jsx
import ProductLibrarySelector from '@/components/ProductLibrarySelector/ProductLibrarySelector'

function MyComponent() {
  const handleProductSelect = (product) => {
    console.log('选择的产品:', product)
    // product 包含: key, productCode, name, category, material, price, unit, description
  }

  return (
    <ProductLibrarySelector 
      onProductSelect={handleProductSelect}
      showSearchBar={true}
      actionButtonText="选择"
    />
  )
}
```

## ProductSelectorModal 组件

基于 `ProductLibrarySelector` 封装的对话框组件。

### 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| visible | Boolean | - | 对话框是否可见 |
| onClose | Function | - | 关闭对话框的回调 |
| onSelect | Function | - | 选择产品的回调，选择后自动关闭对话框 |

### 使用示例

```jsx
import ProductSelectorModal from '@/components/ProductSelectorModal/ProductSelectorModal'

function MyComponent() {
  const [visible, setVisible] = useState(false)

  const handleSelect = (product) => {
    console.log('选择的产品:', product)
  }

  return (
    <>
      <Button onClick={() => setVisible(true)}>选择产品</Button>
      
      <ProductSelectorModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={handleSelect}
      />
    </>
  )
}
```

## 已集成的页面

1. **一键下单页面** (`/pages/Order/QuickOrder/index.jsx`)
   - 点击"新增产品"后的产品选择功能
   - 选择产品后会将产品ID和名称写入产品信息表

2. **产品库下单页面** (`/pages/Order/ProductLibraryOrder.jsx`)
   - 使用相同的产品选择器组件
   - 保持了原有的功能和交互

# QuickOrder 模块说明

## 模块结构

QuickOrder 已被拆分为多个子模块，便于维护和扩展：

```
QuickOrder/
├── index.jsx              # 主组件 - 负责状态管理和业务逻辑
├── BaseInfo.jsx           # 基础信息模块 - 诊所、医生、生产单位等
├── PatientInfo.jsx        # 患者信息模块 - 患者姓名、性别、年龄等
├── ProductInfo.jsx        # 产品信息模块 - 产品列表、牙位选择等
├── ColorSettings.jsx      # 颜色设定模块 - 颜色选择和管理
├── OtherSettings.jsx      # 其他设置模块 - 试戴、附件、文件上传等
└── QuickOrder.css         # 样式文件
```

## 模块职责

### index.jsx (主组件)
- 管理所有状态（产品列表、颜色设定、上传文件等）
- 处理表单提交
- 协调各子模块的交互
- 管理颜色选择器和牙位选择器的显示

### BaseInfo.jsx
- 渲染基础信息表单
- 包含：诊所、医生、生产单位、收件人、收件地址

### PatientInfo.jsx
- 渲染患者信息表单
- 包含：患者姓名、手机号、性别、年龄

### ProductInfo.jsx
- 渲染产品信息表格
- 支持添加/删除产品
- 处理产品相关的交互（选择产品、牙位、扫描设备等）

### ColorSettings.jsx
- 渲染颜色设定表格
- 支持添加/删除颜色设定行
- 处理颜色选择和牙位选择

### OtherSettings.jsx
- 渲染其他设置项
- 包含：试戴情况、设计方案、附件选择、文件上传、备注

## 数据流

```
index.jsx (父组件)
    ↓ props
子模块 (BaseInfo, PatientInfo, ProductInfo, ColorSettings, OtherSettings)
    ↓ callbacks
index.jsx (处理状态更新)
```

## 使用方式

在路由中直接引用：
```jsx
import QuickOrder from '../pages/Order/QuickOrder'
// 或
import QuickOrder from '../pages/Order/QuickOrder/index'
```

由于使用了 `index.jsx`，可以直接引用目录名。

# DentaSync Demo - 义齿管理系统

一个基于 React + Vite + Ant Design 的现代化义齿管理系统 PC H5 应用。

## 功能模块

### 1. 首页
- 数据统计展示
- 快捷入口导航
- 即将出厂订单
- 待处理订单概览

### 2. 下单模块
- **一键下单**: 快速创建订单，支持上传扫描文件
- **产品库下单**: 从产品库选择产品批量下单
- **待下单**: 管理未完成的订单草稿

### 3. 订单管理
- **全部订单**: 查看所有订单，支持筛选和搜索
- **待处理订单**: 处理需要审核的订单

### 4. 个人中心
- **个人信息**: 编辑个人资料和头像

### 5. 系统管理
- **诊所管理**: 管理合作诊所信息
- **工厂管理**: 管理加工厂信息
- **快递管理**: 管理物流信息和追踪

## 技术栈

- React 18
- Vite 5
- Ant Design 5
- React Router 6

## 安装和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 项目结构

```
src/
├── layout/              # 布局组件
│   ├── MainLayout.jsx   # 主布局
│   ├── Header.jsx       # 头部
│   └── Sidebar.jsx      # 侧边栏
├── pages/               # 页面组件
│   ├── Home.jsx         # 首页
│   ├── Order/           # 下单模块
│   │   ├── QuickOrder.jsx
│   │   ├── ProductLibraryOrder.jsx
│   │   └── PendingOrder.jsx
│   ├── OrderManagement/ # 订单管理
│   │   ├── AllOrders.jsx
│   │   └── PendingOrders.jsx
│   ├── PersonalCenter/  # 个人中心
│   │   └── PersonalInfo.jsx
│   └── SystemManagement/ # 系统管理
│       ├── ClinicManagement.jsx
│       ├── FactoryManagement.jsx
│       └── ExpressManagement.jsx
├── App.jsx              # 应用入口
└── main.jsx             # 主文件
```

## 特性

- 🎨 现代化的 UI 设计
- 📱 响应式布局，自动适应不同屏幕
- 🚀 快速的开发体验
- 📦 组件化开发
- 🔐 完整的功能模块

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发说明

每个主要页面都是独立的 JSX 文件，便于维护和扩展。所有组件都使用 Ant Design 组件库，确保 UI 的一致性。

---

## 版本记录

### 版本更新 - 2025-11-12

#### 1. 一键下单页面布局优化

**基础信息部分改进：**
- 将"执业单位"、"医生"、"生产单位"、"收件人"、"收件地址"5个字段排成一行
- 所有字段的标签和输入框保持在同一行上，采用水平布局
- 收件地址字段设置为弹性宽度，自动占用剩余空间

**患者信息部分改进：**
- 将"患者"、"患者手机号"、"性别"、"年龄"4个字段排成一行
- 采用与基础信息相同的水平布局方式
- 标签和输入框对齐显示

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx` - 修改表单布局结构
- `src/pages/Order/QuickOrder.css` - 添加新的样式类

**新增CSS类：**
```css
.base-info-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.info-item-wide {
  flex: 1 1 auto;
  min-width: 0;
}

.info-label {
  white-space: nowrap;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  flex-shrink: 0;
}

.info-input {
  width: 180px;
}

.info-item-wide .info-input {
  width: 100%;
}
```

#### 2. 产品信息表格重构

**功能改进：**
- 将产品信息从空白状态改为完整的可编辑表格
- 默认包含一条示例产品数据
- 支持动态添加和删除产品行

**表格字段（共10列）：**
1. **序号** - 自动编号
2. **产品名称** - 可编辑输入框（默认：钛种植一体式桥冠）
3. **牙位** - 特殊样式输入框（蓝色边框，带中间横线分隔）
4. **方案** - 下拉选择（返修/重做）
5. **取模方式** - 下拉选择（常规取模/口内扫描）
6. **种植系统** - 下拉选择（奥齿泰系统等）
7. **植体型号** - 下拉选择（标准等）
8. **愈合帽直径** - 下拉选择（愈合帽直径/单冠/桥体）
9. **修复方式** - 下拉选择（修复方式等）
10. **操作** - 增加/删除按钮

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx` - 重构产品信息展示逻辑
- `src/pages/Order/QuickOrder.css` - 添加表格样式

**代码改进：**

引入新组件：
```javascript
import { Table, Space } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
```

新增状态管理：
```javascript
const [productList, setProductList] = useState([
  {
    id: 1,
    productName: '钛种植一体式桥冠',
    toothPosition: '11',
    repairMethod: '返修',
    moldingMethod: '常规取模',
    scanDevice: '奥齿泰系统',
    scanNumber: '标准',
    connectionMethod: '愈合帽直径',
    color: '修复方式'
  }
])
```

新增功能函数：
```javascript
// 添加产品
const handleAddProduct = () => {
  const newProduct = { ... }
  setProductList([...productList, newProduct])
}

// 删除产品
const handleDeleteProduct = (id) => {
  setProductList(productList.filter(item => item.id !== id))
}

// 更新产品字段
const handleUpdateProduct = (id, field, value) => {
  setProductList(productList.map(item => 
    item.id === id ? { ...item, [field]: value } : item
  ))
}
```

**新增表格样式：**
```css
.product-table-container {
  overflow-x: auto;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.product-table th,
.product-table td {
  border: 1px solid #f0f0f0;
  padding: 12px 8px;
  text-align: left;
}

.product-table th {
  background: #fafafa;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  white-space: nowrap;
}

.tooth-position-input {
  position: relative;
  display: inline-block;
  width: 60px;
}

.tooth-input {
  width: 60px;
  text-align: center;
  border: 2px solid #1890ff;
  border-radius: 4px;
  font-weight: 500;
}

.tooth-position-input::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 1px;
  background: #1890ff;
  pointer-events: none;
}
```

#### 3. 用户体验优化

**交互改进：**
- 表格内所有字段支持实时编辑
- 每行产品可独立添加和删除
- 输入框宽度自适应，提升填写效率
- 牙位输入框采用特殊视觉设计，突出显示

**响应式设计：**
- 表格支持横向滚动，适配小屏幕
- 所有输入框和下拉框统一宽度规范
- 操作按钮采用链接样式，节省空间

---

### 技术细节

**布局方案：**
- 从 Ant Design 的 `Row/Col` 栅格布局改为 Flexbox 弹性布局
- 提高了布局的灵活性和可维护性
- 更好的对齐和间距控制

**状态管理：**
- 产品列表采用数组状态管理
- 支持按 ID 精准更新单个产品字段
- 自动维护产品序号

**样式规范：**
- 统一使用 14px 字体大小
- 输入框宽度标准化为 180px（收件地址除外）
- 表格采用浅灰色边框和背景色分隔

---

### 版本更新 - 2025-01-XX

#### 1. 牙位田字格尺寸优化

**改进内容：**
- 将牙位田字格从 12px×12px 调整为 18px×18px（增加50%）
- 字体大小从 10px 调整为 11px
- 提升了牙位选择的可读性和可操作性

**涉及文件：**
- `src/pages/Order/QuickOrder.css`

**样式更新：**
```css
.tooth-cell {
  width: 18px;
  height: 18px;
  font-size: 11px;
}
```

#### 2. 试戴情况改为下拉选择

**功能改进：**
- 将试戴情况从普通输入框改为下拉选择框
- 支持清空选择功能
- 统一表单交互体验

**选项内容：**
- 试戴蜡型外形
- 试戴内冠
- 试戴颜色
- 试戴车瓷外形
- 试戴基台
- 试戴基台蜡冠

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx`

#### 3. 移除原烤卡功能模块

**改进内容：**
- 完全移除"原烤卡"相关的所有代码
- 精简表单结构，减少用户操作复杂度
- 优化页面布局，提升空间利用率

#### 4. 设计方案可视化展示

**重大改进：**
- 将设计方案改为图片卡片展示方式
- 采用横向排列布局，支持多方案选择
- 每个卡片支持删除操作

**卡片设计：**
- 尺寸：140px × 100px
- 圆角边框：8px
- 悬停效果：蓝色边框 + 阴影
- 删除按钮：右上角圆形按钮，悬停显示
- 方案名称：蓝色加粗文字

**预设方案：**
1. 正常覆合覆盖
2. 窝沟不染色
3. 颌面沟嵴明显
4. 功能尖锐

**新增样式：**
```css
.design-img-wrapper {
  position: relative;
  width: 140px;
  height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  transition: all 0.3s;
}

.design-close {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.design-img-wrapper:hover .design-close {
  opacity: 1;
}
```

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx`
- `src/pages/Order/QuickOrder.css`

#### 5. 布局结构调整

**改进内容：**
- 将"试戴情况"和"设计方案"改为上下布局
- 移除并列排版，设计方案独占一行
- 提供更大的展示空间

**布局结构：**
```
其他设置
├─ 试戴情况（下拉选择）
└─ 设计方案（图片卡片横向排列）
```

#### 6. 新增3D文件上传功能

**功能新增：**
- 在"上传文件"下方添加"3D文件"上传入口
- 采用蓝色边框按钮样式（primary ghost）
- 支持3D文件格式上传

**按钮样式：**
```jsx
<Button type="primary" ghost icon={<PlusOutlined />}>
  + 3D文件
</Button>
```

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx`

#### 7. 新增文字备注功能

**功能新增：**
- 添加多行文本输入框用于填写订单备注
- 输入框高度：4行
- 最大字符数：500字
- 显示字符计数器

**配置参数：**
```jsx
<Input.TextArea 
  rows={4} 
  placeholder="请输入文字备注"
  maxLength={500}
  showCount
/>
```

**涉及文件：**
- `src/pages/Order/QuickOrder.jsx`

---

### 本次更新总结

**UI/UX 优化：**
1. 牙位选择区域放大50%，提升可操作性
2. 试戴情况改为下拉选择，交互更规范
3. 设计方案可视化展示，直观易用
4. 布局调整优化，空间利用更合理

**功能增强：**
1. 新增3D文件上传入口
2. 新增文字备注功能（500字限制）
3. 移除冗余的原烤卡模块

**视觉改进：**
1. 设计方案卡片式展示（140px×100px）
2. 悬停交互效果（边框/阴影/删除按钮）
3. 统一的蓝色主题色应用
4. 圆角设计（8px）提升现代感

**代码质量：**
- 精简冗余代码
- 优化组件结构
- 统一样式规范
- 提升代码可维护性

**涉及模块：**
- 一键下单页面（QuickOrder）
- 表单交互组件
- 文件上传功能
- 视觉设计系统


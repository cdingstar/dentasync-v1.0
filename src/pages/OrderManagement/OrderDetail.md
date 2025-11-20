# 订单详情页面

## 概述

订单详情页面用于展示订单的完整信息，包括订单状态、基础信息、患者信息、产品信息、颜色设定等。该页面为只读模式，主要用于查看订单详情和进行医技沟通。

## 访问方式

### 从全部订单页面进入
1. 进入"订单管理" -> "全部订单"
2. 点击订单列表中的**订单编号**链接
3. 自动跳转到订单详情页面

### 路由路径
- 路由格式：`/order-management/detail/:orderNo`
- 示例：`/order-management/detail/102511084444301`

## 页面结构

### 顶部标题栏
- **返回按钮**：点击返回上一页
- **订单编号**：显示当前订单编号
- **医技沟通按钮**：打开消息对话框，与工厂技师沟通

### Tab页签

#### 1. 订单详情（默认Tab）
显示订单的完整信息，所有字段为只读状态。

**订单状态卡片**
- 订单状态标签
  - 待接单（灰色）
  - 已接单（蓝色）
  - 生产进度-33%（蓝色）
  - 生产进度-66%（蓝色）
  - 生产进度-100%（绿色）
  - 已发货（橙色）
  - 已收货（绿色）
- 订单进度百分比

**基础信息卡片**
- 订单编号
- 订单类型
- 订单类别
- 诊所
- 医生
- 生产单位
- 收件人
- 收件地址
- 下单时间
- 预计到货时间

**患者信息卡片**
- 患者姓名
- 患者手机号
- 性别
- 年龄

**产品信息卡片**
- 产品名称
- 牙位
- 修复方式
- 取模方式
- 扫描设备
- 连接方式

**颜色设定卡片**（如有颜色设定）
- 主体颜色
- 颈部颜色
- 中部颜色
- 切端颜色

**备注信息卡片**（如有备注）
- 订单备注内容

#### 2. 生产进度（开发中）
用于显示订单的生产进度跟踪信息。

#### 3. 操作历史（开发中）
用于显示订单的操作历史记录。

## 功能特性

### 数据展示
- 所有字段为只读模式
- 自动从一键下单页面的字段结构获取数据
- 支持完整的订单信息展示

### 状态管理
- 动态显示订单状态
- 状态颜色标签区分
- 进度百分比实时显示

### 医技沟通
- 点击"医技沟通"按钮打开MessagesModal
- 可以选择对应的生产单位助理进行沟通
- 支持发送文字、图片、文件等

### 导航功能
- 在NaviBar中自动创建标签页
- 标签页显示格式：`订单详情 - [订单编号]`
- 支持同时打开多个订单详情页
- 支持关闭标签页

## 数据结构

### 订单数据示例

```javascript
{
  // 订单基础信息
  orderNo: '102511084444301',
  orderType: '标准订单',
  orderCategory: '全瓷牙冠',
  status: 'processing',
  progress: 65,
  
  // 诊所和医生信息
  clinic: 'ASIANTECH PTE. LTD.',
  practiceUnit: 'ASIANTECH PTE. LTD.',
  doctor: '黄向荣',
  
  // 生产和物流信息
  factory: '南宁市后齐科技',
  responsibleUnit: '南宁市后齐科技',
  receiver: '朱华昌',
  address: '中国广东省深圳市宝安区福海街道展城社区',
  
  // 时间信息
  createTime: '2025-11-10 10:30:00',
  deliveryTime: '2025-11-12 12:30:00',
  
  // 患者信息
  patientName: 'lee siew ngoh',
  patientPhone: '13800138000',
  gender: 'female',
  age: '45',
  
  // 产品信息
  productName: '全瓷牙冠',
  toothPosition: '11, 12, 13',
  repairMethod: '新做',
  moldingMethod: '口扫',
  scanDevice: '先临',
  connectionMethod: '单冠',
  
  // 颜色设定
  mainColor: 'A2',
  neckColor: 'A1',
  middleColor: 'A2',
  cuttingEdgeColor: 'A3',
  
  // 备注
  remarks: '请注意患者对颜色要求较高，需要特别注意颜色匹配'
}
```

## 样式特点

### 卡片设计
- 渐变色标题背景（浅蓝到浅灰）
- 蓝色底边框强调
- 圆角设计（8px）
- 轻微阴影效果

### 描述列表
- 标签背景：浅灰色
- 标签宽度：140px
- 标签字体：加粗，灰色
- 内容字体：常规，深色

### 响应式设计
- 移动端（<768px）：
  - 标题栏垂直排列
  - 描述列表标签宽度调整为100px
  - 减小内边距

## 技术实现

### 组件依赖
- React Router: 路由参数获取和导航
- Ant Design: UI组件库
  - Card: 卡片容器
  - Descriptions: 描述列表
  - Tag: 状态标签
  - Button: 按钮
  - Tabs: Tab页签
  - Space: 间距
- MessagesModal: 消息对话框组件

### 路由配置
```javascript
// MainLayout.jsx
<Route path="/order-management/detail/:orderNo" element={<OrderDetail />} />
```

### NaviBar动态路由
```javascript
// NaviBar.jsx
const getDynamicPageLabel = (path) => {
  if (path.startsWith('/order-management/detail/')) {
    const orderNo = path.split('/').pop()
    return `订单详情 - ${orderNo}`
  }
  return null
}
```

## 使用示例

### 跳转到订单详情页

```javascript
// 从全部订单页面跳转
const handleViewDetail = (record) => {
  navigate(`/order-management/detail/${record.orderNo}`, {
    state: { orderData: record }
  })
}
```

### 获取订单数据

```javascript
// OrderDetail.jsx
const { orderNo } = useParams() // 从URL获取订单编号
const orderData = location.state?.orderData // 从路由state获取订单数据
```

## 未来扩展

### 计划功能
1. **生产进度Tab**
   - 显示订单各个生产阶段
   - 实时更新生产进度
   - 显示每个阶段的时间节点

2. **操作历史Tab**
   - 记录订单的所有操作
   - 显示操作人、操作时间、操作内容
   - 支持操作历史搜索和过滤

3. **订单编辑功能**
   - 特定状态下允许编辑订单
   - 修改产品信息
   - 调整颜色设定

4. **订单导出功能**
   - 导出订单详情为PDF
   - 打印订单信息

## 注意事项

1. **数据传递**
   - 必须通过路由state传递完整的订单数据
   - 如果state中没有数据，将使用默认模拟数据

2. **状态映射**
   - 确保订单状态值与状态映射表匹配
   - 未知状态将显示为"未知状态"（灰色）

3. **字段显示**
   - 空字段显示为"-"
   - 可选字段（颜色设定、备注）为空时不显示对应卡片

4. **响应式考虑**
   - 在移动端测试布局
   - 确保所有按钮可点击
   - 文字大小适合小屏幕阅读

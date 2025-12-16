
### 顶部导航栏优化 (2025-12-16)

#### 新增功能
- **全局搜索框**: 顶部增加搜索输入框（支持快捷键提示）
- **主题切换**: 增加明暗色主题切换按钮
- **全屏模式**: 增加全屏/退出全屏切换按钮
- **多语言切换**: 顶部增加独立的多语言切换入口

#### 界面调整
- 优化顶部右侧功能区布局，统一图标按钮样式
- 调整间距和交互反馈

#### 文件变更
- `src/layout/Header.jsx`: 增加搜索、主题、全屏、多语言组件及逻辑
- `src/layout/Header.css`: 增加相关样式定义

### 侧边栏菜单优化

#### 界面调整
1. **删除「系统设置」菜单**
   - 移除了侧边栏中的"系统设置"（包含语言设置）菜单项
   - 避免与顶部导航栏右侧的设置功能重复
   - 简化侧边栏结构

#### 代码优化
- 移除了未使用的图标导入 (`SettingOutlined`, `GlobalOutlined`)
- 移除了已废弃的语言切换逻辑代码

#### 文件变更
- **修改文件**
  - `src/layout/Sidebar.jsx` - 删除系统设置菜单及相关代码
  - `CHANGELOG.md` - 更新日志

### 搜索功能增强 & 国际化支持 (2025-12-16)

#### 新增功能
- **搜索模态框**: 点击顶部搜索框或使用 `Command+K` / `Ctrl+K` 唤起全屏搜索模态框
- **键盘交互**: 支持 `ESC` 关闭搜索框，`Command+K` 唤起
- **国际化完善**: 搜索框占位符及搜索模态框内部文本（提示语、快捷键说明）全部接入多语言配置

#### 界面调整
- 顶部搜索框调整为只读模式，作为触发器
- 新增搜索模态框样式，包含输入区、结果空状态和底部快捷键提示

#### 文件变更
- `src/layout/Header.jsx`: 实现模态框逻辑、键盘监听、多语言调用
- `src/layout/Header.css`: 新增 `.search-modal` 相关样式
- `src/locales/zh.json`, `src/locales/en.json`: 新增 `searchDialog` 相关翻译键值

### 国际化文案修复 (2025-12-16)

#### 问题修复
- **修复翻译键引用**: 修复 Header 组件中搜索框及弹窗文案显示为 string id 的问题，添加正确的 `common` 命名空间前缀
- **补充缺失翻译**: 为主题切换、全屏切换按钮的 Tooltip 提示添加中英文翻译，替换原有的硬编码文本
- **修复 JSON 结构**: 修复 `zh.json` 中 `common` 命名空间重复定义的问题，合并内容并删除重复块，解决中文环境下搜索文案显示为 key 的问题

#### 文件变更
- `src/layout/Header.jsx`: 更新 `t` 函数调用路径
- `src/locales/zh.json`, `src/locales/en.json`: 新增 `switchLightMode` 等 header 相关翻译键值，修复 `zh.json` 结构问题


# 更新日志

## 2025-12-1

### 优化记录
1. 首页上的 “未完成订单” 改为 “待处理订单”；
2. 左侧菜单栏里面的 “待下单”这个入口 需要移动到订单管理全部订单和待处理订单的中间；
3. 增加页面的导航条，允许部分页面可以多页面同时展示；
4. 订单详情页优化调整和功能优化；
5. 订单详情-其他设置内容完善；
6. 完成沟通模块功能调整和优化；
7. 首页Logo调整和Header的高度优化等UI细节；
8. 增加关于我们页面；
9. 删除锁定系统的功能；
10. 增加种植系统设定页面和参数配置表；
11. 增加医技沟通的入口；
12. 增加订单详情的生产进度关键节点的状态修改功能；
13. 增加订单详情的文件和图片上传；

### 首页交互优化（APP）

### 我的页面增强（APP）

#### 新增内容
1. 在“我的”页面的“联系我们”下新增“关于我们”入口。
2. 新增“关于我们”手机端页面，展示版本信息、公司信息、业务联系与产品技术反馈，版式与“联系我们”对话框类似。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/src/pages/My.jsx` — 新增 `showAbout` 状态与“关于我们”页面结构

#### 布局优化
1. 优化“联系我们”页面宽度感受：将“业务联系”和“产品技术反馈”改为上下排列。
2. 补充“Powered by HOUQI INTELLIGENT TECHNOLOGY CO., LTD”信息。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/src/pages/My.jsx` — 优化“联系我们”内容布局并补充 Powered by
  - `../DentaSyncApp/src/components/Header.jsx` — 在“我的”页顶部右侧增加“联系我们”按钮，点击打开“关于我们”页
  - `../DentaSyncApp/src/components/Header.css` — 增加右侧操作按钮样式
  - `../DentaSyncApp/src/pages/My.jsx` — 关于我们页“联系我们”分区改为上下排布；公司名称大写；版权行样式优化为移动端风格。

#### 入口调整
1. “我的”页移除“联系我们”“关于我们”菜单项，入口统一至顶部右侧按钮。

### 首页跳转优化（APP）
1. 首页“已完成订单”“待处理订单”卡片点击后，分别跳转至订单页的“已完成”“待处理”标签。
- 修改文件
  - `../DentaSyncApp/src/pages/Workspace.jsx` — 为统计卡片增加点击跳转逻辑
  - `../DentaSyncApp/src/pages/Workspace.jsx` — “已发货”功能入口点击跳转到订单页“已发货”标签

### 产品库筛选优化（APP）
1. 筛选条件对话框删除顶部供应商下拉选择器，仅保留Tab筛选与底部操作。
- 修改文件
  - `../DentaSyncApp/src/components/FilterPanel.jsx` — 移除顶部供应商下拉区域
  - `../DentaSyncApp/src/pages/Products.jsx` — 顶部搜索按钮仅显示图标，移除“搜索”文字

### 患者档案搜索优化（APP）
1. 删除患者档案页内部“患者姓名/ID/电话”搜索输入，改为统一使用顶部右侧搜索弹窗。
2. 顶部搜索弹窗在患者档案页显示占位“患者姓名/ID/电话”，并将搜索结果写入列表筛选。
- 修改文件
  - `../DentaSyncApp/src/components/Header.jsx` — 为 `patient` 页面提供专用搜索占位与上下文
  - `../DentaSyncApp/src/pages/PatientArchive.jsx` — 移除内部搜索输入并监听全局搜索事件

### 我的页面弹层优化（APP）
1. “关于我们/联系我们”弹层删除“返回”按钮，仅保留“关闭”。
- 修改文件
  - `../DentaSyncApp/src/pages/My.jsx` — 弹层头部移除“返回”按钮

#### 修改内容
1. 首页“我的消息”入口点击后跳转到“消息”页面。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/src/App.jsx` — 新增 `handleNavigateToMessages` 并传递到 `Workspace`
  - `../DentaSyncApp/src/pages/Workspace.jsx` — 将“我的消息”入口点击改为触发页面跳转

### 构建与预览修复（APP）

#### 修复内容
1. 为 `npm run preview` 增加自动构建钩子：新增 `prepreview` 脚本执行 `vite build`。
2. 预览启动添加 `--host`，确保在本机可访问；`vite.config.js` 增加 `strictPort` 避免端口占用引发失败。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/package.json` — 新增 `prepreview`、调整 `preview` 参数
  - `../DentaSyncApp/vite.config.js` — 预览配置新增 `strictPort`


## 2025-11-27

### 订单详情页优化调整

#### APP优化内容
1. 产品信息“牙位”采用田字格展示，样式与下单页一致。
2. “基础信息”改为“收件信息”，显示收件人、电话、收件地址。
3. 颜色设定新增“牙位”字段，并调整标签为：主色、颈部颜色、中部颜色、切端颜色、基牙颜色、牙体颜色、自定义色。
4. 在“上传的文件”下新增“3D文件”区块，展示方式与“上传的文件”一致。

#### 文件变更
- 修改文件
  - `src/pages/OrderManagement/OrderDetail.jsx` — 订单详情页结构与展示调整
  - `../DentaSyncApp/src/pages/OrderDetail.jsx` — 移动端订单详情页同步调整
  - `../DentaSyncApp/src/pages/OrderDetail.css` — 增加牙位田字格样式

### 一键下单-种植参数支持（APP）

### 产品库新增“种植产品”类别（APP）

#### 新增内容
1. 产品库新增分类标签“种植产品”。
2. 新增不少于14款“种植”系列产品，名称均包含“种植”。
   - 示例：种植牙冠标准版、种植个性化基台、种植取模杆组件、种植数字化导板、种植全拱修复方案等。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/src/data/productsData.js` — 增加“种植产品”数据条目
  - `../DentaSyncApp/src/pages/Products.jsx` — 增加“种植产品”分类标签

#### 新增功能
1. 在一键下单的“产品信息”选择产品后，若产品名称包含“种植”，弹出“种植参数选择器”。
2. 选择完成后不修改产品信息表格，而是在“产品信息”和“颜色设定”之间新增“种植参数”表格展示：序号、种植参数、操作（删除/修改）。

#### 文件变更
- 修改文件
  - `../DentaSyncApp/src/pages/QuickOrder/index.jsx` — 新增种植参数列表、选择器与交互逻辑

## 2025-11-20

### 登录页功能优化

#### 新增功能
1. **临时角色选择**
   - 在登录页面新增“临时角色”下拉选项（选填）
   - 选项包含：诊所-管理员、诊所-医生、诊所-助理、工厂-管理员、工厂-助理、工厂-技师、超级管理员
   - 登录成功后写入用户信息并持久化到 `localStorage`

#### 文件变更
- **修改文件**
  - `src/pages/Login/Login.jsx` - 新增临时角色选择下拉并接入登录逻辑
  - `CHANGELOG.md` - 更新日志

### 角色驱动的菜单与人员管理

#### 规则与实现
1. **工厂人员隐藏“下单”**
   - 登录角色为工厂（管理员/助理/技师）时，左侧不显示`下单`及其子菜单
2. **工厂管理员限制角色选项**
   - 人员管理中，角色选择仅显示`助理`、`技师`
3. **工厂管理员人员表单字段**
   - 新建/编辑人员弹窗中，将“所属诊所:”动态显示为“所属工厂:”
   - 角色选择仅显示`助理`、`技师`
4. **非管理员隐藏人员管理**
   - 不是工厂管理员或诊所管理员（超级管理员除外），左侧不显示`人员管理`
5. **系统管理仅超级管理员可见**
   - 左侧`系统管理`仅在`超级管理员`登录时显示

#### 文件变更
- **修改文件**
  - `src/layout/MainLayout.jsx` - 传递`currentUser`到`Sidebar`与`PersonnelAuth`
  - `src/layout/Sidebar.jsx` - 基于`tempRole`动态过滤菜单项
  - `src/pages/InfoSetting/PersonnelAuth.jsx` - 动态角色选项与“所属工厂/所属诊所”标签切换
  - `src/pages/InfoSetting/FactoryInfo.jsx` - 新增工厂信息页面（字段与诊所信息保持一致，适配工厂）
  - `src/layout/MainLayout.jsx` - 新增`/personal/factory-info`路由
  - `src/layout/NaviBar.jsx` - 为`/personal/factory-info`增加导航标签“工厂信息”
  - `src/pages/OrderManagement/PendingOrders.jsx` - 订单编号支持跳转订单详情
  - `src/components/MessagesModal/MessagesModal.jsx` - 标题改为“企业通信”，支持外部设置默认助理Tab
  - `src/layout/MainLayout.jsx`、`src/layout/Header.jsx` - 点击客服图标直接打开企业通信并激活“助理”Tab
  - `src/layout/Sidebar.jsx` - 超级管理员登录后隐藏“信息设置”整组菜单
  - `src/layout/Sidebar.jsx` - 超级管理员登录后同时隐藏“首页”“下单”“信息设置”

#### 提交摘要（2025-11-20）
- 登录页新增“临时角色”并写入用户信息
- 侧边栏按角色控制展示：隐藏下单/患者档案/诊所信息/信息设置（按规则）
- 新增“工厂信息”页面与路由，导航标签同步
- 待处理订单支持订单编号跳转详情
- 客服图标直达“企业通信”，默认激活“助理”Tab；消息对话框标题修正

## 2025-11-19

### 订单详情-其他设置内容完善

#### 优化内容
1. **完善其他设置展示**
   - 添加示例图片数据（口内照片、X光片等）
   - 添加示例文件数据（扫描文件、设计方案、患者病历等）
   - 添加3D文件链接示例

2. **图片展示优化**
   - 图片缩略图显示文件名（底部半透明遮罩）
   - 点击图片可放大查看（Modal弹窗）
   - 100x100的统一缩略图尺寸
   - 圆角边框和边距优化

3. **文件列表优化**
   - 卡片式文件展示
   - 显示文件图标、文件名
   - 支持显示文件大小（如有）
   - 灰色背景和边框，更清晰的视觉效果

4. **模拟数据示例**
```javascript
uploadedImages: [
  { name: '口内照片1.jpg', url: 'placeholder_url' },
  { name: '口内照片2.jpg', url: 'placeholder_url' },
  { name: 'X光片.jpg', url: 'placeholder_url' }
],
uploadedFiles: [
  { name: '扫描文件.stl' },
  { name: '设计方案.pdf' },
  { name: '患者病历.doc' }
],
threeDFile: 'https://example.com/3d-model.stl'
```

#### 文件变更
- **修改文件**
  - `src/pages/OrderManagement/OrderDetail.jsx` - 优化图片和文件显示效果，添加示例数据
  - `CHANGELOG.md` - 更新日志

### 订单详情页面优化调整

#### 界面优化
1. **删除操作历史Tab**
   - 移除了"操作历史"Tab页签
   - 简化页面结构，保留核心功能

2. **Tab标签调整**
   - "生产进度"改名为"订单状态"
   - 更准确地反映页面功能定位

3. **医技沟通按钮位置优化**
   - 从卡片右上角移至Tab栏右侧（tabBarExtraContent）
   - 在任何Tab页都可以快速访问
   - 位置更醒目，操作更便捷

#### 当前页面结构
**Tab页签：**
- **订单详情**：完整的订单信息展示
  - 基础信息
  - 患者信息
  - 产品信息
  - 颜色设定
  - 备注信息
  - 其他设置（试戴情况、设计方案、附件、图片、文件等）
  
- **订单状态**：订单状态管理和关键节点记录
  - 订单状态管理（状态选择、进度调整）
  - 关键节点时间轴（支持添加节点、上传图片和文件）

#### 样式优化
- 新增Tab右侧extra区域样式
- 优化医技沟通按钮显示效果

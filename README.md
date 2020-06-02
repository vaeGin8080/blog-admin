## 晓风残月&博客后台管理网站

基于 react + antd4.0 开发的 PC 端网站项目

开发者：晓风残月

[在线地址](https://vaegin.top/blogBack)

[前台链接](https://github.com/vaeGin8080/blog-web)

[后端链接](https://github.com/vaeGin8080/blog-admin-back)

### 技术栈

核心：react+antd+mobx+react-router+axios+for-editor

### 前序准备

需要在本地安装 node 和 git。本项目技术栈基于 ES2015+、react、mobx、react-router 、axios 和 antd4.0，所有的请求数据都使用 Express 进行模拟，也可通过 Mock.js 进行模拟

### 安装&构建

```
# 安装依赖
yarn install

# 开发环境
yarn start

# 打包项目
yarn build
```

### 项目目录

```
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│       ├── ContentMain        # 全局路由容器
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── pages                  # views 所有页面
│   ├── App.js                # 入口页面
│   ├── index.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
└── package.json               # package.json
└── README.md                  # 项目说明
```

### 功能

```

- 登录 / 注册 / 注销

- 权限验证
  - 页面权限
  - 权限配置

- 环境发布
  - dev sit stage prod

- 全局功能
  - 动态导航栏（支持多级路由嵌套）
  - 动态面包屑（可选）
  - 快捷导航(标签页)（可选）
  - 本地/后端 mock 数据
  - Screenfull全屏

- 编辑器
  - 富文本
  - Markdown

- 表单
  - 动态表单验证

- 文章
  - 点赞
  - 评论
  - 编辑
  - 删除

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 列表拖拽
  - Sticky（固钉）
  - 弹窗
  - 信息提示
  - 加载提示
  - 空状态显示

- ECharts 图表

- Clipboard(剪贴复制)
```

### 感想

项目都是在业余时间开发，界面参考掘金，前后端一起做，存在很多不完善的地方，仅供参考学习

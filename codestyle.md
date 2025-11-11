# 代码规范标准

基于主流官方代码规范定制

## 引用来源
- JavaScript: [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- React: [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)

## 基本规范

### 命名约定
- **变量和函数**: camelCase (`getUserInfo`, `contactList`)
- **组件**: PascalCase (`ContactForm`, `App`)
- **常量**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS类名**: kebab-case (`contact-form`, `app-header`)

### 代码格式
- 使用2个空格缩进
- 字符串使用单引号
- 行末不加分号
- 适当添加空行提高可读性

### Git提交规范
- feat: 新功能
- fix: 修复bug  
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
# 832302203_contacts_backend

## 项目描述
前后端分离通讯录系统后端 - 森林主题，管理熊大熊二和朋友们联系方式

## 技术栈
- Node.js + Express
- MySQL
- CORS

## 功能特性
- ✅ 添加联系人
- ✅ 修改联系人  
- ✅ 删除联系人
- ✅ 查询所有联系人
- ✅ 自动初始化示例数据（熊大、熊二）

## API接口说明

### 获取所有联系人
**GET** `/api/contacts`

### 添加联系人
**POST** `/api/contacts`
```json
{
  "name": "姓名",
  "phone": "电话", 
  "email": "邮箱"
}
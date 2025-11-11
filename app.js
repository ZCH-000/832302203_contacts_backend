// 引入需要的工具
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// 创建Express应用
const app = express();
app.use(cors());
app.use(express.json());

// 连接MySQL数据库 - 重要：修改密码！
const db = mysql.createConnection({
  host: 'localhost',      // 数据库地址
  user: 'root',           // 用户名
  password: '111111',     // 改成你的MySQL密码！！！
  // 先不指定数据库，等创建后再使用
});

// 测试数据库连接
db.connect((err) => {
  if (err) {
    console.log('❌ 数据库连接失败:', err);
    return;
  }
  console.log('✅ MySQL数据库连接成功!');
  
  // 先创建数据库（如果不存在）
  db.query('CREATE DATABASE IF NOT EXISTS contacts_db', (err) => {
    if (err) {
      console.log('❌ 创建数据库失败:', err);
      return;
    }
    console.log('✅ 数据库创建成功!');
    
    // 使用这个数据库
    db.query('USE contacts_db', (err) => {
      if (err) {
        console.log('❌ 使用数据库失败:', err);
        return;
      }
      console.log('✅ 正在使用 contacts_db 数据库');
      
      // 创建联系人表格
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      db.query(createTableQuery, (err) => {
        if (err) {
          console.log('❌ 创建表失败:', err);
          return;
        }
        console.log('✅ 联系人表创建成功!');
        
        // 添加初始数据 - 熊大熊二
        console.log('✅ 正在添加示例联系人...');
        addSampleContacts();
      });
    });
  });
});

// 添加示例联系人函数
function addSampleContacts() {
  const contacts = [
    { name: '熊大', phone: '11000000000', email: 'xiongda@qq.com' },
    { name: '熊二', phone: '12000000000', email: 'xionger@139.com' }
  ];
  
  contacts.forEach(contact => {
    // 检查是否已存在
    const checkSql = 'SELECT * FROM contacts WHERE name = ?';
    db.query(checkSql, [contact.name], (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        // 如果不存在，则插入
        const insertSql = 'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)';
        db.query(insertSql, [contact.name, contact.phone, contact.email], (err) => {
          if (err) throw err;
          console.log(`✅ 已添加联系人: ${contact.name}`);
        });
      } else {
        console.log(`📝 联系人已存在: ${contact.name}`);
      }
    });
  });
}

// ========== API接口 ==========

// 1. 获取所有联系人
app.get('/api/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// 2. 添加联系人
app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  
  if (!name || !phone) {
    res.status(400).json({ error: '姓名和电话不能为空' });
    return;
  }
  
  const sql = 'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)';
  
  db.query(sql, [name, phone, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '联系人添加成功!', id: result.insertId });
  });
});

// 3. 修改联系人
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  
  if (!name || !phone) {
    res.status(400).json({ error: '姓名和电话不能为空' });
    return;
  }
  
  const sql = 'UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?';
  
  db.query(sql, [name, phone, email, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '联系人更新成功!' });
  });
});

// 4. 删除联系人
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contacts WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '联系人删除成功!' });
  });
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 后端服务器运行在 http://localhost:${PORT}`);
  console.log('📞 等待前端调用...');
});
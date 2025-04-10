const express = require('express');
const cors = require('cors');
const pool = require('./DB.js'); 

const app = express();


const corsoptions = {
  origin:"*",
  method:["get", "post"],
  alloweHeaders:["contect-type"],
}
app.use(cors()); // CORS 활성화
app.use(express.json()); // JSON 요청 처리
app.use(cors(corsoptions));

// ✅ GET: 모든 사용자 조회
app.get('/users', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection(); 
    const [rows] = await conn.query('SELECT * FROM users'); 
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release(); 
  }
});

// ✅ POST: 새로운 사용자 추가
app.post('/users', async (req, res) => {
  let conn;
  const { name, password, email } = req.body;
  try {
    conn = await pool.getConnection(); 
    const [result] = await conn.query(
      'INSERT INTO users (name, password, email) VALUES (?, ?, ?)', 
      [name, password, email]
    ); 
    res.status(201).json({ id: result.insertId, name, password, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// ✅ 루트 경로 추가
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ✅ 서버 시작
const PORT = 3307; 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
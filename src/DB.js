const mariadb = require("mariadb");

// ✅ 데이터베이스 연결 풀 생성
const pool = mariadb.createPool({
    host: "localhost",     // DB 서버 주소
    user: "root",         // DB 사용자명
    password: "3333", // DB 비밀번호
    database: "test",   // 사용할 데이터베이스
    port: 3307,
    connectionLimit: 5,   // 최대 연결 수
});

// ✅ 연결 테스트
pool.getConnection()
    .then(conn => {
        console.log("✅ MariaDB 연결 성공!");
        conn.release();
    })
    .catch(err => {
        console.error("❌ MariaDB 연결 실패:", err);
    });

module.exports = pool;
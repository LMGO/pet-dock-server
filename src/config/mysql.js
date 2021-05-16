//封装mysql
// const mysql = require('mysql')
import mysql from 'mysql'
let pools = {}//连接池
let query = (sql, host = '127.0.0.1') => {
    if (!pools.hasOwnProperty(host)) {//是否存在连接池
        pools[host] = mysql.createPool({//不存在创建
            host: host,
            port: '3306',
            user: 'root',
            password: 'password',
            database: 'pet-dock'
        })
    }
    return new Promise((resolve, reject) => {
        pools[host].getConnection((err, connection) => {//初始化连接池
            if (err) console.log(err,'数据库连接失败');
            else connection.query(sql, (err, results) => {//去数据库查询数据
                connection.release()//释放连接资源
                if (err) reject(err);
                else resolve(results);
                console.log(results,'数据库连接成功');
            })
        })
    })
}

export default query
// module.exports = query
import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa-cors'
import user from './routes/user'
import topic from './routes/topic'
import post from './routes/post'
import question from './routes/question'
import answer from './routes/answer'


import mysql from './config/mysql'
const app = new Koa()

/*
 通过一个中间件，把所有的工具关联起来
*/
app.use(async (ctx, next) => {
  //挂载到config中
  ctx.config = {
    mysql: mysql
  }
  await next()
})


// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/src/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(topic.routes(), topic.allowedMethods())
app.use(post.routes(), post.allowedMethods())
app.use(question.routes(), question.allowedMethods())
app.use(answer.routes(), answer.allowedMethods())




// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

console.log('Koa2服务正在3029端口运行...')

module.exports = app

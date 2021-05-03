import Router from 'koa-router'
import user from '../controllers/user'

let router = new Router({
  prefix: '/users'
})

/***********文章接口***********/

router.get('/getAll', user.getAllusers)          // 获取所有文章

export default router
import Router from 'koa-router'
import user from '../controllers/user'

let router = new Router({
  prefix: '/users'
})

/***********用户接口***********/

router.post('/signup', user.signup)           // 注册
      .post('/signin', user.signin)           // 登录
      .post('/followuser', user.followUser)   // 关注用户
      .delete('/unfollowuser', user.unfollowUser)   // 取消关注用户或移除粉丝
      .get('/getffcount', user.getffcount)   // 



export default router
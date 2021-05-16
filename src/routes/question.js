import Router from 'koa-router'
import question from '../controllers/question'

let router = new Router({
  prefix: '/questions'
})

/***********问题接口***********/

router.post('/newquestion', question.newquestion)           // 发布问题
      .post('/questionimage', question.questionimage)       //问题图片
      .post('/followquestion', question.followquestion)          // 关注问题
      .delete('/unfollowquestion', question.unfollowquestion)          // 取消关注问题
      .get('/getnewlist', question.getnewlist)       //获取最新问题列表
      .get('/gethotlist', question.gethotlist)       //获取热门问题列表
      .get('/getfollowlist', question.getfollowlist)       //获取关注问题列表
      .put('/browsequestion', question.browsequestion)      //浏览问题
      .get('/getdetails', question.getdetails)              //问题详情页及问答列表




export default router
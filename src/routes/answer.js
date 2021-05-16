import Router from 'koa-router'
import answer from '../controllers/answer'

let router = new Router({
  prefix: '/answers'
})

/***********回答接口***********/

router.post('/agreeanswer',answer.agreeanswer)                        //赞同
      .delete('/disagreeanswer',answer.disagreeanswer)                        //赞同
      .get('/sortanswer', answer.sortanswer)              //问题详情页回答排序
      // .get('/commentanswer', answer.commentanswer)              //评论回答
      // .get('/newanswer', answer.newanswer)              //发布回答





export default router
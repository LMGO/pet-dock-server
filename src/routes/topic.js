import Router from 'koa-router'
import topic from '../controllers/topic'

let router = new Router({
  prefix: '/topics'
})

/***********话题接口***********/

router.post('/newtopic', topic.newtopic)           // 创建话题
      .post('/topicimage', topic.topicimage)       //话题图片
      .get('/getbyname', topic.getbyname)          // 根据话题名称匹配
      .put('/browsetopic', topic.browsetopic)      //浏览话题
      .get('/gethotlist', topic.gethotlist)       //获取本周热门话题列表
      



export default router
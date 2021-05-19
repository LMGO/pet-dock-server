import Router from 'koa-router'
import art from '../controllers/art'

let router = new Router({
  prefix: '/arts'
})

/***********文章接口***********/

router.post('/newart', art.newart)                           // 发布新文章
      .get('/gethotartlist', art.gethotartlist)              // 获取热门列表
      .get('/getnewartlist', art.getnewartlist)              // 获取最新列表
      .get('/getfollowartlist', art.getfollowartlist)              // 获取关注的列表
      .post('/likeart', art.likeart)                         // 点赞
      .delete('/dislikeart', art.dislikeart)                 // 取消点赞
      .post('/collectionart', art.collectionart)             // 收藏
      .delete('/uncollectionart', art.uncollectionart)       // 取消收藏
      .post('/comment', art.comment)                         // 评论
      .get('/getdetail',art.getdetail)                       //获取详情


export default router
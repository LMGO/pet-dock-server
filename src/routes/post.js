import Router from 'koa-router'
import post from '../controllers/post'

let router = new Router({
  prefix: '/posts'
})

/***********帖子接口***********/

router.post('/newpost', post.newpost)                           // 发布新帖子
      .post('/postimage', post.postimage)                       // 帖子图片
      .post('/postvideo', post.postvideo)                       // 帖子视频
      .get('/gethotlist', post.gethotlist)                         // 获取热门列表
      .get('/gethotvideolist', post.gethotvideolist)               // 获取热门视频帖子列表
      .get('/getnewlist', post.getnewlist)                         // 获取最新列表
      .get('/getnewvideolist', post.getnewvideolist)                         // 获取最新视频列表
      .get('/getfollowlist', post.getfollowlist)                         // 获取关注的列表
      .get('/getfollowvideolist', post.getfollowvideolist)                         // 获取关注视频的列表
      .post('/likepost', post.likepost)                         // 点赞
      .delete('/dislikepost', post.dislikepost)                   // 取消点赞
      .post('/collectionpost', post.collectionpost)             // 收藏
      .delete('/uncollectionpost', post.uncollectionpost)         // 取消收藏
      .post('/comment', post.comment)         // 评论



      // .put('/browsepost', post.browsepost)      //浏览话题
      // .get('/gethotlist', post.gethotlist)       //获取本周热门话题列表
      



export default router
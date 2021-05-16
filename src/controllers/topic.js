import topic from '../config/topic'
export default {

  //创建话题
  async newtopic(ctx, next){
    try {
      let res = await ctx.config.mysql(topic.newtopic(ctx.request.body))
      if(res.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '话题创建成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
      await next()
  },
  //话题图片
  async topicimage(ctx, next){
    try {
      let res = await ctx.config.mysql(topic.topicimage(ctx.request.body))
      if(res.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '话题图片上传成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
      await next()
  },
  //搜索返回名称匹配列表
  async getbyname(ctx, next){
    try {
      let res = await ctx.config.mysql(topic.getbyname(ctx.request.query))
      ctx.body = {
        code: 0,
        msg: '相关话题获取成功',
        data:res
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
    await next()
  },
  //浏览话题
  async browsetopic(ctx, next){
    try {
      let res = await ctx.config.mysql(topic.browsetopic(ctx.request.body))
      console.log(res)
      ctx.body = {
        code: 0,
        msg: '浏览更新话题热度成功'
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
    await next()
  },
  //获取热门话题列表
  async gethotlist(ctx, next){
    try {
      let topiclist = await ctx.config.mysql(topic.gethotlist())
      for(let i=0;i<topiclist.length;i++){
        let discuss = await ctx.config.mysql(topic.getdiscusscount(topiclist[i]))
        topiclist[i].discuss_count = discuss[0].discuss_count
      }
      ctx.body = {
        code: 0,
        msg: '获取热门话题列表成功',
        data: topiclist
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  }
  //获取话题相关帖子
}
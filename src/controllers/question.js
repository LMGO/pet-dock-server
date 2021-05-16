import question from '../config/question'
export default {

  //创建问题
  async newquestion(ctx, next){
    try {
      let res = await ctx.config.mysql(question.newquestion(ctx.request.body))
      console.log(res)
      if(res.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '问题发布成功'
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
  //问题图片
  async questionimage(ctx, next){
    try {
      let res = await ctx.config.mysql(question.questionimage(ctx.request.body))
      if(res.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '问题图片上传成功'
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
  //关注问题
  async followquestion(ctx, next){
    try {
      //判断是否关注
      let isfollow = await ctx.config.mysql(question.isfollow(ctx.request.body,ctx.request.body.user_id))
      if(!isfollow[0].isfollow){
        //没关注就添加
        await ctx.config.mysql(question.followquestion(ctx.request.body))
        //查询总的关注记录数量
        let follow_count = await ctx.config.mysql(question.getfollowcount(ctx.request.body))
        //更新问题表的关注数据
        await ctx.config.mysql(question.updatefolowcount(ctx.request.body,follow_count[0].follow_count))
        ctx.body = {
          code: 0,
          msg: '关注成功'
        }
      } else{
        ctx.body = {
          code: 1,
          msg: '页面显示异常,已经关注了'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
    await next()
  },
  //取消关注问题
  async unfollowquestion(ctx, next){
    try {
      //判断是否关注
      let isfollow = await ctx.config.mysql(question.isfollow(ctx.request.body,ctx.request.body.user_id))
      if(isfollow[0].isfollow){
        //关注就取消
        console.log("-----1----")
        await ctx.config.mysql(question.unfollowquestion(ctx.request.body))
        console.log("-----2----")
        //查询总的关注记录数量
        let follow_count = await ctx.config.mysql(question.getfollowcount(ctx.request.body))
        //更新问题表的关注数据
        await ctx.config.mysql(question.updatefolowcount(ctx.request.body,follow_count[0].follow_count))
        ctx.body = {
          code: 0,
          msg: '取消关注成功'
        }
      } else{
        ctx.body = {
          code: 1,
          msg: '页面显示异常,还未关注'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
    await next()
  },
  //获取最新列表(无回答列表)
  async getnewlist(ctx, next){
    let user_id = ctx.request.query.user_id
    try {
      let questionlist = await ctx.config.mysql(question.getnewlist())
     //判断每一条是否关注
      for(let i=0 ;i<questionlist.length;i++){
        //是否关注
        let isfollow = await ctx.config.mysql(question.isfollow(questionlist[i],user_id))
        if(isfollow[0].isfollow) {
          questionlist[i].isfollow = 1
        } else {
          questionlist[i].isfollow = 0
        }
      }
      ctx.body = {
        code: 0,
        msg: '获取最新问题列表成功',
        data: questionlist
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  },
  //获取热门列表(含一条热门回答)
  async gethotlist(ctx, next){
    let user_id = ctx.request.query.user_id
    try {
      let questionlist = await ctx.config.mysql(question.gethotlist())
      for(let i=0 ;i<questionlist.length;i++){
        //是否关注
        let isfollow = await ctx.config.mysql(question.isfollow(questionlist[i],user_id))
        if(isfollow[0].isfollow) {
          questionlist[i].isfollow = 1
        } else {
          questionlist[i].isfollow = 0
        }
        //添加一条热门回答
        let answer = await ctx.config.mysql(question.getoneanswer(questionlist[i]))
        //有回答时
        if(answer.length){
          //是否匿名
          if(answer[0].is_anonymous){
            answer[0].user_nickname = '匿名用户'
          }
          //是否赞同热门回答
          let isagree = await ctx.config.mysql(question.isagree(answer[0],user_id))
          if(isagree[0].isagree) {
            answer[0].isagree = 1
          }else {
            answer[0].isagree = 0
          }
          //热门回答的评论信息
          let comments = await ctx.config.mysql(question.getfirstcomments(answer[0]))
          answer[0].comments = comments
          //添加到问题回答里
          questionlist[i].answer = answer[0]
        }else{
          questionlist[i].answer = {}
        }
      }
      ctx.body = {
        code: 0,
        msg: '获取热门问答列表成功',
        data: questionlist
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  },
  //获取热门列表(含一条热门回答)
  async getfollowlist(ctx, next){
    let user_id = ctx.request.query.user_id
    try {
      let questionlist = await ctx.config.mysql(question.getfollowlist(user_id))
      for(let i=0 ;i<questionlist.length;i++){
        //是否关注
        // let isfollow = await ctx.config.mysql(question.isfollow(questionlist[i],user_id))
        // if(isfollow[0].isfollow) {
          questionlist[i].isfollow = 1
        // } else {
        //   questionlist[i].isfollow = 0
        // }
        //添加一条热门回答
        let answer = await ctx.config.mysql(question.getoneanswer(questionlist[i]))
        //有回答时
        if(answer.length){
          //是否匿名
          if(answer[0].is_anonymous){
            answer[0].user_nickname = '匿名用户'
          }
          //是否赞同热门回答
          let isagree = await ctx.config.mysql(question.isagree(answer[0],user_id))
          if(isagree[0].isagree) {
            answer[0].isagree = 1
          }else {
            answer[0].isagree = 0
          }
          //热门回答的评论信息
          let comments = await ctx.config.mysql(question.getfirstcomments(answer[0]))
          answer[0].comments = comments
          //添加到问题回答里
          questionlist[i].answer = answer[0]
        }else{
          questionlist[i].answer = {}
        }
      }
      ctx.body = {
        code: 0,
        msg: '获取热门问答列表成功',
        data: questionlist
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  },
  //浏览问题
  async browsequestion(ctx, next){
    try {
      let res = await ctx.config.mysql(question.browsequestion(ctx.request.body))
      console.log(res)
      if(res.affectedRows){
        ctx.body = {
          code: 0,
          msg: '浏览更新问题热度成功'
        }
      }else {
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试'
      }
    }
    await next()
  },
  //问题详情及所有问答(默认时间排序)
  async getdetails(ctx, next){
    let user_id = ctx.request.query.user_id
    let question_id = ctx.request.query.question_id
    try {
      //问题详情
      let questionitem = await ctx.config.mysql(question.getdetails(question_id))
      //是否关注
      let isfollow = await ctx.config.mysql(question.isfollow(ctx.request.query,user_id))
      if(isfollow[0].isfollow) {
        questionitem[0].isfollow = 1
      } else {
        questionitem[0].isfollow = 0
      }
      //获取所有回答，默认时间排序
      let answer = await ctx.config.mysql(question.getallanswer(ctx.request.query,'post_time'))
      //有回答时
      if(answer.length){
        for(let i=0 ;i<answer.length;i++){
          //是否匿名
          if(answer[i].is_anonymous){
            answer[i].user_nickname = '匿名用户'
          }
          //是否赞同回答
          let isagree = await ctx.config.mysql(question.isagree(answer[i],user_id))
          if(isagree[0].isagree) {
            answer[i].isagree = 1
          }else {
            answer[i].isagree = 0
          }
          //回答的评论信息
          let comments = await ctx.config.mysql(question.getfirstcomments(answer[i]))
          answer[i].comments = comments
        }
        //添加到问题回答里
        questionitem[0].answer = answer
      }else {
        questionitem[0].answer = []
      }
      ctx.body = {
        code: 0,
        msg: '获取问题详情成功',
        data: questionitem[0]
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  }
}
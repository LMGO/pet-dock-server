import answersql from '../config/answer'
import question from '../config/question'//复用sql
export default {

  //发布回答
  // async newanswer(ctx, next){
  //   await next()
  // },
  //赞同回答
  async agreeanswer(ctx, next){
    try {
      //判断是否赞同
      let isagree = await ctx.config.mysql(question.isagree(ctx.request.body,ctx.request.body.user_id))
      if(!isagree[0].isagree){
        //没赞同就添加
        await ctx.config.mysql(answer.agreeanswer(ctx.request.body))
        //查询总的点赞记录数量
        let agree_count = await ctx.config.mysql(answer.getagreecount(ctx.request.body))
        //更新问题表的关注数据
        await ctx.config.mysql(answer.updateagreecount(ctx.request.body,agree_count[0].agree_count))
        ctx.body = {
          code: 0,
          msg: '赞同成功'
        }
      } else{
        ctx.body = {
          code: 1,
          msg: '页面显示异常,已经赞同了'
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
  //取消赞同回答
  async disagreeanswer(ctx, next){
    try {
      //判断是否赞同
      let isagree = await ctx.config.mysql(question.isagree(ctx.request.body,ctx.request.body.user_id))
      if(isagree[0].isagree){
        //赞同就取消
        await ctx.config.mysql(answer.disagreeanswer(ctx.request.body))
        //查询总的赞同记录数量
        let agree_count = await ctx.config.mysql(answer.getagreecount(ctx.request.body))
        //更新问题表的赞同数据
        await ctx.config.mysql(answer.updateagreecount(ctx.request.body,agree_count[0].agree_count))
        ctx.body = {
          code: 0,
          msg: '取消赞同成功'
        }
      } else{
        ctx.body = {
          code: 1,
          msg: '页面显示异常,还没赞同'
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
  //回答排序
  async sortanswer(ctx, next){
    let user_id = ctx.request.query.user_id
    // let question_id = ctx.request.query.question_id
    let answer_sort_by= (ctx.request.query.answer_sort_by == "time")? "post_time":"agree_count"
    try {
      //获取所有回答，默认时间排序
      let answer = await ctx.config.mysql(question.getallanswer(ctx.request.query,answer_sort_by))
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
      }else {
        answer = []
      }
      ctx.body = {
        code: 0,
        msg: `按${answer_sort_by}排序成功`,
        data: answer
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      }
    }
    await next()
  },
  //评论回答
  // async commentanswer(ctx, next){
  // }
}
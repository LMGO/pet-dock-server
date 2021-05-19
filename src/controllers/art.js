import art from '../config/art'
export default {

  //发布文章
  async newart(ctx, next) {
    try {
      let content = await ctx.config.mysql(art.newart(ctx.request.body))
      if (content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '文章内容发表成功'
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
  //获取热门列表
  async gethotartlist(ctx, next) {
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取文章主内容
      let contentlist = await ctx.config.mysql(art.gethotartlist())
      for (let i = 0; i < contentlist.length; i++) {
        //获取用户信息
        let user = await ctx.config.mysql(art.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //是否点赞
        let isliked = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'like'))
        console.log("---------------------")
        console.log(art.isoperate(contentlist[i], user_id, 'like'))
        console.log(isliked[0].isoperate)
        console.log("---------------------")
        if (isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'collection'))
        if (iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(art.isfollow(contentlist[i], user_id))
        if (isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(art.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取热门文章列表成功',
        data: contentlist
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
  //获取最新列表
  async getnewartlist(ctx, next) {
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取文章主内容
      let contentlist = await ctx.config.mysql(art.getnewartlist())
      for (let i = 0; i < contentlist.length; i++) {
        //获取用户信息
        let user = await ctx.config.mysql(art.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //是否点赞
        let isliked = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'like'))
        if (isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'collection'))
        if (iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(art.isfollow(contentlist[i], user_id))
        if (isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(art.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新文章列表成功',
        data: contentlist
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
  //获取关注列表
  async getfollowartlist(ctx, next) {
    //参数为用户ID，需要判断是否点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取文章主内容
      let contentlist = await ctx.config.mysql(art.getfollowartlist(ctx.request.query))
      for (let i = 0; i < contentlist.length; i++) {
        //获取用户信息
        let user = await ctx.config.mysql(art.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //是否点赞
        let isliked = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'like'))
        if (isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(art.isoperate(contentlist[i], user_id, 'collection'))
        if (iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        // let isfollow = await ctx.config.mysql(art.isfollow(contentlist[i],user_id))
        // if(isfollow[0].isfollow) {
        contentlist[i].isfollow = 1
        // } else {
        //   contentlist[i].isfollow = 0
        // }
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(art.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新关注文章列表成功',
        data: contentlist
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
  //点赞
  async likeart(ctx, next) {
    try {
      //查询是否点赞
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(art.isoperate(ctx.request.body,user_id,'like'))
      if (!isoperate[0].isoperate) {
        //没点赞就添加
        await ctx.config.mysql(art.operate(ctx.request.body, 'like'))
        //查询总的点赞记录数量
        let likecount = await ctx.config.mysql(art.operatecount(ctx.request.body, 'like'))
        //更新post表的点赞数据
        await ctx.config.mysql(art.updatecount(ctx.request.body, 'art_likes', likecount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '点赞成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '页面显示异常,已经点过赞了'
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
  //取消点赞
  async dislikeart(ctx, next) {
    try {
      //查询是否点赞
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(art.isoperate(ctx.request.body,user_id, 'like'))
      if (isoperate[0].isoperate) {
        //点赞就删除
        await ctx.config.mysql(art.deleteoperate(ctx.request.body, 'like'))
        //查询总的点赞记录数量
        let likecount = await ctx.config.mysql(art.operatecount(ctx.request.body, 'like'))
        //更新post表的点赞数据
        await ctx.config.mysql(art.updatecount(ctx.request.body, 'art_likes', likecount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '取消点赞成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '页面显示异常,还没点赞呢'
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
  //收藏
  async collectionart(ctx, next) {
    try {
      //查询是否收藏
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(art.isoperate(ctx.request.body,user_id, 'collection'))
      if (!isoperate[0].isoperate) {
        //没收藏就添加
        await ctx.config.mysql(art.operate(ctx.request.body, 'collection'))
        //查询总的收藏记录数量
        let collectioncount = await ctx.config.mysql(art.operatecount(ctx.request.body, 'collection'))
        //更新post表的收藏数据
        await ctx.config.mysql(art.updatecount(ctx.request.body, 'art_collections', collectioncount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '收藏成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '页面显示异常,已经收藏了'
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
  //取消收藏
  async uncollectionart(ctx, next) {
    try {
      //查询是否收藏
      let isoperate = await ctx.config.mysql(art.isoperate(ctx.request.body, 'collection'))
      if (isoperate[0].isoperate) {
        //收藏就删除
        await ctx.config.mysql(art.deleteoperate(ctx.request.body, 'collection'))
        //查询总的收藏记录数量
        let collection = await ctx.config.mysql(art.operatecount(ctx.request.body, 'collection'))
        //更新post表的收藏数据
        await ctx.config.mysql(art.updatecount(ctx.request.body, 'art_collections', collection[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '取消收藏成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '页面显示异常,还没收藏呢'
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
  async comment(ctx, next) {
    try {
      let content = await ctx.config.mysql(art.comment(ctx.request.body))
      //更新评论数
      await ctx.config.mysql(art.updatecomment(ctx.request.body))
      if (content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '文章评论发表成功'
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
  //获取详情
  async getdetail(ctx, next) {
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取文章主内容
      let contentlist = await ctx.config.mysql(art.getdetail(ctx.request.query))
      //获取用户信息
      let user = await ctx.config.mysql(art.getuserinfo(contentlist[0]))
      contentlist[0].user_nickname = user[0].user_nickname
      contentlist[0].user_avatar = user[0].user_avatar
      contentlist[0].user_grade = user[0].user_grade
      //是否点赞
      let isliked = await ctx.config.mysql(art.isoperate(contentlist[0], user_id, 'like'))
      console.log("---------------------")
      console.log(art.isoperate(contentlist[0], user_id, 'like'))
      console.log(isliked[0].isoperate)
      console.log("---------------------")
      if (isliked[0].isoperate) {
        contentlist[0].isliked = 1
      } else {
        contentlist[0].isliked = 0
      }
      //是否收藏
      let iscollection = await ctx.config.mysql(art.isoperate(contentlist[0], user_id, 'collection'))
      if (iscollection[0].isoperate) {
        contentlist[0].iscollection = 1
      } else {
        contentlist[0].iscollection = 0
      }
      //是否关注
      let isfollow = await ctx.config.mysql(art.isfollow(contentlist[0], user_id))
      if (isfollow[0].isfollow) {
        contentlist[0].isfollow = 1
      } else {
        contentlist[0].isfollow = 0
      }
      //插入评论
      //一级评论
      let firstcomments = await ctx.config.mysql(art.getfirstcomments(contentlist[0]))
      contentlist[0].comments = firstcomments
      //更新热度
      if(user_id){
        ctx.config.mysql(art.browseart(ctx.request.query))
      }
      ctx.body = {
        code: 0,
        msg: '获取热门文章列表成功',
        data: contentlist[0]
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

}
import post from '../config/post'
export default {

  //发布帖子
  async newpost(ctx, next){
    try {
      let content = await ctx.config.mysql(post.newpost(ctx.request.body))
      //若存在话题
      if(ctx.request.body.topiclist.length){
        ctx.request.body.topiclist.forEach(async item => {
          await ctx.config.mysql(post.newposttopic(item,ctx.request.body))
        });
      }
      if(content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '帖子内容发表成功'
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
  //帖子图片
  async postimage(ctx, next){
    try {
      let content = await ctx.config.mysql(post.postimage(ctx.request.body))
      //修改对应帖子类型
      await ctx.config.mysql(post.changestyle(ctx.request.body,'image'))
      //若存在话题
      if(content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '帖子图片上传成功'
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
  //帖子视频
  async postvideo(ctx, next){
    try {
      let content = await ctx.config.mysql(post.postvideo(ctx.request.body))
      //修改对应帖子类型
      await ctx.config.mysql(post.changestyle(ctx.request.body,'video'))
      //若存在话题
      if(content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '视频上传成功'
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
  async gethotlist(ctx, next){
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.gethotlist())
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        console.log("---------------------")
        console.log(post.isoperate(contentlist[i],user_id,'like'))
        console.log(isliked[0].isoperate)
        console.log("---------------------")
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取热门帖子列表成功',
        data:contentlist
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
  //获取热门视频帖子列表
  async gethotvideolist(ctx, next){
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.gethotvideolist())
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取热门帖子列表成功',
        data:contentlist
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
  async getnewlist(ctx, next){
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.getnewlist())
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新帖子列表成功',
        data:contentlist
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
  //获取最新视频列表
  async getnewvideolist(ctx, next){
    //参数为用户ID，需要判断是否关注、点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.getnewvideolist())
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        } else {
          contentlist[i].isfollow = 0
        }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新视频帖子列表成功',
        data:contentlist
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
  async getfollowlist(ctx, next){
    //参数为用户ID，需要判断是否点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.getfollowlist(ctx.request.query))
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        // let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        // if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        // } else {
        //   contentlist[i].isfollow = 0
        // }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新关注帖子列表成功',
        data:contentlist
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
  //获取关注视频列表
  async getfollowvideolist(ctx, next){
    //参数为用户ID，需要判断是否点赞、收藏
    let user_id = ctx.request.query.user_id
    try {
      //获取帖子主内容
      let contentlist = await ctx.config.mysql(post.getfollowvideolist(ctx.request.query))
      for(let i = 0 ;i <contentlist.length;i++){
        //获取用户信息
        let user = await ctx.config.mysql(post.getuserinfo(contentlist[i]))
        contentlist[i].user_nickname = user[0].user_nickname
        contentlist[i].user_avatar = user[0].user_avatar
        contentlist[i].user_grade = user[0].user_grade
        //获取话题信息
        let topic = await ctx.config.mysql(post.gettopiclist(contentlist[i]))
        contentlist[i].topiclist = topic
        //是否点赞
        let isliked = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'like'))
        if(isliked[0].isoperate) {
          contentlist[i].isliked = 1
        } else {
          contentlist[i].isliked = 0
        }
        //是否收藏
        let iscollection = await ctx.config.mysql(post.isoperate(contentlist[i],user_id,'collection'))
        if(iscollection[0].isoperate) {
          contentlist[i].iscollection = 1
        } else {
          contentlist[i].iscollection = 0
        }
        //是否关注
        // let isfollow = await ctx.config.mysql(post.isfollow(contentlist[i],user_id))
        // if(isfollow[0].isfollow) {
          contentlist[i].isfollow = 1
        // } else {
        //   contentlist[i].isfollow = 0
        // }
        //插入图片
        let post_image = await ctx.config.mysql(post.getimagelist(contentlist[i]))
        contentlist[i].post_image = post_image 
        //插入视频
        let post_video = await ctx.config.mysql(post.getvideo(contentlist[i]))
        contentlist[i].post_video = post_video
        //插入评论
        //一级评论
        let firstcomments = await ctx.config.mysql(post.getfirstcomments(contentlist[i]))
        contentlist[i].comments = firstcomments
      }
      ctx.body = {
        code: 0,
        msg: '获取最新关注视频帖子列表成功',
        data:contentlist
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
  async likepost(ctx, next){
    try {
      //查询是否点赞
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(post.isoperate(ctx.request.body,user_id,'like'))
      if(!isoperate[0].isoperate){
        //没点赞就添加
        await ctx.config.mysql(post.operate(ctx.request.body,'like'))
        //查询总的点赞记录数量
        let likecount = await ctx.config.mysql(post.operatecount(ctx.request.body,'like'))
        //更新post表的点赞数据
        await ctx.config.mysql(post.updatecount(ctx.request.body,'post_likes',likecount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '点赞成功'
        }
      } else{
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
  async dislikepost(ctx, next){
    try {
      //查询是否点赞
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(post.isoperate(ctx.request.body,user_id,'like'))
      if(isoperate[0].isoperate){
        //点赞就删除
        await ctx.config.mysql(post.deleteoperate(ctx.request.body,'like'))
        //查询总的点赞记录数量
        let likecount = await ctx.config.mysql(post.operatecount(ctx.request.body,'like'))
        //更新post表的点赞数据
        await ctx.config.mysql(post.updatecount(ctx.request.body,'post_likes',likecount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '取消点赞成功'
        }
      } else{
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
  async collectionpost(ctx, next){
    try {
      //查询是否收藏
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(post.isoperate(ctx.request.body,user_id,'collection'))
      if(!isoperate[0].isoperate){
        //没收藏就添加
        await ctx.config.mysql(post.operate(ctx.request.body,'collection'))
        //查询总的收藏记录数量
        let collectioncount = await ctx.config.mysql(post.operatecount(ctx.request.body,'collection'))
        //更新post表的收藏数据
        await ctx.config.mysql(post.updatecount(ctx.request.body,'post_collections',collectioncount[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '收藏成功'
        }
      }else {
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
  async uncollectionpost(ctx, next){
    try {
      //查询是否收藏
      let user_id = ctx.request.body.user_id
      let isoperate = await ctx.config.mysql(post.isoperate(ctx.request.body,user_id,'collection'))
      console.log(isoperate[0].isoperate)
      if(isoperate[0].isoperate){
        //收藏就删除
        await ctx.config.mysql(post.deleteoperate(ctx.request.body,'collection'))
        //查询总的收藏记录数量
        let collection = await ctx.config.mysql(post.operatecount(ctx.request.body,'collection'))
        //更新post表的收藏数据
        await ctx.config.mysql(post.updatecount(ctx.request.body,'post_collections',collection[0].operatecount))
        ctx.body = {
          code: 0,
          msg: '取消收藏成功'
        }
      } else{
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
      let content = await ctx.config.mysql(post.comment(ctx.request.body))
      //更新评论数
      await ctx.config.mysql(post.updatecomment(ctx.request.body))
      if(content.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '帖子评论发表成功'
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
  }
 
}
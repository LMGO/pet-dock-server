import user from '../config/user'
export default {

  //注册
  async signup(ctx, next){
    let check =  await ctx.config.mysql(user.getuserByPhone(ctx.request.body))
    if(check.length) {
      ctx.body = {
        code: 1,
        msg: '该手机号已经注册'
      }
    } else {
      await ctx.config.mysql(user.signup(ctx.request.body)).then((res) =>{
        if(res.affectedRows == 1) {
          ctx.body = {
            code: 0,
            msg: '注册成功'
          }
        } else {
          ctx.body = {
            code: 1,
            msg: '系统异常，稍后重试'
          }
        }
      }).catch((err)=>{
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试'
        }
      })
      
    }
      await next()
  },
  //登录
  async signin(ctx, next){
    let type = ctx.request.body.type
    //验证码登录//直接返回用户信息
    if(type == 'code') {
      try {
        let userinfo = await ctx.config.mysql(user.getuserByPhone(ctx.request.body))
        if(userinfo.length>0) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            data: userinfo[0]
          }
        } else {
          ctx.body = {
            code: 1,
            msg: '用户名/手机号或密码错误',
          }
        }
      } catch (error) {
        ctx.body = {
          code: 1,
          msg: '系统异常',
        }
      }
    } else {
      await ctx.config.mysql(user.signin(ctx.request.body)).then((res) => {
        let data = {}
        if(res.length) {
          data = res[0]
          ctx.body = {
            code: 0,
            msg: '登录成功',
            data:data
          }
        } else {
          ctx.body = {
            code: 1,
            msg: '用户名/手机号或密码错误',
          }
        }
  
      }).catch((err)=> {
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试',
        }
      })
    }
    await next()
  },
  //关注用户
  async followUser(ctx, next) {
    await ctx.config.mysql(user.followUser(ctx.request.body)).then((res) => {
      if(res.affectedRows == 1) {
        ctx.body = {
          code: 0,
          msg: '关注成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '系统异常，稍后重试'
        }
      }
    }).catch((err)=> {
      console.log(err)
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试',
      }
    }),
    await next()
  },
  //取消关注用户或移除粉丝
  async unfollowUser(ctx, next) {
    await ctx.config.mysql(user.unfollowUser(ctx.request.body)).then((res) => {
      console.log(res)
      if(res.affectedRows !== 0) {
        ctx.body = {
          code: 0,
          msg: '操作成功'
        }
      }
    }).catch((err)=> {
      console.log(err)
      ctx.body = {
        code: 1,
        msg: '系统异常，稍后重试',
      }
    }),
    await next()
  },
  //获取粉丝和关注数量
  async getffcount(ctx, next) {
    let fans =  await ctx.config.mysql(user.getfanscount(ctx.request.query))
    let follow =  await ctx.config.mysql(user.getfollowcount(ctx.request.query))
    let data = {
      "fans": fans.length,
      "follow": follow.length
    }
    console.log(data)
    ctx.body = {
      code: 0,
      msg: '获取粉丝和关注数量成功',
      data: data
    }
    await next()
  }
}
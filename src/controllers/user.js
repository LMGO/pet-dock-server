// import user from '../models/user'

export default {

  /*获取所有用户*/
  async getAllusers(ctx, next){
    ctx.body = {
      code: 0,
      msg: '获取成功'
    }
  },
}
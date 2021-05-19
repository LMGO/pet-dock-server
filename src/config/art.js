let post = {
    //文章内容发布  
    newart(i){
        return `INSERT INTO article (art_id,art_title,art_content,art_guide,art_cover,user_id,is_public,post_time) VALUES ('${i.art_id}','${i.art_title}','${i.art_content}','${i.art_guide}','${i.art_cover}','${i.user_id}','${i.is_public}','${i.post_time}')`
    },
    //获取20条热门文章列表
    gethotartlist() {
        return `select art_id,art_title,art_guide,art_cover,user_id,is_public,post_time,art_likes,art_comments,art_collections,art_browses
        from article
        order by art_browses DESC LIMIT 20;`
    },
    //获取30条最新文章
    getnewartlist() {
        return `select art_id,art_title,art_guide,art_cover,user_id,is_public,post_time,art_likes,art_comments,art_collections,art_browses
        from article
        order by post_time DESC LIMIT 30;`
    },
    //获取30条最新我关注的文章
    getfollowartlist(i) {
        return `select art_id,art_title,art_guide,art_cover,user_id,is_public,post_time,art_likes,art_comments,art_collections,art_browses
        from article p,user_follow u
        where p.user_id = u.follow and u.fans = '${i.user_id}'
        order by post_time DESC LIMIT 30;`
    },
    //获取文章详情
    getdetail(i) {
        return `select art_id,art_title,art_content,art_guide,art_cover,user_id,is_public,post_time,art_likes,art_comments,art_collections,art_browses
        from article
        WHERE art_id = '${i.art_id}'`
    },
    //浏览更新热度
    browseart(i){
        return `UPDATE article SET art_browses=art_browses+1 WHERE art_id = '${i.art_id}'`
    },
    getuserinfo(i) {
        return `select user_nickname,user_avatar,user_grade from user where user_id = '${i.user_id}';`
    },
    isoperate(i,user_id,type) {
        return `SELECT count(*) as isoperate FROM article_operate WHERE art_id = '${i.art_id}' and user_id = '${user_id}' and operate_type = '${type}'`
    },
    isfollow(i,user_id) {
        return `SELECT count(*) as isfollow FROM user_follow WHERE follow = '${i.user_id}' and fans = '${user_id}'`
    },
    getfirstcomments(i) {
        return `SELECT reply_id,u.user_id,u.user_nickname,u.user_avatar,comment_content,reply_time
        FROM article_comment p,user u
        WHERE p.art_id = '${i.art_id}' and u.user_id = p.user_id and p.related_reply_id IS NULL
        ORDER BY reply_time`
    },
    //添加操作记录
    operate(i,type) {
        return `INSERT INTO article_operate (art_id,user_id,operate_time,operate_type) VALUES ('${i.art_id}','${i.user_id}','${i.operate_time}','${type}')`
    },
    //查询总的操作记录
    operatecount(i,type) {
        return `SELECT count(*) as operatecount FROM article_operate WHERE art_id = '${i.art_id}' and operate_type = '${type}'`
    },
    //更新文章表点赞或收藏数
    updatecount(i,j,count) {
        return `UPDATE article SET ${j} ='${count}' WHERE art_id = '${i.art_id}'`
    },
    //删除操作记录
    deleteoperate(i,type) {
        return `DELETE FROM article_operate WHERE (user_id = '${i.user_id}' and art_id = '${i.art_id}' and operate_type = '${type}')`
    },
    comment(i) {
        return `INSERT INTO article_comment (reply_id,art_id,user_id,comment_content,reply_time) VALUES ('${i.reply_id}','${i.art_id}','${i.user_id}','${i.comment_content}','${i.reply_time}')`
    },
    updatecomment(i){
        return `UPDATE article SET art_comments = art_comments+1 WHERE art_id = '${i.art_id}'`
    }
};
export default post
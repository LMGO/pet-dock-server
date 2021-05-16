let post = {
    //帖子内容发布  
    newpost(i){
        return `INSERT INTO post (post_id,user_id,post_style,post_content,is_public,post_time) VALUES ('${i.post_id}','${i.user_id}','${i.post_style}','${i.post_content}','${i.is_public}','${i.post_time}')`
    },
    //帖子话题
    newposttopic(i,j){
        return `INSERT INTO post_topic (post_id,topic_id) VALUES ('${j.post_id}','${i.topic_id}')`
    },
    //帖子图片
    postimage(i){
        return `INSERT INTO post_image (post_id,image_id) VALUES ('${i.post_id}','${i.image_id}')`
    },
    //帖子视频
    postvideo(i){
        return `INSERT INTO post_video (post_id,video_id) VALUES ('${i.post_id}','${i.video_id}')`
    },
    //修改帖子类型
    changestyle(i,j){
        return `UPDATE post SET post_style='${j}' WHERE post_id = '${i.post_id}'`
    },
    //获取20条热门帖子主内容
    gethotlist() {
        return `select post_id,user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post
        order by (post_likes+post_comments) DESC LIMIT 20;`
    },
    //获取20条热门视频帖子主内容
    gethotvideolist() {
        return `select post_id,user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post
        where post_style = 'video'
        order by (post_likes+post_comments) DESC LIMIT 20;`
    },
    //获取30条最新帖子主内容
    getnewlist() {
        return `select post_id,user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post
        order by post_time DESC LIMIT 30;`
    },
    //获取30条最新视频帖子主内容
    getnewvideolist() {
        return `select post_id,user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post
        where post_style = 'video'
        order by post_time DESC LIMIT 30;`
    },
    //获取30条最新我关注的帖子主内容
    getfollowlist(i) {
        return `select p.post_id,u.follow as user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post p,user_follow u
        where p.user_id = u.follow and u.fans = '${i.user_id}'
        order by post_time DESC LIMIT 30;`
    },
    //获取30条最新我关注的视频帖子主内容
    getfollowvideolist(i) {
        return `select p.post_id,u.follow as user_id,post_style,post_time,post_content,post_likes,post_comments,post_collections
        from post p,user_follow u
        where p.user_id = u.follow and u.fans = '${i.user_id}' and p.post_style = 'video'
        order by post_time DESC LIMIT 30;`
    },
    gettopiclist(i) {
        return `select t.topic_id as topic_id,t.topic_name as topic_name
        from post_topic p, topic t
        where p.post_id = '${i.post_id}' and p.topic_id = t.topic_id;`
    },
    getuserinfo(i) {
        return `select user_nickname,user_avatar,user_grade from user where user_id = '${i.user_id}';`
    },
    isoperate(i,user_id,type) {
        return `SELECT count(*) as isoperate FROM post_operate WHERE post_id = '${i.post_id}' and user_id = '${user_id}' and operate_type = '${type}'`
    },
    isfollow(i,user_id) {
        return `SELECT count(*) as isfollow FROM user_follow WHERE follow = '${i.user_id}' and fans = '${user_id}'`
    },
    getimagelist(i) {
        return `SELECT image_id  FROM post_image WHERE post_id = '${i.post_id}'`
    },
    getvideo(i) {
        return `SELECT video_id  FROM post_video WHERE post_id = '${i.post_id}'`
    },
    getfirstcomments(i) {
        return `SELECT reply_id,u.user_id,u.user_nickname,u.user_avatar,comment_content,reply_time
        FROM post_comment p,user u
        WHERE p.post_id = '${i.post_id}' and u.user_id = p.user_id and p.related_reply_id IS NULL
        ORDER BY reply_time`
    },
    //添加操作记录
    operate(i,type) {
        return `INSERT INTO post_operate (post_id,user_id,operate_time,operate_type) VALUES ('${i.post_id}','${i.user_id}','${i.operate_time}','${type}')`
    },
    //查询总的操作记录
    operatecount(i,type) {
        return `SELECT count(*) as operatecount FROM post_operate WHERE post_id = '${i.post_id}' and operate_type = '${type}'`
    },
    //更新帖子表点赞或收藏数
    updatecount(i,j,count) {
        return `UPDATE post SET ${j} ='${count}' WHERE post_id = '${i.post_id}'`
    },
    //删除操作记录
    deleteoperate(i,type) {
        return `DELETE FROM post_operate WHERE (user_id = '${i.user_id}' and post_id = '${i.post_id}' and operate_type = '${type}')`
    },
    comment(i) {
        return `INSERT INTO post_comment (reply_id,post_id,user_id,comment_content,reply_time) VALUES ('${i.reply_id}','${i.post_id}','${i.user_id}','${i.comment_content}','${i.reply_time}')`
    },
    updatecomment(i){
        return `UPDATE post SET post_comments = post_comments+1 WHERE post_id = '${i.post_id}'`
    }
};
export default post
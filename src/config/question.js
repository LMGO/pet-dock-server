let question = {
    //新发布  
    newquestion(i){
        return `INSERT INTO question (question_id,question_title,question_description,question_cover,user_id,post_time,is_anonymous) VALUES ('${i.question_id}','${i.question_title}','${i.question_description}','${i.question_cover}','${i.user_id}','${i.post_time}','${i.is_anonymous}')`
    },
    //问题图片
    questionimage(i){
        return `UPDATE question SET question_cover='${i.question_cover}' WHERE question_id = '${i.question_id}'`
    },
    //关注问题
    followquestion(i){
        return `INSERT INTO question_follow (question_id,user_id,follow_time) VALUES ('${i.question_id}','${i.user_id}','${i.follow_time}')`
    },
    unfollowquestion(i){
        return `DELETE FROM question_follow WHERE (user_id = '${i.user_id}' and question_id = '${i.question_id}')`
    },
    //获取最新20条问题内容
    getnewlist() {
        return `select question_id,question_title,post_time,follow_count,answer_count
        from question
        order by post_time DESC LIMIT 20;`
    },
    //获取热门20条问题内容
    gethotlist() {
        return `select question_id,question_title
        from question
        order by question_hot DESC LIMIT 20;`
    },
    //获取关注的30条问题内容
    getfollowlist(user_id){
        return `select q.question_id,q.question_title
        from question q, question_follow f
        where q.question_id = f.question_id and f.user_id = '${user_id}'
        order by q.post_time DESC LIMIT 30;`
    },
    //获取一条热门回答
    getoneanswer(i){
        return `select answer_id,u.user_nickname,u.user_avatar,is_anonymous,a.post_time,a.answer_content,a.agree_count,a.comment_count
        from answer a,user u
        where a.question_id = '${i.question_id}'
        order by a.agree_count  DESC LIMIT 1;`
    },
    //是否赞同
    isagree(i,user_id){
        return `SELECT count(*) as isagree FROM answer_agree WHERE answer_id = '${i.answer_id}' and user_id ='${user_id}'`
    },
    //获取一级评论
    getfirstcomments(i){
        return `SELECT reply_id,u.user_id,u.user_nickname,u.user_avatar,reply_content,reply_time,reply_agree_count
        FROM answer_comment a,user u
        WHERE a.answer_id = '${i.answer_id}' and a.user_id = u.user_id and a.related_reply_id IS NULL
        ORDER BY reply_time`
    },
    //浏览更新热度
    browsequestion(i){
        return `UPDATE question SET question_hot = question_hot+1 WHERE question_id = '${i.question_id}'`
    },
    //获取回答数
    getanswercount(i) {
        return `SELECT count(*) as answer_count FROM answer WHERE question_id = '${i.question_id}'`
    },
    //获取关注数
    getfollowcount(i) {
        return `SELECT count(*) as follow_count FROM question_follow WHERE question_id = '${i.question_id}'`
    },
    //更新关注数
    updatefolowcount(i,j){
        return `UPDATE question SET follow_count='${j}' WHERE question_id = '${i.question_id}'`
    },
    //是否关注
    isfollow(i,user_id) {
        return `SELECT count(*) as isfollow FROM question_follow WHERE question_id = '${i.question_id}' and user_id ='${user_id}'`
    },
    //问题详情
    getdetails(question_id){
        return `select question_id,question_title,question_description,question_cover,answer_count,follow_count,user_nickname,user_avatar,is_anonymous,question_hot,post_time
        from question q,user u
        where q.question_id = '${question_id}' and q.user_id = u.user_id`
    },
    //问题全部回答
    getallanswer(i,sort){
        return `select answer_id,u.user_nickname,u.user_avatar,is_anonymous,a.post_time,a.answer_content,a.agree_count,a.comment_count
        from answer a,user u
        where a.question_id = '${i.question_id}'
        order by ${sort}  DESC;`
    },
};
export default question
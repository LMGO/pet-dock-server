let answer = {
    //新发布  
    newquestion(i){
        return `INSERT INTO question (question_id,question_title,question_description,question_cover,user_id,post_time,is_anonymous) VALUES ('${i.question_id}','${i.question_title}','${i.question_description}','${i.question_cover}','${i.user_id}','${i.question_time}','${i.is_anonymous}')`
    },
    // //是否赞同
    // isagree(i,user_id){
    //     return `SELECT count(*) as isagree FROM answer_agree WHERE answer_id = '${i.answer_id}' and user_id ='${user_id}'`
    // },
    // //问题全部回答
    // getallanswer(i,sort){
    //     return `select answer_id,u.user_nickname,u.user_avatar,is_anonymous,a.post_time,a.answer_content,a.agree_count,a.comment_count
    //     from answer a,user u
    //     where a.question_id = '${i.question_id}'
    //     order by ${sort}  DESC;`
    // },
    //赞同问题
    agreeanswer(i){
        return `INSERT INTO answer_agree (answer_id,user_id,agree_time) VALUES ('${i.answer_id}','${i.user_id}','${i.agree_time}')`
    },
    disagreeanswer(i){
        return `DELETE FROM answer_agree WHERE (user_id = '${i.user_id}' and answer_id = '${i.answer_id}')`
    },
    //获取赞同数
    getagreecount(i) {
        return `SELECT count(*) as agree_count FROM answer_agree WHERE answer_id = '${i.answer_id}'`
    },
    //更新关注数
    updateagreecount(i,j){
        return `UPDATE answer SET agree_count='${j}' WHERE answer_id = '${i.answer_id}'`
    },
};
export default answer
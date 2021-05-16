let topic = {
    //新创建  
    newtopic(i){
        return `INSERT INTO topic (topic_id,topic_name,topic_description,topic_cover,user_id,post_time) VALUES ('${i.topic_id}','${i.topic_name}','${i.topic_description}','${i.topic_cover}','${i.user_id}','${i.post_time}')`
    },
    //话题图片
    topicimage(i){
        return `UPDATE topic SET topic_cover='${i.topic_cover}' WHERE topic_id = '${i.topic_id}'`
    },
    //根据名称搜索
    getbyname(i){
        return `SELECT topic_id,topic_name FROM topic WHERE topic_name like '%${i.topic_name}%'`
    },
    //浏览更新热度
    browsetopic(i){
        return `UPDATE topic SET topic_hot=topic_hot+1 WHERE topic_id = '${i.topic_id}'`
    },
    //获取十条热门
    gethotlist() {
        return `select t.user_id,u.user_nickname,u.user_avatar,t.topic_id,t.topic_name,t.topic_hot,t.topic_description,t.topic_cover,t.post_time
        from topic t,user u
        where t.user_id =u.user_id
        order by topic_hot DESC LIMIT 10;`
    },
    //获取讨论数
    getdiscusscount(i) {
        return `SELECT count(*) as discuss_count FROM post_topic WHERE topic_id = '${i.topic_id}'`
    },
};
export default topic
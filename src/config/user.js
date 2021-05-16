let user = {  
    signup(i){
        return `INSERT INTO user (user_id,user_password,user_phone,user_nickname,user_gender,user_type,user_avatar,register_time) VALUES ('${i.user_id}','${i.user_password}','${i.user_phone}','${i.user_nickname}','${i.user_gender}','${i.user_type}','${i.user_avatar}','${i.register_time}')`
    },
    signin(i){
        return `SELECT * FROM user WHERE (user_phone = '${i.loginNameOrPhone}' or user_nickname = '${i.loginNameOrPhone}') and user_password = '${i.user_password}'`
    },
    getuserByPhone(i){
        return `SELECT * FROM user WHERE user_phone = '${i.user_phone}'`
    },
    getuserByuserId(i){
        return `SELECT * FROM user WHERE user_id = '${i.user_id}'`
    },
    followUser(i) {
        return `INSERT INTO user_follow (follow,fans,follow_time) VALUES ('${i.follow}','${i.fans}','${i.follow_time}')`
    },
    unfollowUser(i) {
        return `DELETE FROM user_follow WHERE (follow = '${i.follow}' and fans = '${i.fans}')`
    },
    getfanscount(i) {
        return `SELECT * FROM user_follow WHERE follow = '${i.user_id}'`
    },
    getfollowcount(i) {
        return `SELECT * FROM user_follow WHERE fans = '${i.user_id}'`
    },
};
export default user
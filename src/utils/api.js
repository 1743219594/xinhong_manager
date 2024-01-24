import axios from "axios";
import { ElMessage } from "element-plus";

const baseURL = 'https://www.xhmental.cn/api/';
/* 登录 */
export const login=(studentid,phonenumber,callback)=>{
   
    axios.post(baseURL+'manager_login',{studentid:studentid,phonenumber:phonenumber}, {
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
      }).then((Response)=>{
        callback(Response);
    }).catch((err)=>{
        ElMessage(err)
    }
    )
}
/* 查询发出建议者 */
export const check_send=(studentid,content,callback)=>{
    axios.post(baseURL+'check_message',{studentid:studentid,content:content}, {
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
      }).then((Response)=>{
        callback(Response);
    }).catch((err)=>{
        ElMessage(err)
    }
    )
}
/* 查询发出消息者 */
export const check_reply=(studentid,content,callback)=>{
    axios.post(baseURL+'check_reply',{studentid:studentid,content:content}, {
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
      }).then((Response)=>{
        callback(Response);
    }).catch((err)=>{
        ElMessage(err)
    }
    )
}
/* 获取用户数据总量 */
export const getnumber=(callback)=>{
    axios.post(baseURL+'getnumber',{
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then((Response)=>{
        callback(Response);
    })
    .catch((err)=>{
        ElMessage(err)
    })
}
export const getincreasenumber=(callback)=>{
    axios.post(baseURL+'getIncreasenumber',{
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then((Response)=>{
        callback(Response);
    })
    .catch((err)=>{
        ElMessage(err)
    })
}
/* 获取所有推文 */
export const getalltweet=(callback)=>{
    axios.post(baseURL+'getalltweet',{
        headers: {
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then((Response)=>{
        callback(Response);
    })
    .catch((err)=>{
        ElMessage(err)
    })
}
/* 发布推文 */
export const update_tweetcontent=(data,callback)=>{
    axios.post(baseURL+'contentphoto',data,{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then(()=>{
        callback()
    })
    
}
export const update_tweet=(formdata,callback)=>{
    axios.post(baseURL+'upload_tweet',formdata,{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 删除推文 */
export const delete_tweet=(title,callback)=>{
    axios.post(baseURL+'cancel_tweet',{title:title},{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
      

    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 获取总积分榜 */
export const getTotalRanking=(callback)=>{
    axios.post(baseURL+'getranking',{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
      

    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 获取上传的教师信息 */
export const getTeacher=(callback)=>{
    axios.post(baseURL+'get_teacher_list',{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
    }).then((
        Response
    )=>{
        callback(Response)
    })
}
/* 获取已发布的推文数量，总点赞数，总阅读数,总评论数 */
export const getTweetData=(callback)=>{
    axios.post(baseURL+'getTweetData',{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
    }).then((Response=>{
        callback(Response)
    }))
}
/* 发布活动 */
export const upload_cover=(formdata,callback)=>{
    axios.post(baseURL+'moviecover',formdata,{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then((
      
    )=>{
        callback()
    })
    
}
/* 发布活动 */
export const upload_activity=(formdata,callback)=>{
    axios.post(baseURL+'activity',formdata,{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 获取发布的活动 */
export const getactivity=(callback)=>{
    axios.post(baseURL+'getActivity',{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 获取活动的报名情况 */
export const getRegistrationlist=(activityid,callback)=>{
    axios.post(baseURL+'getRegistrationlist',{activityid:activityid},{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        
    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 发布题目 */
export const upload_question=(formdata,callback)=>{
   
    axios.post(baseURL+'upload_question',formdata,{
        headers:{
            'content-type':'multipart/form-data'
        },
        
    }).then((
        Response
    )=>{
        callback(Response)
    })
    
}
/* 获取发布的题目 */
export const getQuestion=(callback)=>{
    axios.post(baseURL+'getQuestion',{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
    }).then((
        Response
    )=>{
        callback(Response)
    })
}
/* 获取某道题的答题情况 */
export const getaquestion=(id,callback)=>{
    axios.post(baseURL+'getaquestion',{id:id},{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
    }).then((
        Response
    )=>{
        callback(Response)
    })
}
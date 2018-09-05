// import { Pagination } from "antd";

export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        let year = date.getFullYear(),
            month = (date.getMonth()+1)>9?date.getMonth()+1:'0'+(date.getMonth()+1),
            day = date.getDate()>9?date.getDate():'0'+date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes(),
            seconds = date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds();

        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
    },
    pagination(data,callback){
        return {
            onChange: (current)=>{
                callback(current)
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total_count,
            showTotal:()=>{
                return `第${data.page}页，共${data.page_count}页`
            },
            showQuickJumper: true
        }
    }
}
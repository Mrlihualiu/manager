
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
    }
}
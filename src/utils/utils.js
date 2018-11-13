import React from 'react';
import { Select } from 'antd'

const Option = Select.Option;

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
    },
    // 格式化金额，单位：分（eg:430分=4.30元）
    formatFee(fee, suffix = '') {
        if(!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    //格式化公里 （eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if(!mileage){
            return 0;
        }
        if(mileage >= 1000){
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        }else{
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号后四位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1****$2')
    },
    // 隐藏身份证中间11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = []  //[<Option value="0" key="all_key">全部</Option>];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
            return options;
        })
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if(selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    }
}
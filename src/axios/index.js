import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import '../mockdata.js';
import Utils from '../utils/utils';

export default class Axios{

    static requestList(_this,url,params){
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }).then((res)=>{
            if(res && res.result){
                let list = res.result.item_list.map((item,index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
                console.log(_this.list);
            }
        })
    }

    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },(err,response)=>{
                // if(response.status === 'successs'){
                //     resolve(response);
                // }else{
                //     reject(response.message);
                // }
            })
        })
    }
    
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        // let baseApi = 'https://www.easy-mock.com/mock/5b8a081a78b10172ddd399ec/managerapi';
        //let baseApi = 'https://api.manager/mock';
        return new Promise((resolve,reject) => {
            axios({
                method: 'post',
                url: options.url,
                //baseURL: baseApi,
                timeout: 15000,
                params: (options.data && options.data.params) || '' 
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}
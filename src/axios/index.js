import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios{
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
        let baseApi = 'https://www.easy-mock.com/mock/5b8a081a78b10172ddd399ec/managerapi';
        return new Promise((resolve,reject) => {
            axios({
                method: 'get',
                url: options.url,
                baseURL: baseApi,
                timeout: 15000,
                params: (options.data && options.data.params) || '' 
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                    let res = response.data;
                    console.log(res)
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
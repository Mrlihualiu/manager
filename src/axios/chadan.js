import axios from 'axios';
import { Modal } from 'antd';
export default class Axios{
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        console.log(options)
        let baseApi = 'http://old.chadan.wang'
        return new Promise((resolve,reject) => {
            axios({
                method: 'post',
                url: options.url,
                dataType: 'JSON',
                baseURL: baseApi,
                timeout: 15000,
                data: {...options.data}
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                
                if(response.status === 200){
                    let res = response.data
                    if(res.errorCode === 200){
                        resolve(res)
                    }else{
                        Modal.info({
                            title: '提示',
                            content: res.errorMsg
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}
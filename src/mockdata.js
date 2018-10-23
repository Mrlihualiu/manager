import Mock from 'mockjs';

Mock.setup({timeout: '1200-2600'});

Mock.mock(/city\/open/,{      //城市
    "code": 0,
    "result": "开通成功"
})
Mock.mock(/\/open_city/,'post',{      //开通城市
    "code": 0,
    "data": {
        "page": 1,
        "page_size": 10,
        "total_count": 60,
        "page_count": 6,
        "item_list|10": [{
        "id|+1": 1,
        "name": "@city",
        "mode|1-2": 1,
        "op_mode|1-2": 1,
        "franchisee_id": 77,
        "franchisee_name": "松果自营",
        "city_admins|1-2": [{
            "user_name": "@cname",
            "user_id|+1": 10001,
        }],
        "open_time": "@datetime",
        "sys_user_name": "@cname",
        "update_time": 1520476737000
        }]
    }
})
Mock.mock(/order\/list/,{      //订单
    "code": 0,
    "data": {
        "page": 1,
        "page_size": 10,
        "total_count": 60,
        "page_count": 6,
        "item_list|10": [{
            "order_sn|+1": 500001,
            "bike_sn|+1": 100001,
            "user_name": "@cname",
            "mobile": "@phone",
            "distance|100-1                                                  000": 1,
            "total_time|1-60": 1,
            "status|1": ['进行中','已结束'],
            "start_time|1-60": 1,
            "end_time|1-60": 1,
            "total_fee|1-10.2": 2, 
            "user_pay|0-10.2": 2
        }]
    }
})
Mock.mock(/order\/ebike_info/,{      //订单结束
    "code": 0,
    "data": {
        "page": 1,
        "page_size": 10,
        "total_count": 60,
        "page_count": 10,
       
    }
})
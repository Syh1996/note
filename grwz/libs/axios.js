/**
 * created by shao.yuhong
 * 2020/8/23
 * ajax 请求封装
 */

import {  host } from '~/api';
import axios from 'axios';
import qs from 'qs';
var instance = axios.create();
instance.defaults.baseURL = host;
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if(process.browser){
        let token = localStorage.getItem("token") || '';
        if(token){
            config.headers.token = token;
        }
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * get请求方法
 * @param {string} url 
 * @param {object} data 
 */
const get = async (url, data) => {
    return await instance.get(url, { params: data });
}

/**
 * post请求方法
 * @param {string} url 
 * @param {object} data 
 */
const post = async (url, data) => {
    return await instance.post(url, qs.stringify(data));
}

/**
 * get请求方法
 * @param {string} url 
 * @param {object} data 
 */
const getAsync =  (url, data) => {
    return  instance.get(url, { params: data });
}

/**
 * post请求方法
 * @param {string} url 
 * @param {object} data 
 */
const postAsync =  (url, data) => {
    return  instance.post(url, qs.stringify(data));
}

export  {
    get,
    post,
    getAsync,
    postAsync,
    instance
}
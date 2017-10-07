/**
 * name:http服务
 * describe:对http请求做统一处理
 * date:2017/6/3
 * time:11:29
 */
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LoadingController,Loading } from 'ionic-angular';
// import {ResponseData} from './responseData';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpUtils {
    loading:Loading;
    constructor(private http: HttpClient,private loadingCtrl:LoadingController) {
    }

    /**
    * get请求
    * @param url 接口地址
    * @param params 参数
    * @returns {Promise<R>|Promise<U>}
    */
    public get(url: string): any {
        this.loading=this.loadingCtrl.create({
            content: '请稍等...'
        });
        this.loading.present();
        return this.http.get(url)
            .toPromise()
            .then(res=>this.handleSuccess(res))
            .catch(res => this.handleError(res));
    }

    /**
    * post请求
    * @param url 接口地址
    * @param params 参数
    * @returns {Promise<R>|Promise<U>}
    */
    public post(url: string, params: any) {
        this.loading=this.loadingCtrl.create({
            content: '请稍等...'
        });
        this.loading.present();
        return this.http.post(url, params)
            .toPromise()
            .then((res:any)=>this.handleSuccess(res))
            .catch((res) => this.handleError(res));
    }

    /**
    * 处理请求成功
    * @param res
    * @returns
    */
    private handleSuccess(res) {
        console.log(res);
        this.loading.dismiss();
        //let body = res["_body"];
        // let responseData=new ResponseData();
        // responseData={
        //     data: res || {},
        //     statusText: res.statusText,
        //     status: res.status,
        //     success: true
        // }
        return res;
    }

    /**
    * 处理请求错误
    * @param error
    * @returns {void|Promise<string>|Promise<T>|any}
    */
    private handleError(error) {
        this.loading.dismiss();
        let msg = '请求失败';
        if (error.status == 400) {
            console.log('请求参数正确');
        }
        if (error.status == 404) {

            console.error('请检查路径是否正确');
        }
        if (error.status == 500) {
            console.error('请求的服务器错误');
        }
        console.log("error:"+JSON.stringify(error));
        throw msg;
        //return { data:msg,statusText:'',success: false, status: error.status };
    }
}
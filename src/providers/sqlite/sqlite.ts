import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class SqliteUtil{
    _sqlite:SQLite;
    dbName:'localDb.db';
    constructor(){

    }
    initDB(tableName:string){
        this._sqlite.create({
            name:this.dbName,
            location:'default'
        }).then((db:SQLiteObject)=>{
            let createTabelSql='create table '+tableName+' ()';
            db.
            db.executeSql('create table userLogin(name VARCHAR(32))',{})
            .then(()=>console.log('create table'))
            .catch(e=>console.log(e))
        }).catch(e=>console.log(e));
    }
}
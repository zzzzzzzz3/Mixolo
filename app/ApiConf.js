import React from 'react'

export default class ApiConf{
    static ServiceUrl = "http://appddictionstudio.com/mixolo/";

    static createUrl(action){
        return `${this.ServiceUrl}?action=${action}`
    }
}
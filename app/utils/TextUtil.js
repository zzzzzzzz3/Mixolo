import React from 'react'


export default class TextUtil {
    static isEmpty(text: string) {
        return text === undefined || text === null || text === ''
    }

    static isEmail(text:string){
        let reg = new RegExp("[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" + "\\@"
            + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\."
            + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+");
        return reg.test(text)
    }
}
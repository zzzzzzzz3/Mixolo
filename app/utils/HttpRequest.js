import queryString from 'query-string';

function timeout_fetch(fetch_promise, timeout = 10000) {
    let timeout_fn = null;

    //这是一个可以被reject的promise
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('timeout promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function () {
        timeout_fn();
    }, timeout);

    return abortable_promise;
}

export default class HttpRequest {

    static get(url, token = "") {
        let header = {
            "Content-Type": "application/json;charset=UTF-8",
            "accesstoken": token
        };
        // noinspection JSIgnoredPromiseFromCall
        return new Promise(function (resolve, reject) {
            timeout_fetch(fetch(url, {
                method: 'GET',
                headers: header
            })).then((response) => {
                    console.log("------------>response:", response);
                    if (response.ok) {
                        return response.json()
                    } else {
                        return {error: response.statusText}
                    }
                })
                .then((responseData) => {
                    console.log("------------>result:", responseData);
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log("------------>error:", err);
                    reject(err);
                });
        });
    }

    static post(url, params, type = "json", token = "") {
        let contentType = null;
        let body = null;

        if (type === "form") {
            contentType = "application/x-www-form-urlencoded;charset=utf-8";
            body = queryString.stringify(params);
        } else if (type === "json") {
            contentType = "application/json;charset=UTF-8";
            body = JSON.stringify(params);
        }

        let header = {
            "Content-Type": contentType,
            "accesstoken": token
        };

        // noinspection JSIgnoredPromiseFromCall
        return new Promise(function (resolve, reject) {
            timeout_fetch(fetch(url, {
                method: 'POST',
                headers: header,
                body: body
            })).then((response) => {
                console.log("------------>response:", response);
                if (response.ok) {
                    return response.json()
                } else {
                    return {error: response.statusText}
                }
            })
                .then((responseData) => {
                    console.log("------------>result:", responseData);
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log("------------>error:", err);
                    reject(err);
                });
        });
    }

}
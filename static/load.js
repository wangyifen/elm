function loadJs(url,requireCache, callback) {  
    var done = false;  
    var script = document.createElement('script');  
    script.type = 'text/javascript';//do not 'application/javascript',because Low version of the browser is not compatible  
    script.language = 'javascript';  
    script.src = url;
    if (requireCache) {
        script.src = url + '?t=' + Date.parse(new Date());
    }
    // script.async = "async"  
    script.setAttribute('src', url);  
    /** 
     * js加载完成函数
    */
    script.onload = script.onreadystatechange = function () {  
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {  
            done = true;  
            script.onload = script.onreadystatechange = null;  
            if (callback) {  
                callback.call(script);  
                // window.$templateLoad(callback)
            }  
        }  
        window.$urlNumber--;
        if (window.$urlNumber == 0) {
            window.$onchange()
        }
    };  
    script.onerror = function() {
        console.log(url,'接口请求加载失败')
        window.$urlNumber--;
        if (window.$urlNumber == 0) {
            window.$onchange()
        }
    };
    if (!window.$urlList) { //$urlList url列表，$urlNumber判断url接口是否加载完成
        window.$urlList = [];
        window.$urlNumber = 0;
    }
    if (window.$urlList.indexOf(url) == -1 || window.$urlList.length == 0) { //window列表中不含有url，即创建script标签，请求url
        window.$urlList.push(url);
        window.$urlNumber++
        document.getElementsByTagName('html')[0].appendChild(script);  
    }
};  

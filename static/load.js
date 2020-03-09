function loadJs(url, callback , BASE_URL) {  
    // console.log(process,'oooooooooo')
    var done = false;  
    var script = document.createElement('script');  
    script.type = 'text/javascript';//do not 'application/javascript',because Low version of the browser is not compatible  
    script.language = 'javascript';  
    script.src = url;
    // script.async = "async"  
    script.setAttribute('src', url);  
    script.onload = script.onreadystatechange = function () {  
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {  
            done = true;  
            script.onload = script.onreadystatechange = null;  
            if (callback) {  
                console.log('load ' + url + ' success.');  
                callback.call(script);  
            }  
        }  
    };  
    console.log('<%= process.env.NODE_ENV %>','<%= process.env.VUE_APP_BASEURL %>',BASE_URL,'+++++++++++')
    document.getElementsByTagName("body")[0].appendChild(script);  
};  
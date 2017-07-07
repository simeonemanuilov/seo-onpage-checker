//Function for cyrillic URL addresses and encoding
function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

//Set Google Analytics tracking
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-74097617-16']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


//Function which translate popup in different languages
function translateHTML () {
    var objects = document.getElementsByTagName('*'), i;
    for(i = 0; i < objects.length; i++) {
        if (objects[i].dataset && objects[i].dataset.message) {
            objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.message);
        }
    }
}

//Serpstat Context menu
serpstat_icon_text = chrome.i18n.getMessage("serpstatContextMenu");
var menuItem = {
    "id": "serpstat",
    "title": serpstat_icon_text,
    "contexts": ["selection"]
};

//Clear current context menus if any
chrome.contextMenus.remove('serpstat', function() {
    chrome.contextMenus.create(menuItem);
});

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "serpstat" && clickData.selectionText){
        var serpstatUrl = "https://serpstat.com/keywords/index/?search_type=keyword&query=" + fixedEncodeURI(clickData.selectionText) +"&se=g_bg";
        var createData = {
            "url": serpstatUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth,
            "height": screen.availHeight/2
        };
        chrome.windows.create(createData, function(){});
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var headings = document.getElementById('headings');
    var robots = document.getElementById('robots');
    var home = document.getElementById('home');
    var images = document.getElementById('images');
    var prev_next = document.getElementById('prev-next');
    var hreflang = document.getElementById('hreflang');
    var all_html = document.getElementById('all-html');

    //Transalete all the HTML in extension popup
    translateHTML();

    headings.addEventListener('click', function () {
        chrome.tabs.executeScript({
            file: 'functions/display_headings.js'
        });
    });

    robots.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'location.href="http://"+location.host+"/robots.txt"'
        });
        document.getElementById("refresh").innerHTML = chrome.i18n.getMessage("back");
    });

    refresh.addEventListener('click', function () {
        document.getElementById("refresh").innerHTML = chrome.i18n.getMessage("refresh");
        chrome.tabs.executeScript({
            code: 'window.location.href = location.origin'
        });
    });

    images.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'var imgs = document.getElementsByTagName("img"); var iAlt = ""; var iTitle = ""; for (var i=0; i<imgs.length; i++) { imgs[i].setAttribute("width", imgs[i].width); imgs[i].setAttribute("height", imgs[i].height); imgs[i].removeAttribute("src"); imgs[i].removeAttribute("srcset"); imgs[i].removeAttribute("className"); if (imgs[i].getAttribute("alt") != null) iAlt = imgs[i].alt; else iAlt = ""; if (iAlt == "") iAlt = "empty"; if (imgs[i].getAttribute("title") != null) iTitle = imgs[i].title; else iTitle = ""; if (iTitle == "") iTitle = "empty"; imgs[i].alt = "Alt: "+iAlt+" Title: "+iTitle; }'
        });
    });

    prev_next.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'var url = document.location; var links = document.getElementsByTagName("link"); var fprev = "none"; var fnext = "none"; for (var i = 0, l; l = links[i]; i++) { if (l.getAttribute("rel") == "prev") { fprev = l.getAttribute("href"); } if (l.getAttribute("rel") == "next") { fnext = l.getAttribute("href"); } } alert("prev: "+fprev+"\\r\\nnext: "+fnext); '
        });
    });

    hreflang.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code:'var links=document.getElementsByTagName("link"); var href="none"; var hreflang="none"; var s=""; for(var i=0;i<links.length;i++){ if(links[i].getAttribute("rel")=="alternate"){href=links[i].getAttribute("href"); hreflang=links[i].getAttribute("hreflang"); if(href!=null&&hreflang!=null) { s = s + "href: "+href+"\\r\\n"+"hreflang: "+hreflang+"\\r\\n-------------------------------------\\r\\n"}}} if(s=="") {s="Няма намерен hreflang"} alert(s);'
        });
    });

    all_html.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'function makeHttpObject(){return new XMLHttpRequest()}var html;var request=makeHttpObject();request.open(\"GET\",location.href,true);request.send(null);request.onreadystatechange=function(){if(request.readyState==4)html=request.responseText};setTimeout(function(){var body_section=html.substring(html.search(\/<body\/i));var current_domain=location.origin;var domains=body_section.match(\/(href=\"https?:\\\/\\\/[^\\s]+)\/gi);var external_domains_count=0;var external_domains=[];for(var i=0,len=domains.length;i<len;i++){domains[i]=domains[i].replace(\"href=\\\"\",\"\");domains[i]=domains[i].substring(0,domains[i].search(\"\\\"\"));domains[i]=domains[i].substring(0,domains[i].indexOf(\"\/\",12));if(!domains[i].startsWith(current_domain)&&domains[i].length>12){external_domains.push(domains[i])}}var external_domains=external_domains.filter(function(elem,index,self){return index==self.indexOf(elem)});var result_external_domains=\"\";for(var i=0,len=external_domains.length;i<len;i++){if(i<5){result_external_domains+=external_domains[i]+\"\\n\\r\"}external_domains_count++}alert(\"\u041E\u0442\u043A\u0440\u0438\u0442\u0438 \u0441\u0430 \u043B\u0438\u043D\u043A\u043E\u0432\u0435 \u043A\u044A\u043C: \"+external_domains_count+\" \u0432\u044A\u043D\u0448\u043D\u0438 \u0434\u043E\u043C\u0435\u0439\u043D\u0430 \u0438\u043B\u0438 \u0433\u0440\u0435\u0448\u043D\u0438 \u0432\u044A\u0442\u0440\u0435\u0448\u043D\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438! \u0427\u0430\u0441\u0442 \u043E\u0442 \u0442\u044F\u0445:\\n\\r\"+result_external_domains+\"\\n\\r\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C \u0435 \u0430\u043D\u0430\u043B\u0438\u0437, \u0437\u0430 \u0434\u0430 \u0441\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438 \u043D\u0443\u0436\u0434\u0430\u0442\u0430 \u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0432\u0435\u043D\u0446\u0438\u044F.\")},2000);'
        });
        all_html.innerText = chrome.i18n.getMessage("waiting");
    });

});
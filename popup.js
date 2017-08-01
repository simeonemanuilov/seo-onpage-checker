var tab_title = '';

function display_canonical(results) {
    canonical = results;
    meta_title_text = chrome.i18n.getMessage("metaTitle");
    canonical_text = chrome.i18n.getMessage("canonical");
    document.querySelector("#meta-title").innerHTML = "<p class='info'><span class='info-heading'>" + meta_title_text + ": </span>" + tab_title + "</p><p class='info'><span class='info-heading'>" + canonical_text + ": </span>" + canonical + "</p>";
}

function display_h1(results) {
    h1 = results;
    h1_text = chrome.i18n.getMessage("h1Text");
    document.querySelector("#h1").innerHTML = "<p class='info'><span class='info-heading'>" + h1_text + ": </span>" + h1 + "</p>";

    missing_h1_text = chrome.i18n.getMessage("missingH1");
    if (h1[0] == "none") {
        document.querySelector("#recommendations-panel-3").innerHTML += "<p class='warning'>" + missing_h1_text + "</p>";
    }
    if (h1[0].indexOf("none") !== -1) {
        document.querySelector("#h1").className += "none-h1";
    }
}

function display_netpeak_cloud(results) {
    netpeak_cloud = results;
    netpeak_cloud_id_text = chrome.i18n.getMessage("netpeakCloudIdText");
    document.querySelector("#netpeak-cloud").innerHTML = "<p class='info'><span class='info-heading'>" + netpeak_cloud_id_text + ": </span>" + netpeak_cloud + "</p>";
}

function http_headers(results) {
    http_headers = results;
    table = "<table class='headers-table'>";
    for (var i = 0, len = http_headers[0].length; i < len; i++) {
        table += "<tr><td>" + http_headers[0][i] + "</td></tr>";
    }
    table += "</table>";
    document.querySelector("#headers-panel").innerHTML = "<p class='info'><span class='info-heading'></span>" + table + "</p>";
}

function robots_links(results) {
    //var link = results;
    //document.querySelector("#robots").href=link+"/robots.txt";
    //document.querySelector("#robots").setAttribute('target', '_blank')
}

function display_index_noindex(results) {
    index_noindex = results;
    var index_noindex_result = document.querySelector("#index-noindex");
    index_noindex_text = chrome.i18n.getMessage("indexNoindex");
    index_noindex_result.innerHTML = "<p class='info'><span class='info-heading'>" + index_noindex_text + ": </span>" + index_noindex + "</p>";
    if (index_noindex[0].indexOf("noindex") !== -1) {
        index_noindex_result.className += "noindex";
    }
}

function display_long_meta_error(results) {
    meta_title_long = results;
    meta_title_long_text_start = chrome.i18n.getMessage("metaTitleErrorStart");
    meta_title_long_text_end = chrome.i18n.getMessage("metaTitleErrorEnd");
    if (meta_title_long.length > 65) {
        document.querySelector("#recommendations-panel-2").innerHTML += "<p class='warning'>" + meta_title_long_text_start + " : " + meta_title_long.length + " " + meta_title_long_text_end + ".</p>";
    }
}

function display_h1_error(results) {
    h1_error = results;
    if (h1_error[0] != null) {
        if (h1_error[0].length > 1) {
            h1_error_text = chrome.i18n.getMessage("h1Error");
        } else {
            h1_error_text = '';
        }
        document.querySelector("#recommendations-panel").innerHTML = "<p class='warning'>" + h1_error_text + "</p>";
    }
}

function display_meta_description(results) {
    meta_description = results;
    meta_description_text = chrome.i18n.getMessage("metaDescription");
    document.querySelector("#meta-description").innerHTML = "<p class='info'><span class='info-heading'>" + meta_description_text + ": </span>" + meta_description + "</p>";
}

function current_url(results) {
    current_url = results;
    current_url_encoded = encodeURIComponent(current_url);
    serpstat_locale_text = chrome.i18n.getMessage("serpstatLocale");
    page_speed_locale_text = chrome.i18n.getMessage("pageSpeedLocale");

    //Add href to extnernal Structured data tool
    document.querySelector("#structured-data").href = "https://developers.google.com/structured-data/testing-tool/?url=" + current_url_encoded;
    document.querySelector("#structured-data").setAttribute('target', '_blank');

    //Add href to extnernal Full HTTP Headers data
    document.querySelector("#headers-data").href = "http://soft.galinov.com/?link=" + current_url_encoded;
    document.querySelector("#headers-data").setAttribute('target', '_blank');

    //Add href to extnernal Page Speed tool
    document.querySelector("#page-speed").href = "https://developers.google.com/speed/pagespeed/insights/?" + page_speed_locale_text + "&url=" + current_url_encoded;
    document.querySelector("#page-speed").setAttribute('target', '_blank');

    //Add href to extnernal Serpstat tool
    document.querySelector("#serpstat").href = "https://serpstat.com/urls/index?query=" + current_url_encoded + "&ff=1&search_type=subdomains&" + serpstat_locale_text;
    document.querySelector("#serpstat").setAttribute('target', '_blank');

    //Add href to extnernal Mobile Friendly tool
    document.querySelector("#mobile-friendly").href = "https://search.google.com/test/mobile-friendly?url=" + current_url_encoded;
    document.querySelector("#mobile-friendly").setAttribute('target', '_blank');

    //Add href to extnernal W3 Validator Tool
    document.querySelector("#w3-validator").href = "https://validator.w3.org/nu/?doc=" + current_url_encoded;
    document.querySelector("#w3-validator").setAttribute('target', '_blank');

    //Add href to extnernal Similar Web tool
    document.querySelector("#similar-web").href = "https://www.similarweb.com/website/" + current_url;
    document.querySelector("#similar-web").setAttribute('target', '_blank');
}

chrome.tabs.query({active: true}, function (tabs) {
    var tab = tabs[0];
    tab_title = tab.title;

    chrome.tabs.executeScript(tab.id, {
        code: 'location.href'
    }, current_url);

    chrome.tabs.executeScript(tab.id, {
        file: 'functions/display_canonical.js'
    }, display_canonical);

    chrome.tabs.executeScript(tab.id, {
        code: 'var h1 = document.querySelector("h1"); if (h1!=null) { h1.textContent; } else { "none" }'
    }, display_h1);

    chrome.tabs.executeScript(tab.id, {
        file: 'functions/display_meta_description.js'
    }, display_meta_description);

    chrome.tabs.executeScript(tab.id, {
        file: 'functions/display_index_noindex.js'
    }, display_index_noindex);

    chrome.tabs.executeScript(tab.id, {
        file: 'functions/display_netpeak_cloud.js'
    }, display_netpeak_cloud);

    chrome.tabs.executeScript(tab.id, {
        code: "if(document.querySelectorAll('h1').length>1) { 'Warrning! More than H1 tags on page!' } "
    }, display_h1_error);

    chrome.tabs.executeScript(tab.id, {
        code: "window.location.origin"
    }, robots_links);

    chrome.tabs.executeScript(tab.id, {
        file: 'functions/http_headers.js'
    }, http_headers);

    display_long_meta_error(tab_title);

});

var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-74097617-16']);
_gaq.push(['_trackEvent', 'url', 'unknown']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = false;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();


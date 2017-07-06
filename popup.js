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
    if (h1_error[0].length > 1) {
        h1_error_text = chrome.i18n.getMessage("h1Error");
    } else {
        h1_error_text = '';
    }
    document.querySelector("#recommendations-panel").innerHTML = "<p class='warning'>" + h1_error_text + "</p>";
}

function display_meta_description(results) {
    meta_description = results;
    meta_description_text = chrome.i18n.getMessage("metaDescription");
    document.querySelector("#meta-description").innerHTML = "<p class='info'><span class='info-heading'>" + meta_description_text + ": </span>" + meta_description + "</p>";
}

function current_url(results) {
    current_url = results;
    current_url_encoded = encodeURIComponent(current_url);
    document.querySelector("#structured-data").href = "https://developers.google.com/structured-data/testing-tool/?url=" + current_url_encoded;
    document.querySelector("#structured-data").setAttribute('target', '_blank');

    document.querySelector("#page-speed").href = "https://developers.google.com/speed/pagespeed/insights/?hl=bg&url=" + current_url_encoded;
    document.querySelector("#page-speed").setAttribute('target', '_blank');

    document.querySelector("#serpstat").href = "https://serpstat.com/urls/index?query=" + current_url_encoded + "&ff=1&search_type=subdomains&se=g_bg";
    document.querySelector("#serpstat").setAttribute('target', '_blank');

    document.querySelector("#mobile-friendly").href = "https://search.google.com/test/mobile-friendly?url=" + current_url_encoded;
    document.querySelector("#mobile-friendly").setAttribute('target', '_blank');

    document.querySelector("#w3-validator").href = "https://validator.w3.org/nu/?doc=" + current_url_encoded;
    document.querySelector("#w3-validator").setAttribute('target', '_blank');

}


chrome.tabs.query({active: true}, function (tabs) {
    var tab = tabs[0];
    tab_title = tab.title;

    chrome.tabs.executeScript(tab.id, {
        code: 'location.href'
    }, current_url);

    chrome.tabs.executeScript(tab.id, {
        code: 'var url = document.location; var links = document.getElementsByTagName("link"); var found = "none"; for (var i = 0, l; l = links[i]; i++) { if (l.getAttribute("rel") == "canonical") { found = l.getAttribute("href"); break; } } decodeURIComponent(found);'
    }, display_canonical);

    chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector("h1").textContent'
    }, display_h1);

    chrome.tabs.executeScript(tab.id, {
        code: 'var metas = document.getElementsByTagName("meta"); var meta_description=""; for (var i=0; i<metas.length; i++) { if (metas[i].getAttribute("name") == "description") { meta_description = metas[i].getAttribute("content"); } } meta_description;'
    }, display_meta_description);

    chrome.tabs.executeScript(tab.id, {
        code: 'var url = document.location; var links = document.getElementsByTagName("meta"); var found = "none"; for (var i = 0, l; l = links[i]; i++) { if (l.getAttribute("name") == "robots") { found = l.getAttribute("content"); break; } } found;'
    }, display_index_noindex);

    chrome.tabs.executeScript(tab.id, {
        code: "var cloud = document.querySelector(\"script[src*='netpeak.cloud/js/init']\").src; var cloud_id = cloud.match(/\\d+/)[0]; cloud_id;"
    }, display_netpeak_cloud);

    chrome.tabs.executeScript(tab.id, {
        code: "if(document.querySelectorAll('h1').length>1) { 'Warrning! More than H1 tags on page!' } "
    }, display_h1_error);

    chrome.tabs.executeScript(tab.id, {
        code: "window.location.origin"
    }, robots_links);

    chrome.tabs.executeScript(tab.id, {
        code: "var req = new XMLHttpRequest(); req.open('GET', document.location, false); req.send(null); var headers = req.getAllResponseHeaders(); headers.split(\"\\n\")"
    }, http_headers);

    display_long_meta_error(tab_title);

});


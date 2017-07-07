var links = document.getElementsByTagName("link");
var href = "none";
var hreflang = "none";
var s = "";
for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("rel") == "alternate") {
        href = links[i].getAttribute("href");
        hreflang = links[i].getAttribute("hreflang");
        if (href != null && hreflang != null) {
            s = s + "href: " + href + "\r\n" + "hreflang: " + hreflang + "\r\n-------------------------------------\r\n"
        }
    }
}
if (s == "") {
    s = "Няма намерен hreflang"
}
alert(s);

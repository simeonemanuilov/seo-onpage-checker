var url = document.location;
var links = document.getElementsByTagName("link");
var fprev = "none";
var fnext = "none";
for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute("rel") == "prev") {
        fprev = l.getAttribute("href");
    }
    if (l.getAttribute("rel") == "next") {
        fnext = l.getAttribute("href");
    }
}
alert("prev: " + fprev + "\r\nnext: " + fnext);

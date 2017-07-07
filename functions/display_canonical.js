var url = document.location;
var links = document.getElementsByTagName("link");
var found = "none";
for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute("rel") == "canonical") {
        found = l.getAttribute("href");
        break;
    }
}
decodeURIComponent(found);



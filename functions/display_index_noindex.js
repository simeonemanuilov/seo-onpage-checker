var url = document.location;
var links = document.getElementsByTagName("meta");
var found = "index";
for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute("name") == "robots" || l.getAttribute("name") == "ROBOTS") {
        found = l.getAttribute("content");
        break;
    }
}
found;
var url = document.location;
var links = document.getElementsByTagName("meta");
var found = "none";
for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute("name") == "robots") {
        found = l.getAttribute("content");
        break;
    }
}
found;
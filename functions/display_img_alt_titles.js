var imgs = document.getElementsByTagName("img");
var iAlt = "";
var iTitle = "";
for (var i = 0; i < imgs.length; i++) {
    imgs[i].setAttribute("width", imgs[i].width);
    imgs[i].setAttribute("height", imgs[i].height);
    imgs[i].removeAttribute("src");
    imgs[i].removeAttribute("srcset");
    imgs[i].removeAttribute("className");
    if (imgs[i].getAttribute("alt") != null) iAlt = imgs[i].alt; else iAlt = "";
    if (iAlt == "") iAlt = "empty";
    if (imgs[i].getAttribute("title") != null) iTitle = imgs[i].title; else iTitle = "";
    if (iTitle == "") iTitle = "empty";
    imgs[i].alt = "Alt: " + iAlt + " Title: " + iTitle;
}

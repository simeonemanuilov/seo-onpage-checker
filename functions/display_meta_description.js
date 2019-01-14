var metas = document.getElementsByTagName("meta");
var meta_description = "";
for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") == "description" || metas[i].getAttribute("name") == "DESCRIPTION") {
        meta_description = metas[i].getAttribute("content");
    }
}
meta_description;
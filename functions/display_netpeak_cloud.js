var cloud = document.querySelector("script[src*='netpeak.cloud/js/init']");
if (cloud !== null) {
    cloud = cloud.src;
    var cloud_id = cloud.match(/\d+/)[0];
    cloud_id;
} else {
    cloud = "none";
    cloud;
}

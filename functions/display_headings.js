var a, b, c, d, e, f;
f = new Array("pink", "orange", "yellow", "aquamarine", "lightskyblue", "plum");
for (a = 1; a <= 6; a++) {
    b = document.getElementsByTagName("h" + a);
    for (c = 0; c < b.length; c++) {
        d = b[c];
        e = d.style;
        e.backgroundColor = f[a - 1];
        e.border = "2px solid black";
        e.color = "black";
        d.innerHTML = "H" + a + " " + d.innerHTML;
    }
}

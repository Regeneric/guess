const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn) {
    const ipcRenderer = require("electron").ipcRenderer;
    let res = '';

    btn.addEventListener("click", function() {
        if (btn.id == "yes") {
            res = "yes";
            ipcRenderer.send("resp", res);
        } else {
            res = "no";
            ipcRenderer.send("resp", res);
        }
    });
});
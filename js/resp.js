const btnY = document.querySelector("#yes");
const btnN = document.querySelector("#no");          

btnY.addEventListener("click", function() {
    const ipcRenderer = require("electron").ipcRenderer;
    const pass = "yes";
    ipcRenderer.send("resp", pass);
});
btnN.addEventListener("click", function() {
    const ipcRenderer = require("electron").ipcRenderer;
    const fail = "no";
    ipcRenderer.send("resp", fail);
}); 
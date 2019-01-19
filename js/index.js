const rnd = "http://api.wordnik.com/v4/words.json/randomWord?api_key=3b10a843b30072122034d2dc91a1823128947afb1d5906659";
const def = "http://api.wordnik.com/v4/word.json/";
    const defC = "/definitions?api_key=3b10a843b30072122034d2dc91a1823128947afb1d5906659";

const giphy = "http://api.giphy.com/v1/gifs/?api_key=qsPrPsFfBsyX01CG0CQbxXP30UBSw3Va?funny_cats/";

const cat = document.querySelector(".cat");
const desc = document.querySelector(".definition");
const guess = document.querySelector(".guess");
const submit = document.querySelector(".btn");

let word = '';

(function() {
    fetch(rnd)
        .then(data => {
            return data.json();
        })
        .then(json => {
            word = json.word;
            return fetch(def + json.word + defC);
        })
        .then(data => {
            return data.json();
        })
        .then(json => {
            cat.innerHTML = json[0].partOfSpeech;

            const p = document.createElement("p");
            const txt = document.createTextNode(json[0].text);
                p.appendChild(txt);
                desc.appendChild(p);
        })
        .catch(err => console.log(err));
})();


submit.addEventListener("click", function() {
    const ipcRenderer = require("electron").ipcRenderer;

    if (guess.value.toLowerCase() == word.toLowerCase()) {
        const pass = "pass";
        ipcRenderer.send("guess", pass);
    } else {
        const fail = "fail";
        ipcRenderer.send("guess", fail);
    }
});
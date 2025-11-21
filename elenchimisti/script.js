// LETTURA JSON (richiesta esplicita) 
function loadJSON() {
    const req = new XMLHttpRequest();
    req.open("GET", "cv.json", true);
    req.send();

    req.onload = function () {
        const json = JSON.parse(req.responseText);
        document.getElementById("message").innerHTML =
            `<pre>${JSON.stringify(json, null, 2)}</pre>`;
    };
}



// LETTURA XML 
function loadXML() {
    const req = new XMLHttpRequest();
    req.open("GET", "dati.xml", true);
    req.send();

    req.onload = function () {
        const xml = req.responseXML;

        let output = "";
        
        const persone = xml.getElementsByTagName("persona");

        for (let p of persone) {
            let nome = p.getElementsByTagName("nome")[0].textContent;
            let cognome = p.getElementsByTagName("cognome")[0]?.textContent || "";
            output += `- ${nome} ${cognome}<br>`;
        }

        document.getElementById("message").innerHTML = output || "XML vuoto o non valido.";
    };
}


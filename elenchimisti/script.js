<script>

// Funzione principale: legge file e lo processa
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;

        // Distinguo i formati in base all'estensione
        if (file.name.endsWith(".json")) {
            processJSON(text);
        } else if (file.name.endsWith(".xml")) {
            processXML(text);
        }
    };

    reader.readAsText(file);
});

// --- Funzione per gestire JSON --- //
function processJSON(text) {
    try {
        const data = JSON.parse(text);
        renderData(data);
    } catch (e) {
        document.getElementById("output").innerHTML = "Errore nel parsing del JSON";
    }
}

// --- Funzione per gestire XML --- //
function processXML(text) {
    try {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const obj = XMLtoJSON(xml.documentElement);
        renderData(obj);
    } catch (e) {
        document.getElementById("output").innerHTML = "Errore nel parsing dell'XML";
    }
}

// Converte XML in JSON semplice
function XMLtoJSON(node) {
    let obj = {};

    // Se ha figli
    if (node.children.length > 0) {
        for (let child of node.children) {
            const childObj = XMLtoJSON(child);

            if (obj[child.tagName] === undefined) {
                obj[child.tagName] = childObj;
            } else {
                // Se più elementi con lo stesso nome → array
                if (!Array.isArray(obj[child.tagName])) {
                    obj[child.tagName] = [obj[child.tagName]];
                }
                obj[child.tagName].push(childObj);
            }
        }
    } else {
        return node.textContent;
    }

    return obj;
}

// --- Funzione per visualizzare dati in HTML --- //
function renderData(data) {
    const output = document.getElementById("output");
    output.innerHTML = generateHTMLTable(data);
}

// Crea una tabella HTML ricorsivamente
function generateHTMLTable(data) {
    if (typeof data !== "object") return `<p>${data}</p>`;

    let html = "<table><tr>";

    // Intestazioni
    for (let key in data) {
        html += `<th>${key}</th>`;
    }
    html += "</tr><tr>";

    // Valori
    for (let key in data) {
        const value = data[key];

        if (Array.isArray(value)) {
            html += `<td>${value.map(item => generateHTMLTable(item)).join("")}</td>`;
        } else if (typeof value === "object") {
            html += `<td>${generateHTMLTable(value)}</td>`;
        } else {
            html += `<td>${value}</td>`;
        }
    }

    html += "</tr></table>";
    return html;
}

</script>

document.getElementById("fileInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result.trim();
        let data = [];

        // Riconoscimento del formato
        if (text.startsWith("{") || text.startsWith("[")) {
            data = parseJSON(text);
        } else if (text.startsWith("<")) {
            data = parseXML(text);
        } else {
            alert("Formato non riconosciuto");
            return;
        }

        renderData(data);
    };

    reader.readAsText(file);
});

// --- JSON ---
function parseJSON(text) {
    const obj = JSON.parse(text);
    return Array.isArray(obj) ? obj : [obj];
}

// --- XML ---
function parseXML(text) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const records = xml.getElementsByTagName("record");
    const data = [];

    for (let i = 0; i < records.length; i++) {
        let obj = {};
        for (let child of records[i].children) {
            obj[child.tagName] = child.textContent;
        }
        data.push(obj);
    }

    return data;
}
function renderData(data) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    data.forEach(rec => {
        const div = document.createElement("div");
        div.className = "record";

        for (let key in rec) {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${key}:</strong> ${rec[key]}`;
            div.appendChild(p);
        }

        output.appendChild(div);
    });
}

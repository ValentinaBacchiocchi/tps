var xhr = new XMLHttpRequest();
xhr.open('GET', 'elenco.json', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var persone = JSON.parse(xhr.responseText);
    var tbody = document.querySelector('#tabella tbody');

    persone.forEach(function(persona) {
      var tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${persona.nome}</td>
        <td>${persona.cognome}</td>
        <td>${persona.indirizzo}</td>
        <td>${persona.città}</td>
        <td>${persona.cap}</td>
      `;
      tbody.appendChild(tr);
    });
  }
};
xhr.send();

fetch('anagrafica.json')
    .then(response => response.json())
    .then(data => {
        const users = data;
        
        // Funzione per visualizzare tutti gli utenti
        function displayUsers(users) {
            const tableBody = document.querySelector('#table tbody');
            tableBody.innerHTML = '';  // Pulisce la tabella

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.cognome}</td>
                    <td>${user.nome}</td>
                    <td>${user.data_nascita}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Funzione per la ricerca full-text dei cognomi
        document.querySelector('#searchLetter').addEventListener('input', (event) => {
            const searchLetter = event.target.value.toUpperCase();
            const filteredUsers = users.filter(user => user.cognome.toUpperCase().startsWith(searchLetter));
            displayUsers(filteredUsers);
        });

        // Funzione per determinare se un utente è maggiorenne
        function displayMaggiorenni() {
            const today = new Date();
            const tableBody = document.querySelector('#table-maggiorenni tbody');
            tableBody.innerHTML = '';  // Pulisce la tabella

            const maggiorenni = users.filter(user => {
                const birthDate = new Date(user.data_nascita);
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 18;
            });

            maggiorenni.forEach(user => {
                const row = document.createElement('tr');
                const birthDate = new Date(user.data_nascita);
                const age = today.getFullYear() - birthDate.getFullYear();
                row.innerHTML = `
                    <td>${user.cognome}</td>
                    <td>${user.nome}</td>
                    <td>${user.data_nascita}</td>
                    <td>${age}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Funzione per determinare la generazione
        function checkGenerazione() {
            const birthDateInput = document.querySelector('#birthDate').value;
            if (!birthDateInput) {
                alert('Inserisci una data di nascita!');
                return;
            }

            const birthYear = new Date(birthDateInput).getFullYear();

            let generazione = '';
            if (birthYear >= 2013) {
                generazione = 'Generazione Alpha';
            } else if (birthYear >= 1997) {
                generazione = 'Generazione Z';
            } else if (birthYear >= 1981) {
                generazione = 'Millennials';
            } else if (birthYear >= 1965) {
                generazione = 'Generazione X';
            } else if (birthYear >= 1946) {
                generazione = 'Baby Boomers';
            } else if (birthYear >= 1928) {
                generazione = 'Generazione Silenziosa';
            } else {
                generazione = 'Greatest Generation';
            }

            document.querySelector('#generazioneResult').innerText = `Appartieni alla: ${generazione}`;
        }

        // Mostra gli utenti iniziali
        displayUsers(users);
        // Mostra i maggiorenni
        displayMaggiorenni();
    })
    .catch(error => {
        console.error('Errore nel caricare il file JSON:', error);
    });

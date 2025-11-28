fetch('file.json')
    .then(risposta => risposta.json())
    .then(dati => {

        const utenti = dati;  
        function mostraUtenti(listaUtenti) {
            const corpoTabella = document.querySelector('#tabella-utenti tbody');
            corpoTabella.innerHTML = '';

            listaUtenti.forEach(utente => {
                const riga = document.createElement('tr');
                riga.innerHTML = `
                    <td>${utente.cognome}</td>
                    <td>${utente.nome}</td>
                    <td>${utente.data_nascita}</td>
                `;
                corpoTabella.appendChild(riga);
            });
        }
        const campoRicerca = document.querySelector('#campo-ricerca-cognome');

        campoRicerca.addEventListener('input', () => {
            const lettera = campoRicerca.value.toUpperCase();

            const utentiFiltrati = utenti.filter(utente =>
                utente.cognome.toUpperCase().startsWith(lettera)
            );

            mostraUtenti(utentiFiltrati);
        });
        function mostraMaggiorenni() {
            const oggi = new Date();
            const corpoTabella = document.querySelector('#tabella-maggiorenni tbody');
            corpoTabella.innerHTML = '';

            const maggiorenni = utenti.filter(utente => {
                const dataNascita = new Date(utente.data_nascita);
                const eta = oggi.getFullYear() - dataNascita.getFullYear();
                return eta >= 18;
            });

            maggiorenni.forEach(utente => {
                const dataNascita = new Date(utente.data_nascita);
                const eta = oggi.getFullYear() - dataNascita.getFullYear();

                const riga = document.createElement('tr');
                riga.innerHTML = `
                    <td>${utente.cognome}</td>
                    <td>${utente.nome}</td>
                    <td>${utente.data_nascita}</td>
                    <td>${eta}</td>
                `;
                corpoTabella.appendChild(riga);
            });
        }
        function determinaGenerazione() {
            const dataInserita = document.querySelector('#input-data-nascita').value;

            if (!dataInserita) {
                alert('Inserisci una data di nascita!');
                return;
            }

            const anno = new Date(dataInserita).getFullYear();
            let generazione = '';

            if (anno >= 2013) generazione = 'Generazione Alpha';
            else if (anno >= 1997) generazione = 'Generazione Z';
            else if (anno >= 1981) generazione = 'Millennials';
            else if (anno >= 1965) generazione = 'Generazione X';
            else if (anno >= 1946) generazione = 'Baby Boomers';
            else if (anno >= 1928) generazione = 'Generazione Silenziosa';
            else generazione = 'Greatest Generation';

            document.querySelector('#risultato-generazione').innerText =
                `Appartieni alla: ${generazione}`;
        }
        window.determinaGenerazione = determinaGenerazione;
        // MOSTRO SUBITO I DATI ALL'AVVIO
        mostraUtenti(utenti);
        mostraMaggiorenni();
    })
    .catch(errore => console.error('Errore nel caricamento del file JSON:', errore));

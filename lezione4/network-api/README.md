# Soluzione Esercizio: Network Device API

Questa cartella contiene la soluzione di riferimento per l'Esercizio 5 della Lezione 4.

## Struttura
- `server/app.js`: Backend Express con logica CRUD e generatore di configurazione.
- `server/package.json`: Dipendenze del server.

## Come eseguire
1. Entra nella cartella server: `cd server`
2. Installa le dipendenze: `npm install`
3. Avvia il server: `node app.js`
4. Il server sarà attivo su `http://localhost:3005`.

## Endpoint disponibili
- `GET /routers`: Lista di tutti i router.
- `POST /routers`: Crea un nuovo router.
- `PUT /routers/:id`: Aggiorna un router esistente.
- `DELETE /routers/:id`: Elimina un router.
- `GET /routers/:id/config`: Genera la configurazione CLI in formato testo.

## Test con curl
Per testare la generazione della configurazione:
```bash
curl http://localhost:3005/routers/1/config
```

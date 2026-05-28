const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Configurazione CORS per permettere l'invio di cookie (credentials: true)
app.use(cors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// 1. Cookie di Sessione (Default: scompare alla chiusura del browser)
app.get('/set-session-cookie', (req, res) => {
    res.cookie('session_id', 'user_12345', {
        // Nessuna scadenza definita = Session Cookie
    });
    res.send('Cookie di sessione impostato!');
});

// 2. Cookie Persistente (Con scadenza)
app.get('/set-persistent-cookie', (req, res) => {
    res.cookie('user_preference', 'dark-mode', {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 giorni in millisecondi
    });
    res.send('Cookie persistente impostato (7 giorni)!');
});

// 3. Cookie HttpOnly (Sicurezza: non accessibile da JavaScript lato client)
app.get('/set-secure-cookie', (req, res) => {
    res.cookie('auth_token', 'super-secret-token', {
        httpOnly: true, // Impedisce a document.cookie di leggerlo
        // secure: true, // Da usare solo in produzione con HTTPS
        sameSite: 'lax' // Protezione base CSRF
    });
    res.send('Cookie HttpOnly impostato (Sicuro)!');
});

// 4. Leggere i cookie inviati dal browser
app.get('/get-cookies', (req, res) => {
    console.log('Cookie ricevuti:', req.cookies);
    res.json({
        cookies_ricevuti: req.cookies,
        nota: "Se vedi 'auth_token' qui ma non nel browser (document.cookie), allora HttpOnly funziona!"
    });
});

// 5. Cancellare un cookie
app.get('/clear-cookies', (req, res) => {
    res.clearCookie('session_id');
    res.clearCookie('user_preference');
    res.clearCookie('auth_token');
    res.send('Tutti i cookie sono stati rimossi!');
});

app.listen(PORT, () => {
    console.log(`Backend in ascolto su http://localhost:${PORT}`);
});

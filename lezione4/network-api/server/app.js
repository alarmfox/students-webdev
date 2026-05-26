const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Database in memoria per l'esercizio
let routers = [
    {
        id: 1,
        hostname: "Core-Router-01",
        interfaces: [
            { name: "GigabitEthernet0", ip: "192.168.1.1", netmask: "255.255.255.0", description: "LAN" },
            { name: "GigabitEthernet1", ip: "10.0.0.1", netmask: "255.255.255.252", description: "WAN" }
        ]
    }
];

// GET /routers - Lista completa
app.get('/routers', (req, res) => {
    res.json(routers);
});

// POST /routers - Creazione
app.post('/routers', (req, res) => {
    const newRouter = req.body;
    if (!newRouter.hostname || !newRouter.interfaces) {
        return res.status(400).json({ error: "Hostname e interfacce richiesti" });
    }
    newRouter.id = routers.length > 0 ? Math.max(...routers.map(r => r.id)) + 1 : 1;
    routers.push(newRouter);
    res.status(201).json(newRouter);
});

// PUT /routers/:id - Aggiornamento
app.put('/routers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = routers.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: "Router non trovato" });

    routers[index] = { ...routers[index], ...req.body, id }; // Proteggiamo l'ID
    res.json(routers[index]);
});

// DELETE /routers/:id - Cancellazione
app.delete('/routers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    routers = routers.filter(r => r.id !== id);
    res.status(204).send();
});

// GET /routers/:id/config - Generatore Configurazione (text/plain)
app.get('/routers/:id/config', (req, res) => {
    const id = parseInt(req.params.id);
    const router = routers.find(r => r.id === id);
    if (!router) return res.status(404).json({ error: "Router non trovato" });

    let config = `hostname ${router.hostname}\n!\n`;

    router.interfaces.forEach(iface => {
        config += `interface ${iface.name}\n`;
        if (iface.description) config += ` description ${iface.description}\n`;
        config += ` ip address ${iface.ip} ${iface.netmask}\n!\n`;
    });

    res.setHeader('Content-Type', 'text/plain');
    res.send(config);
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Soluzione Network API in ascolto su porta ${PORT}`));

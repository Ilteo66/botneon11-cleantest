import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function(conn, port) {
    const app = express();
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.get('/api/status', (appReq, res) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const startTime = global.timestamp?.start || new Date();
        const ping = Date.now() - startTime; // Approssimativo se non abbiamo un ping reale da baileys subito
        
        res.json({
            uptime: `${hours}h ${minutes}m ${seconds}s`,
            ping: `${ping}ms`,
            messagesReceived: global.db?.data?.users ? Object.values(global.db.data.users).reduce((acc, user) => acc + (user.chatCount || 0), 0) : 0,
            status: conn?.user ? 'Connesso' : 'Disconnesso'
        });
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server dashboard avviato su http://0.0.0.0:${port}`);
    });
}

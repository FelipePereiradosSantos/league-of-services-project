import app from './src/index.js';
import {initDatabase} from './src/.config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try{
        await initDatabase();
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error('Erro ao iniciar o servidor', error);
        process.exit(1);
    }
};

startServer();
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Tipos MIME para diferentes archivos
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`📥 Petición: ${req.method} ${req.url}`);
    
    // Construir la ruta del archivo
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Obtener la extensión del archivo
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Leer el archivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code, 'utf-8');
            }
        } else {
            // Éxito - enviar el archivo
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   🚀 SERVIDOR CRUD INICIADO           ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║   📡 Puerto: ${PORT}                      ║`);
    console.log(`║   🌐 URL: http://localhost:${PORT}       ║`);
    console.log('║   ⏹️  Detener: Ctrl + C                ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('\n✅ Abre http://localhost:8080 en tu navegador\n');
});
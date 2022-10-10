const enviar = require('./mailer.js');
const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


async function indicadores() {
    let { data } = await axios.get('https://mindicador.cl/api/')
    return data;
};


http.createServer((req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query;

    if (req.url.startsWith('/')) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('index.html', 'UTF8', (err, html) => {
            res.write(html);
            res.end();
        });

        if (req.url.startsWith('/mailing')) {
            indicadores().then((indicador) => {
                let id = uuidv4().slice(0, 6);
                const mensajeCompleto = `${contenido} 

                El valor del Dolar es de ${indicador.dolar.valor}<br>
                <br>
                El valor del Euro es de ${indicador.euro.valor}<br>
                <br>
                El valor de la UF es de ${indicador.uf.valor}<br>
                <br>
                El valor de la UTM es de ${indicador.utm.valor}`

                enviar(correos.split(','), asunto, mensajeCompleto);
                fs.writeFile(`./correos/Correo-${id}.txt`, `${mensajeCompleto}`, 'utf8', () => {
                    console.log('Archivo creado con exito');
                });
                res.end();
            });

        };
    };
}).listen(3000, () => console.log('Servidor a la escucha puerto 3000'));
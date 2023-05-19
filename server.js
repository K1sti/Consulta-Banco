const mysql = require('mysql2');
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'planetas'
})

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Banco de dados conectado');
})

app.get('/planetas/:nome', function(req, res){ //req.params pega o um paramtro da URL. os parametros são simbolizados pelo :
    connection.query("SELECT * FROM planetas where nome = '" + req.params['nome'] + "'", function(err, results, fields){
        if (err) {
            console.error('Erro ao executar consulta', err);
            results.serverStatus(500).send('Erro ao executar consulta');
            return;
        }        
        res.json(results); // devolve a resposta encontrada para quem chamou
    });
});

app.get('/planetas', function(req, res){
    connection.query("SELECT * FROM planetas", function(err, results, fields){
        if (err) {
            console.error('Erro ao executar consulta', err);
            results.serverStatus(500).send('Erro ao executar consulta');
            return;
        }        
        res.json(results); // devolve a resposta encontrada para quem chamou
    })
})

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});
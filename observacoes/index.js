const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

//:id é um placeholder
//exemplo: /lembretes/123456/observacoes

const observacoesPorLembretes = {}

app.put('lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const observacoesDoLembrete = observacoesPorLembretes[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembretesId[req.params.id] = observacoesDoLembrete;
    await axios.post("http:// localhost:10000/eventos", {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    })
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembretes[req.params.id] || []);
});

app.listen(5000, () => {
    console.log('Observacoes. Porta 5000');
});
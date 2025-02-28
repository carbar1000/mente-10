const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
    const dados = req.body;

    // Aqui você pode processar os dados conforme necessário
    console.log('Dados recebidos:', dados);

    // Retornar uma resposta JSON
    res.json({ success: true, message: 'Dados recebidos com sucesso!' });

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const tips = [];

// Ruta para obtener todas las propinas
router.get('/tips', (req, res) => {
  res.json(tips);
});

router.post('/tips', (req, res) => {
  const { fecha, isSplit, total, num_personas, pago_por_persona, payment_method } = req.body;
  const newTip = {
      id: tips.length + 1,
      fecha: fecha,
      isSplit: isSplit,
      total: total,
      num_personas: num_personas,
      pago_por_persona: pago_por_persona,
      payment_method: payment_method,
  }
  tips.push(newTip);
  res.json(newTip);
});


module.exports = router;

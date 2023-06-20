const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/veterinaria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const turnoSchema = new mongoose.Schema({
  fecha: Date,
  cliente: String,
});
const Turno = mongoose.model('Turno', turnoSchema);

app.get('/turnos', (req, res) => {
  Turno.find({}, (err, turnos) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(turnos);
    }
  });
});

app.post('/turnos', (req, res) => {
  const nuevoTurno = new Turno(req.body);
  nuevoTurno.save((err, turno) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(turno);
    }
  });
});

app.put('/turnos/:id', (req, res) => {
  const id = req.params.id;
  Turno.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, turno) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(turno);
      }
    }
  );
});

app.delete('/turnos/:id', (req, res) => {
  const id = req.params.id;
  Turno.findByIdAndRemove(id, (err, turno) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(turno);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const tasks = [];

// Ruta para obtener todas las tareas
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Ruta para obtener una tarea por ID
router.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.json(task);
  }
});

// Ruta para actualizar una tarea por ID
router.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const existingTaskIndex = tasks.findIndex((t) => t.id === taskId);
  if (existingTaskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    tasks[existingTaskIndex] = { ...tasks[existingTaskIndex], ...updatedTask };
    res.json(tasks[existingTaskIndex]);
  }
});

// Ruta para eliminar una tarea por ID
router.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const existingTaskIndex = tasks.findIndex((t) => t.id === taskId);
  if (existingTaskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    const deletedTask = tasks.splice(existingTaskIndex, 1);
    res.json(deletedTask[0]);
  }
});

module.exports = router;

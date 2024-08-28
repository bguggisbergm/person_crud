const express = require('express'); // Importa Express para manejar las rutas.
const router = express.Router(); // Crea un enrutador de Express.
const Person = require('../models/Person'); // Importa el modelo de Persona.

// GET /persons: Listar todas las personas
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find(); // Busca todas las personas en la base de datos.
        res.json(persons); // Responde con un JSON que contiene la lista de personas.
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responde con un error 500 si ocurre algún problema.
    }
});

// GET /persons/:id: Obtener una persona específica por ID
router.get('/:id', getPerson, (req, res) => {
    res.json(res.person); // Responde con el objeto persona encontrado.
});

// POST /persons: Crear una nueva persona
router.post('/', async (req, res) => {
    const person = new Person(req.body); // Crea una nueva instancia del modelo Person con los datos recibidos en el cuerpo de la petición.
    try {
        const newPerson = await person.save(); // Intenta guardar la nueva persona en la base de datos.
        res.status(201).json(newPerson); // Responde con un código 201 (creado) y el objeto de la persona creada.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responde con un error 400 si ocurre algún problema en la validación o guardado.
    }
});

// PUT /persons/:id: Actualizar una persona existente
router.put('/:id', getPerson, async (req, res) => {
    Object.assign(res.person, req.body); // Asigna las propiedades del cuerpo de la petición al objeto persona encontrado.
    try {
        const updatedPerson = await res.person.save(); // Guarda los cambios en la base de datos.
        res.json(updatedPerson); // Responde con el objeto persona actualizado.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responde con un error 400 si ocurre algún problema en la validación o guardado.
    }
});

// DELETE /persons/:id: Eliminar una persona
router.delete('/:id', getPerson, async (req, res) => {
    try {
        await res.person.deleteOne(); // Intenta eliminar la persona de la base de datos.
        res.json({ message: 'Persona eliminada' }); // Responde con un mensaje de éxito.
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responde con un error 500 si ocurre algún problema.
    }
});

// GET /persons/:id/works: Listar todos los trabajos de una persona
router.get('/:id/works', getPerson, (req, res) => {
    res.json(res.person.works); // Responde con un JSON que contiene la lista de trabajos de la persona.
});

// POST /persons/:id/works: Agregar un nuevo trabajo a una persona
router.post('/:id/works', getPerson, async (req, res) => {
    res.person.works.push(req.body); // Añade un nuevo trabajo al array de trabajos de la persona.
    try {
        await res.person.save(); // Guarda los cambios en la base de datos.
        res.status(201).json(res.person.works); // Responde con un código 201 (creado) y la lista actualizada de trabajos.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responde con un error 400 si ocurre algún problema en la validación o guardado.
    }
});

// PUT /persons/:id/works/:workId: Actualizar un trabajo específico
router.put('/:id/works/:workId', getPerson, async (req, res) => {
    const work = res.person.works.id(req.params.workId); // Encuentra el trabajo específico en el array de trabajos.
    if (!work) return res.status(404).json({ message: 'Trabajo no encontrado' }); // Si no se encuentra el trabajo, responde con un error 404.

    Object.assign(work, req.body); // Asigna las propiedades del cuerpo de la petición al objeto trabajo encontrado.
    try {
        await res.person.save(); // Guarda los cambios en la base de datos.
        res.json(work); // Responde con el objeto trabajo actualizado.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responde con un error 400 si ocurre algún problema en la validación o guardado.
    }
});

// DELETE /persons/:id/works/:workId: Eliminar un trabajo específico
router.delete('/:id/works/:workId', getPerson, async (req, res) => {
    const work = res.person.works.id(req.params.workId); // Encuentra el trabajo específico en el array de trabajos.
    if (!work) return res.status(404).json({ message: 'Trabajo no encontrado' }); // Si no se encuentra el trabajo, responde con un error 404.

    work.remove(); // Elimina el trabajo del array de trabajos de la persona.
    try {
        await res.person.save(); // Guarda los cambios en la base de datos.
        res.json({ message: 'Trabajo eliminado' }); // Responde con un mensaje de éxito.
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responde con un error 500 si ocurre algún problema.
    }
});

// Middleware para obtener una persona por ID
async function getPerson(req, res, next) {
    let person;
    try {
        person = await Person.findById(req.params.id); // Busca la persona en la base de datos usando el ID de la URL.
        if (!person) return res.status(404).json({ message: 'Persona no encontrada' }); // Si no se encuentra la persona, responde con un error 404.
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Responde con un error 500 si ocurre algún problema.
    }
    res.person = person; // Asigna la persona encontrada al objeto res para que pueda ser usada en las siguientes funciones.
    next(); // Llama a la siguiente función en la cadena de middleware.
}

module.exports = router; // Exporta el enrutador para que pueda ser usado en el servidor principal.

const mongoose = require('mongoose'); // Importa Mongoose para definir los esquemas y modelos.

// Define un esquema para los trabajos asociados a una persona.
const WorkSchema = new mongoose.Schema({
    company: { 
        type: String, // El nombre de la empresa debe ser una cadena.
        required: [true, 'El nombre de la empresa es obligatorio.'], // Es obligatorio y tiene un mensaje de error personalizado.
        minlength: [2, 'El nombre de la empresa debe tener al menos 2 caracteres.'] // Debe tener al menos 2 caracteres.
    },
    initContract: { 
        type: Date, // La fecha de inicio del contrato debe ser un valor de tipo fecha.
        required: [true, 'La fecha de inicio del contrato es obligatoria.'] // Es obligatorio y tiene un mensaje de error personalizado.
    },
    finishContract: { 
        type: Date, // La fecha de finalización del contrato debe ser un valor de tipo fecha.
        required: [true, 'La fecha de finalización del contrato es obligatoria.'], // Es obligatorio y tiene un mensaje de error personalizado.
        validate: {
            validator: function(value) {
                // Valida que la fecha de finalización sea posterior a la de inicio.
                return value > this.initContract;
            },
            message: 'La fecha de finalización debe ser posterior a la fecha de inicio.' // Mensaje de error personalizado si la validación falla.
        }
    },
    position: { 
        type: String, // El cargo debe ser una cadena.
        required: [true, 'El cargo es obligatorio.'], // Es obligatorio y tiene un mensaje de error personalizado.
        minlength: [2, 'El cargo debe tener al menos 2 caracteres.'] // Debe tener al menos 2 caracteres.
    },
});

// Define un esquema para las personas.
const PersonSchema = new mongoose.Schema({
    name: { 
        type: String, // El nombre debe ser una cadena.
        required: [true, 'El nombre es obligatorio.'], // Es obligatorio y tiene un mensaje de error personalizado.
        minlength: [2, 'El nombre debe tener al menos 2 caracteres.'] // Debe tener al menos 2 caracteres.
    },
    lastName: { 
        type: String, // El apellido debe ser una cadena.
        required: [true, 'El apellido es obligatorio.'], // Es obligatorio y tiene un mensaje de error personalizado.
        minlength: [2, 'El apellido debe tener al menos 2 caracteres.'] // Debe tener al menos 2 caracteres.
    },
    works: [WorkSchema], // Cada persona puede tener múltiples trabajos, representados por un array de objetos WorkSchema.
    nationality: { 
        type: String, // La nacionalidad debe ser una cadena.
        required: [true, 'La nacionalidad es obligatoria.'], // Es obligatorio y tiene un mensaje de error personalizado.
        minlength: [2, 'La nacionalidad debe tener al menos 2 caracteres.'] // Debe tener al menos 2 caracteres.
    },
    year: { 
        type: Number, // El año debe ser un número.
        required: [true, 'El año es obligatorio.'], // Es obligatorio y tiene un mensaje de error personalizado.
        min: [1900, 'El año no puede ser menor a 1900.'], // No puede ser menor que 1900.
        max: [new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}.`] // No puede ser mayor que el año actual.
    },
});

// Crea un modelo Person basado en el esquema definido.
const Person = mongoose.model('Person', PersonSchema);

// Exporta el modelo para que pueda ser usado en otras partes de la aplicación.
module.exports = Person;

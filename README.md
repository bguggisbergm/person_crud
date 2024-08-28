Person CRUD API
Este proyecto es una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre perfiles de personas y su historial laboral. La API está construida con Node.js, Express.js y MongoDB.

1 - Requisitos previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina local:

Node.js (versión 14 o superior)
https://nodejs.org/en

MongoDB (puede ser una instancia local o MongoDB Atlas)
https://nodejs.org/en

Postman para probar la API
https://www.postman.com

2 - Clonar el repositorio
git clone https://github.com/bguggisbergm/person-crud.git
cd person-crud

###Instalar dependencias
npm install


3 - Configurar variables de entorno - En caso de probar en tu propia DB
Dentro de la carpeta raíz del proyecto, crea un archivo .env. Este archivo debe contener la URL de conexión a MongoDB y otras variables necesarias. Un ejemplo de cómo debe lucir el archivo .env es el siguiente:

MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_password>@personasdb.v39rd.mongodb.net/?retryWrites=true&w=majority&appName=personasdb
PORT=3000

4 - Iniciar el servidor
node server.js

###Mensaje de Éxito.
Servidor corriendo en el puerto 3000
Conectado a MongoDB Atlas

5 - Colecciones de Postman
Para facilitar las pruebas, he exportado las colecciones de Postman que contienen todas las rutas de la API y ejemplos de cómo realizar cada operación CRUD.

Importar la colección de Postman
Abre Postman.
Haz clic en Import en la esquina superior izquierda.
Selecciona la opción Upload Files.
Navega hasta la carpeta del proyecto y selecciona el archivo API_Crud_Person.postman_collection.json.
Postman importará automáticamente la colección y podrás ver todos los endpoints listos para ser usados.

6 - Realizar pruebas

a. Listar Personas:

Método: GET
URL: http://localhost:3000/persons

b. Crear una Persona:

Método: POST
URL: http://localhost:3000/persons
Body (JSON):
{
  "name": "Juan",
  "lastName": "Perez",
  "works": [],
  "nationality": "Chilena",
  "year": 1990
}

c. obtener una Persona por ID:

Método: GET
URL: http://localhost:3000/persons/:id

d. Actualizar una Persona por ID:

Método: PUT
URL: http://localhost:3000/persons/:id
Body (JSON):
{
  "name": "Juan",
  "lastName": "Perez",
  "nationality": "Argentino"
}

e. Eliminar una Persona por ID:

Método: DELETE
URL: http://localhost:3000/persons/:id

f. Listar Trabajos de una Persona:

Método: GET
URL: http://localhost:3000/persons/:id/works

g. Agregar un Trabajo a una Persona:

Método: POST
URL: http://localhost:3000/persons/:id/works
Body (JSON):
{
  "company": "Empresa X",
  "initContract": "2022-01-01",
  "finishContract": "2022-12-31",
  "position": "Developer"

h. Actualizar un Trabajo por ID:

Método: PUT
URL: http://localhost:3000/persons/:id/works/:workId
Body (JSON):}
{
  "company": "Empresa X"
}

i. Eliminar un Trabajo por ID:

Método: DELETE
URL: http://localhost:3000/persons/:id/works/:workId

7. Validaciones
Esta API incluye validaciones para asegurar que los datos enviados sean correctos. Si algún dato es inválido, recibirás un mensaje de error en el formato JSON indicando qué salió mal.

8. NOTAS
Con este README.md, debieses ser capaz de configurar el ambiente local, importar la colección de Postman, y realizar todas las pruebas necesarias para interactuar con la API

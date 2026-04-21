/*
    index.js
    Author: German Valencia
    Actualización: German Valencia, John Castañeda,
    Actualización: Gerard Valencia, 20251101
*/
require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const sequelize = require("./database/connection");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// === CONFIGURACIÓN CORS EXPLÍCITA Y ROBUSTA ===
// ----------------------------------------------
// Lista de orígenes permitidos. Debe incluir la URL de tu frontend (ej: http://localhost:4200)
const allowedOrigins = [
  process.env.ANGULAR_URL, // El origen principal de tu frontend
  "http://localhost:4200", // Añadir localhost:4200 de forma explícita si ANGULAR_URL no está seteado
].filter(Boolean); // Filtra cualquier valor nulo o vacío

const corsOptions = {
  // Permite cualquier origen si process.env.ANGULAR_URL es "*" o no está definido y quieres ser permisivo.
  // Si ANGULAR_URL está definido, usará la validación de la lista.
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como Postman o peticiones del mismo servidor)
    if (!origin) return callback(null, true);

    // Permitir el origen si está en la lista de permitidos
    if (allowedOrigins.includes(origin) || process.env.ANGULAR_URL === "*") {
      return callback(null, true);
    } else {
      const msg = `El origen CORS: ${origin} no tiene permiso.`;
      return callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Permite cookies, headers de autorización, etc.
};

// Configuración CORS para Sockets (Ya estaba bien)
const io = new Server(server, {
  cors: {
    origin: process.env.ANGULAR_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

module.exports = { io };

// Middleware CORS para Express (APLICAR ANTES DE LAS RUTAS)
app.use(cors(corsOptions));
// ----------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// PLATAFORMA
app.use("/api/actividades", require("./routes/actividades"));
app.use("/api/actividades-roles", require("./routes/actividades-roles"));
app.use("/api/usuarios-roles", require("./routes/usuarios-roles"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));
app.use("/api/sliders", require("./routes/sliders-inicio"));
app.use("/api/colores", require("./routes/colores-settings"));
app.use("/api/tipos-valor", require("./routes/tipos-valor"));
app.use("/api/valores-unitarios", require("./routes/valores-unitarios"));
app.use("/api/db-setup", require("./routes/db-setup"));
app.use("/api/biblioteca", require("./routes/biblioteca"));
app.use("/api/galeria", require("./routes/galeria"));
app.use("/api/tiposGaleria", require("./routes/tiposGaleria"));
app.use("/api/formatosGaleria", require("./routes/formatosGaleria"));
app.use('/api/tipos-scripts', require('./routes/tiposScripts'));
app.use('/api/scripts', require('./routes/scripts'));
// APLICACIONES
app.use("/api/aplicaciones", require("./routes/aplicaciones"));
app.use("/api/versiones", require("./routes/versiones-ap"));
app.use("/api/paquetes", require("./routes/paquetes"));
app.use("/api/items-paquete", require("./routes/items-paquete"));
app.use("/api/modulos", require("./routes/modulos-ap"));
app.use("/api/suites", require("./routes/suites-ap"));
// CONEXIONES BD
app.use("/api/conexiones-bd", require("./routes/conexiones-bd"));
app.use("/api/servidores", require("./routes/servidores"));
// SUSCRIPTORES
app.use("/api/suscriptores", require("./routes/suscriptores"));
app.use("/api/empresas-sc", require("./routes/empresas-sc"));
app.use("/api/usuarios-sc", require("./routes/usuarios-sc"));
app.use("/api/usuarios-empresas-sc", require("./routes/usuarios-empresas-sc"));
app.use("/api/paquetes-sc", require("./routes/paquetes-sc"));
// TICKETS
app.use("/api/tipos-estados", require("./routes/tipos-estados"));
app.use("/api/estados", require("./routes/estados"));
app.use("/api/tickets-ap", require("./routes/tickets-ap"));
app.use("/api/requerimientos-tk", require("./routes/requerimientos"));
app.use("/api/seguimientos-tk", require("./routes/seguimientos"));
app.use("/api/clases-ticket", require("./routes/clases-ticket"));
// SITIOS
app.use("/api/sitios-ap", require("./routes/sitios-ap"));
app.use("/api/contenidos-el", require("./routes/contenidos-el"));
app.use("/api/enlaces-st", require("./routes/enlaces-st"));
// IDIOMAS
app.use("/api/idiomas", require("./routes/idiomas"));
app.use("/api/textos-id", require("./routes/textos-id"));
// LOGS
app.use("/api/tios-logs", require("./routes/tipos-logs"));
app.use("/api/logs-actividades", require("./routes/logs-actividades"));
app.use("/api/logs-actualizaciones", require("./routes/logs-actualizaciones"));
app.use("/api/logs-transacciones", require("./routes/logs-transacciones"));
// app.use('/api/pla-adjuntos', require('./routes/pla_adjuntos') );

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// =======================================================
// === INICIALIZACIÓN DE SOCKETS Y BASE DE DATOS ===
// =======================================================
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con SQL Server.");
    return sequelize.sync();
  })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        "Servidor HTTP y Sockets escuchando en puerto " + process.env.PORT,
      );
    });
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

// npx sequelize-cli model:generate --name User --attributes name:string,email:string
// npx sequelize-cli model:generate --name Post --attributes title:string,content:text,userId:integer

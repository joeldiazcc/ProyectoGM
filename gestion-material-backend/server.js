import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { verifyToken, SECRET_KEY } from './auth.js';

const app = express();
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
}));

// Conexión con la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'foc2026',
    database: 'gestion_material'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Ruta para obtener todos los empleados
app.get('/api/empleados', (req, res) => {
  const query = `
    SELECT 
      e.id_empleado,
      e.nombre_empleado,
      e.apellido1_empleado,
      e.apellido2_empleado,
      e.correo,
      e.estado,
      e.fecha_alta,
      e.fecha_baja
    FROM 
      empleados e
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener empleados:', err);
      res.status(500).send('Error al obtener empleados');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener todos los materiales
app.get('/api/materiales', (req, res) => {
  const query = `
    SELECT 
      m.id_material,
      m.nombre_material,
      m.tipo,
      m.estado,
      m.caracteristicas,
      m.fecha_asignacion,
      m.empleado_asignado,
      e.nombre_empleado,
      e.apellido1_empleado,
      e.apellido2_empleado
    FROM 
      materiales m 
    LEFT JOIN 
      empleados e 
    ON 
      m.empleado_asignado = e.id_empleado
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener materiales:', err);
      res.status(500).send('Error al obtener materiales');
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Error al registrar usuario');
      return;
    }
    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).send('Error al iniciar sesión');
            return;
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 horas
        res.status(200).send({ auth: true, token });
    });
});

// Ruta para obtener información del usuario autenticado
app.get('/api/me', verifyToken, (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [req.userId], (err, results) => {
        if (err) {
            console.error('Error al obtener información del usuario:', err);
            res.status(500).send('Error al obtener información del usuario');
            return;
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send(results[0]);
    });
});

// Ruta para agregar un nuevo empleado
app.post('/api/empleados', verifyToken, (req, res) => {
    const { nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo } = req.body;
    const query = 'INSERT INTO empleados (nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo], (err, results) => {
        if (err) {
            console.error('Error al agregar empleado:', err);
            res.status(500).send('Error al agregar empleado');
            return;
        }
        res.json({ id: results.insertId, nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo });
    });
});

// Ruta para agregar un nuevo material
app.post('/api/materiales', verifyToken, (req, res) => {
    const { nombre_material, tipo, estado, empleado_asignado, caracteristicas, fecha_asignacion, anterior_asignado } = req.body;
    const query = 'INSERT INTO materiales (nombre_material, tipo, estado, empleado_asignado, caracteristicas, fecha_asignacion, anterior_asignado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre_material, tipo, estado, empleado_asignado, caracteristicas, fecha_asignacion, anterior_asignado], (err, results) => {
        if (err) {
            console.error('Error al agregar material:', err);
            res.status(500).send('Error al agregar material');
            return;
        }
        res.json({ id: results.insertId, nombre_material, tipo, estado, empleado_asignado, caracteristicas, fecha_asignacion, anterior_asignado });
    });
});

// Ruta para asignar material a un empleado
app.post('/api/asignar-material', verifyToken, (req, res) => {
    const { empleado_id, material_id, fecha_asignacion } = req.body;

    // Verificar que el material esté en stock
    const checkMaterialQuery = 'SELECT estado FROM materiales WHERE id_material = ?';
    db.query(checkMaterialQuery, [material_id], (err, results) => {
        if (err) {
            console.error('Error al verificar material:', err);
            res.status(500).send('Error al verificar material');
            return;
        }

        if (results.length === 0 || results[0].estado !== 'En stock') {
            res.status(400).send('El material no está en stock o no existe');
            return;
        }

        // Obtener el material actual
        const getMaterialQuery = 'SELECT empleado_asignado FROM materiales WHERE id_material = ?';
        db.query(getMaterialQuery, [material_id], (err, results) => {
            if (err) {
                console.error('Error al obtener material:', err);
                res.status(500).send('Error al obtener material');
                return;
            }

            const material = results[0];
            const anterior_asignado = material.empleado_asignado;

            // Actualizar el material con el empleado asignado, la fecha de asignación y el anterior asignado
            const updateMaterialQuery = `
                UPDATE materiales 
                SET empleado_asignado = ?, fecha_asignacion = ?, estado = 'Asignado', anterior_asignado = ?
                WHERE id_material = ?
            `;
            db.query(updateMaterialQuery, [empleado_id, fecha_asignacion, anterior_asignado, material_id], (err, results) => {
                if (err) {
                    console.error('Error al asignar material:', err);
                    res.status(500).send('Error al asignar material');
                    return;
                }
                res.json({ message: 'Material asignado correctamente' });
            });
        });
    });
});

// Ruta para eliminar un empleado
app.delete('/api/empleados/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM empleados WHERE id_empleado = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar empleado:', err);
            res.status(500).send('Error al eliminar empleado');
            return;
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    });
});

// Ruta para eliminar un material
app.delete('/api/materiales/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM materiales WHERE id_material = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar material:', err);
            res.status(500).send('Error al eliminar material');
            return;
        }
        res.json({ message: 'Material eliminado correctamente' });
    });
});

// Ruta para obtener materiales agrupados
app.get('/api/materiales-agrupados', (req, res) => {
  const query = `
    SELECT 
      nombre_material, 
      tipo, 
      caracteristicas, 
      estado, 
      COUNT(*) as stock 
    FROM 
      materiales 
    GROUP BY 
      nombre_material, tipo, caracteristicas, estado
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener materiales agrupados:', err);
      res.status(500).send('Error al obtener materiales agrupados');
      return;
    }
    res.json(results);
  });
});

// Ruta para dar de baja a un empleado
app.put('/api/empleados/:id/baja', verifyToken, (req, res) => {
  const { id } = req.params;
  const fecha_baja = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD

  // Primero, obtener todos los materiales asignados al empleado
  const obtenerMaterialesQuery = `
    SELECT id_material 
    FROM materiales 
    WHERE empleado_asignado = ?
  `;
  db.query(obtenerMaterialesQuery, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener materiales asignados:', err);
      res.status(500).send('Error al obtener materiales asignados');
      return;
    }

    if (results.length === 0) {
      // Si no hay materiales asignados, proceder a dar de baja al empleado
      return darBajaEmpleado();
    }

    const materiales = results;

    // Actualizar el estado de todos los materiales asignados
    const actualizarMaterialesQuery = `
      UPDATE materiales 
      SET empleado_asignado = NULL, estado = 'En stock', fecha_asignacion = NULL, anterior_asignado = ?
      WHERE id_material IN (?)
    `;
    const materialIds = materiales.map(material => material.id_material);
    db.query(actualizarMaterialesQuery, [id, materialIds], (err, results) => {
      if (err) {
        console.error('Error al actualizar materiales:', err);
        res.status(500).send('Error al actualizar materiales');
        return;
      }

      // Finalmente, actualizar el estado del empleado a 'Baja' y establecer la fecha de baja
      darBajaEmpleado();
    });
  });

  function darBajaEmpleado() {
    const darBajaEmpleadoQuery = `
      UPDATE empleados 
      SET estado = 'Baja', fecha_baja = ?
      WHERE id_empleado = ?
    `;
    db.query(darBajaEmpleadoQuery, [fecha_baja, id], (err, results) => {
      if (err) {
        console.error('Error al dar de baja al empleado:', err);
        res.status(500).send('Error al dar de baja al empleado');
        return;
      }
      res.json({ message: 'Empleado dado de baja correctamente' });
    });
  }
});

// Ruta para quitar la asignación de un material
app.put('/api/materiales/:id/quitar-asignacion', verifyToken, (req, res) => {
  const { id } = req.params;
  const { empleadoId } = req.body;
  const query = `
    UPDATE materiales 
    SET empleado_asignado = NULL, estado = 'En stock', fecha_asignacion = NULL, anterior_asignado = ?
    WHERE id_material = ?
  `;
  db.query(query, [empleadoId, id], (err, results) => {
    if (err) {
      console.error('Error al quitar asignación del material:', err);
      res.status(500).send('Error al quitar asignación del material');
      return;
    }
    res.json({ message: 'Asignación quitada correctamente' });
  });
});

// Ruta para eliminar el último material agregado
app.delete('/api/materiales/eliminar-ultimo', verifyToken, (req, res) => {
  const { nombre_material, tipo } = req.query;
  const query = `
    DELETE FROM materiales 
    WHERE id_material = (
      SELECT id_material 
      FROM materiales 
      WHERE nombre_material = ? AND tipo = ? AND estado = "En stock"
      ORDER BY id_material DESC 
      LIMIT 1
    )
  `;
  db.query(query, [nombre_material, tipo], (err, results) => {
    if (err) {
      console.error('Error al eliminar el último material agregado:', err);
      res.status(500).send('Error al eliminar el último material agregado');
      return;
    }
    res.json({ message: 'Último material agregado eliminado correctamente' });
  });
});

// Ruta para actualizar un empleado
app.put('/api/empleados/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo } = req.body;
  const query = `
    UPDATE empleados 
    SET nombre_empleado = ?, apellido1_empleado = ?, apellido2_empleado = ?, estado = ?, fecha_alta = ?, fecha_baja = ?, correo = ?
    WHERE id_empleado = ?
  `;
  db.query(query, [nombre_empleado, apellido1_empleado, apellido2_empleado, estado, fecha_alta, fecha_baja, correo, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar empleado:', err);
      res.status(500).send('Error al actualizar empleado');
      return;
    }
    res.json({ message: 'Empleado actualizado correctamente' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
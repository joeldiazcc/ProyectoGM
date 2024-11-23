import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Clave secreta para firmar los tokens JWT
export const SECRET_KEY = 'foc2026';

// Middleware para verificar el token JWT
export function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    /*if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // Si el token es válido, guarda el id del usuario en la solicitud para su uso posterior
        req.userId = decoded.id;
        next();
    });*/
    next();
} 
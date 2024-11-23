# 📦 Gestión de Material

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.6, utilizando Node.js y MySQL.

## 🚀 Descripción del Proyecto

El proyecto ha sido creado para gestionar el material de una empresa de manera dinámica y segura, trabajando sobre una base de datos MySQL.

## 🚀 Servidor de Desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a [`http://localhost:4200/`](gestion_material/src/app/services/material.service.ts). La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## 🛠️ Generación de Código

Ejecuta [`ng generate component component-name`](gestion_material/src/app/agregar-empleado/agregar-empleado.component.spec.ts) para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 🏗️ Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## 🧪 Ejecución de Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## 🧩 Ejecución de Pruebas de Extremo a Extremo

Ejecuta `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, primero necesitas agregar un paquete que implemente capacidades de pruebas de extremo a extremo.

## 📚 Ayuda Adicional

Para obtener más ayuda sobre Angular CLI usa `ng help` o visita la [Referencia de Comandos y Descripción General de Angular CLI](https://angular.dev/tools/cli).

## 📂 Estructura del Proyecto

gestion_material/
├── .angular/
│   └── cache/
│       └── 18.2.6/
├── .editorconfig
├── .gitignore
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── angular.json
├── package.json
├── public/
├── README.md
├── server.ts
├── src/
│   ├── app/
│   │   ├── agregar-empleado/
│   │   ├── agregar-material/
│   │   ├── app-routing.module.ts
│   │   ├── ...
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   └── styles.css
├── tests.spec.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
gestion-material-backend/
├── auth.js
├── package.json
├── server.js
└── test.js
package.json
query
README.md

## 🌟 Características

- **Gestión de Empleados**: Agrega, visualiza y administra empleados.
- **Gestión de Materiales**: Agrega, visualiza y administra materiales.
- **Asignación de Materiales**: Asigna materiales a empleados.
- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Pruebas**: Pruebas unitarias y de extremo a extremo.

## 📝 Descripción de las Tablas de la Base de Datos

### 📋 Tabla [`empleados`](gestion_material/src/app/asignar-material/asignar-material.component.ts)

| Columna            | Tipo                | Nulo | Clave | Predeterminado | Extra           |
|--------------------|---------------------|------|-------|----------------|-----------------|
| id_empleado        | int(11)             | NO   | PRI   | NULL           | auto_increment  |
| nombre_empleado    | varchar(255)        | NO   |       | NULL           |                 |
| apellido1_empleado | varchar(255)        | NO   |       | NULL           |                 |
| apellido2_empleado | varchar(255)        | YES  |       | NULL           |                 |
| estado             | enum('Alta','Baja') | NO   |       | Alta           |                 |
| fecha_alta         | date                | NO   |       | NULL           |                 |
| fecha_baja         | date                | YES  |       | NULL           |                 |
| correo             | varchar(255)        | NO   | UNI   | NULL           |                 |

### 📋 Tabla [`materiales`](gestion_material/src/app/asignar-material/asignar-material.component.ts)

| Columna            | Tipo                                                                 | Nulo | Clave | Predeterminado | Extra           |
|--------------------|----------------------------------------------------------------------|------|-------|----------------|-----------------|
| id_material        | int(11)                                                              | NO   | PRI   | NULL           | auto_increment  |
| nombre_material    | varchar(255)                                                         | NO   |       | NULL           |                 |
| tipo               | enum('Ratón','Teclado','Auriculares','Movil','iPad','Tablet','Portatil','Hub') | NO   |       | NULL           |                 |
| estado             | enum('En stock','Asignado','En reparacion')                          | NO   |       | En stock       |                 |
| empleado_asignado  | int(11)                                                              | YES  | MUL   | NULL           |                 |
| caracteristicas    | text                                                                 | YES  |       | NULL           |                 |
| fecha_asignacion   | date                                                                 | YES  |       | NULL           |                 |
| anterior_asignado  | int(11)                                                              | YES  | MUL   | NULL           |                 |

### 📋 Tabla `users`

| Columna  | Tipo         | Nulo | Clave | Predeterminado | Extra           |
|----------|--------------|------|-------|----------------|-----------------|
| id       | int(11)      | NO   | PRI   | NULL           | auto_increment  |
| username | varchar(255) | NO   |       | NULL           |                 |
| password | varchar(255) | NO   |       | NULL           |                 |

## 📜 Licencia

Este proyecto está bajo la licencia ISC.

## ✨ Autor

Desarrollado por Joel Felipe Díaz Carissimi.

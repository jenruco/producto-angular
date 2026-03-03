# Productos App - Angular 21

Frontend para la gestión de productos, consume la API REST desarrollada en Spring Boot.

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

> Asegurarse de que la API de Spring Boot esté corriendo antes de iniciar el frontend.

---

## Configuración de la API

En el archivo de entorno `src/environments/environment.ts`, configurar la URL base de la API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## Lo que se implementó

### Autenticación
- Login con email y contraseña mediante `ngModel`
- El token JWT retornado por la API se almacena en `localStorage`
- Redirección automática al módulo de productos al iniciar sesión
- Cierre de sesión que limpia el storage y redirige al login

### Gestión de Productos
- Listado de productos en tabla con columnas: ID, Nombre, Precio, Stock, Estado y Fecha de creación
- Botón **Nuevo Producto** que abre un modal para crear
- Botón **Editar** por fila que abre el mismo modal precargado con los datos del producto
- Botón **Eliminar** por fila con confirmación mediante SweetAlert2
- Indicador visual de estado activo/inactivo con badges de color

### Modal de Producto
- Formulario reactivo (`ReactiveFormsModule`) con validaciones requeridas
- Campos: Nombre, Precio (mínimo 1), Stock (mínimo 1)
- El mismo modal funciona para crear y editar según el modo recibido
- Notificaciones de éxito con **SweetAlert2**

---

## Librerías utilizadas

| Librería | Uso |
|----------|-----|
| Angular Material | Componentes de UI (modal, inputs, botones) |
| Bootstrap | Estilos y layout |
| SweetAlert2 | Alertas de confirmación y notificaciones |

---

## Estructura del Proyecto

```
src/
└── app/
    ├── login/              # Componente de login y servicio
    ├── producto/           # Componente principal de productos
    ├── modal-producto/     # Modal para crear y editar productos
    ├── service/            # ProductoService (HttpClient)
    └── dto/                # Interfaces de request y response
```

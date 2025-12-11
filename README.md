# TaskBoard (To-Do List)

Bienvenido a **TaskBoard**, una aplicación de gestión de tareas simple y eficiente construida con **Angular 21** y estilizada con **Bootstrap 5**. Esta aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas (CRUD), persistiendo los datos directamente en el navegador mediante `LocalStorage`.

## 🚀 Características

*   **Gestión de Tareas (CRUD)**:
    *   **Crear**: Añade nuevas tareas con un título y una descripción.
    *   **Leer**: Visualiza todas tus tareas en una tabla clara y organizada.
    *   **Actualizar**: Edita la información de cualquier tarea existente.
    *   **Borrar**: Elimina tareas que ya no necesites.
*   **Persistencia de Datos**:
    *   Uso de `LocalStorage` para guardar las tareas. Tus datos permanecen en el navegador incluso si recargas la página o cierras la sesión.
*   **Interfaz Dinámica**:
    *   Formularios contextuales que cambian según si estás creando o editando una tarea.
    *   Diseño responsivo y limpio gracias a Bootstrap.
*   **Generación Inteligente de IDs**:
    *   Sistema robusto para asegurar que cada tarea tenga un identificador único, evitando duplicados.

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza tecnologías modernas de desarrollo web:

*   **[Angular 21](https://angular.io/)**: Framework principal para la construcción de la aplicación SPA (Single Page Application).
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático, mejorando la calidad y mantenibilidad del código.
*   **[Bootstrap 5](https://getbootstrap.com/)**: Framework CSS para el diseño de la interfaz de usuario, grid system y componentes responsivos.
*   **HTML5 & CSS3**: Estructura y estilos base.

## 📂 Estructura del Proyecto

Los archivos principales del código fuente se encuentran en `src/app/`:

*   **`app.ts`**: Lógica principal del componente, gestión del estado de la aplicación, métodos CRUD y manejo del `LocalStorage`.
*   **`app.html`**: Plantilla HTML que define la estructura visual, formularios y tablas.
*   **`models/task.ts`**: Definición de la interfaz `Task` que modela la estructura de datos de una tarea.

## 🔧 Instalación y Ejecución

Sigue estos pasos para probar el proyecto en tu entorno local:

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).

### Pasos
1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    # O navega a la carpeta del proyecto
    cd taskboard
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    ng serve
    ```

4.  **Abrir en el navegador**:
    Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en el código.

## 🧪 Tests

Para ejecutar las pruebas unitarias:

```bash
ng test
```

## 📄 Licencia

Este proyecto es de uso libre con fines educativos y de aprendizaje.

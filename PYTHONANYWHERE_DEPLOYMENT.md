# 🚀 Guía de Deployment en PythonAnywhere - Flask App

Esta guía te mostrará cómo desplegar tu aplicación Flask en PythonAnywhere.

## 📋 Índice
1. [Preparación](#preparación)
2. [Subir Archivos a PythonAnywhere](#paso-1-subir-archivos)
3. [Configurar la Aplicación Web](#paso-2-configurar-la-aplicación-web)
4. [Instalar Dependencias](#paso-3-instalar-dependencias)
5. [Configurar Archivos Estáticos](#paso-4-configurar-archivos-estáticos)
6. [Recargar y Probar](#paso-5-recargar-y-probar)
7. [Troubleshooting](#troubleshooting)

---

## 📋 Preparación

1.  **Crea una cuenta en PythonAnywhere:** Si aún no tienes una, regístrate en [www.pythonanywhere.com](https://www.pythonanywhere.com). El plan gratuito es suficiente para este proyecto.
2.  **Reúne tus archivos:** Asegúrate de tener a mano los siguientes archivos y carpetas de tu proyecto:
    *   `app.py`
    *   `requirements.txt`
    *   La carpeta `templates/` con tus archivos HTML.
    *   La carpeta `static/` con tus archivos CSS, JS e imágenes.

---

## PASO 1: Subir Archivos

1.  Ve a tu **Dashboard** en PythonAnywhere.
2.  Haz clic en la pestaña **"Files"**.
3.  Crea un nuevo directorio para tu proyecto. Por ejemplo, `flask_app`.
4.  Navega dentro de ese directorio y sube tus archivos (`app.py`, `requirements.txt`).
5.  Sube las carpetas `templates` y `static` con todo su contenido.

Tu estructura de archivos en PythonAnywhere debería verse así:

```
/home/tu_usuario/flask_app/
├── app.py
├── requirements.txt
├── templates/
│   ├── index.html
│   └── modals.html
└── static/
    ├── css/
    ├── js/
    └── images/
```

---

## PASO 2: Configurar la Aplicación Web

1.  Ve a la pestaña **"Web"** desde el menú principal.
2.  Haz clic en **"Add a new web app"**.
3.  Sigue los pasos:
    *   Confirma el nombre de tu dominio (ej: `tu_usuario.pythonanywhere.com`).
    *   Selecciona **"Flask"** como tu framework de Python.
    *   Elige la versión de Python más reciente disponible (ej: Python 3.10).
    *   PythonAnywhere creará un archivo de configuración WSGI por ti. La ruta será algo como `/var/www/tu_usuario_pythonanywhere_com_wsgi.py`.

4.  **Edita el archivo de configuración WSGI:**
    *   Haz clic en el enlace al archivo WSGI para editarlo.
    *   **Borra todo el contenido** y reemplázalo con el siguiente código. Asegúrate de cambiar `tu_usuario` y `flask_app` por tu nombre de usuario y el nombre de la carpeta que creaste.

    ```python
    import sys
    import os

    # Añade la ruta de tu proyecto al path de Python
    project_home = u'/home/tu_usuario/flask_app'
    if project_home not in sys.path:
        sys.path = [project_home] + sys.path

    # Importa la variable 'app' desde tu archivo app.py
    from app import app as application
    ```

5.  Guarda el archivo.

---

## PASO 3: Instalar Dependencias

1.  Ve a la pestaña **"Consoles"**.
2.  Inicia una nueva consola **"Bash"**.
3.  Dentro de la consola, navega al directorio de tu proyecto:
    ```bash
    cd flask_app
    ```
4.  Instala las dependencias de tu archivo `requirements.txt`. Es muy importante usar el flag `--user`:
    ```bash
    pip install --user -r requirements.txt
    ```
    Esto instalará las librerías en tu directorio home.

---

## PASO 4: Configurar Archivos Estáticos

1.  Vuelve a la pestaña **"Web"**.
2.  Baja a la sección **"Static files"**.
3.  Configura el mapeo para tus archivos estáticos:
    *   En el campo **URL**, escribe `/static/`.
    *   En el campo **Directory**, escribe la ruta completa a tu carpeta `static`: `/home/tu_usuario/flask_app/static`.

    ![Configuración de archivos estáticos](https://files.help.pythonanywhere.com/static_files_mapping.png)

---

## PASO 5: Recargar y Probar

1.  En la parte superior de la pestaña **"Web"**, haz clic en el botón verde **"Reload tu_usuario.pythonanywhere.com"**.
2.  ¡Listo! Ahora puedes visitar tu URL (`http://tu_usuario.pythonanywhere.com`) en tu navegador para ver tu aplicación funcionando.

---

## 🔧 Troubleshooting

*   **Error "ModuleNotFoundError"**:
    *   Verifica que la ruta en tu archivo WSGI (`project_home`) sea correcta.
    *   Asegúrate de haber instalado las dependencias con `pip install --user`.
*   **La página no carga o muestra un error**:
    *   Revisa el **"Error log"** y el **"Server log"**. Los enlaces están en la pestaña "Web". Estos archivos te darán pistas sobre qué está fallando.
*   **Los estilos (CSS) o imágenes no cargan**:
    *   Verifica que la configuración de "Static files" en la pestaña "Web" sea correcta. La URL y el directorio deben coincidir con tu estructura de proyecto.
    *   Asegúrate de que en tus templates HTML estés usando `url_for('static', filename='...')` para enlazar a tus archivos estáticos.

¡Éxito con tu deployment! 🚀

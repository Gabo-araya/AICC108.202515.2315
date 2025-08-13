# 🚀 Guía de Deployment en PythonAnywhere - Curso Ethical Hacking

Esta guía te mostrará cómo desplegar la aplicación Flask del curso de Ethical Hacking en PythonAnywhere.

**Cuenta objetivo:** `AICC1082025152315.pythonanywhere.com`

## 📋 Índice
1. [Preparación](#preparación)
2. [Subir Archivos a PythonAnywhere](#paso-1-subir-archivos)
3. [Configurar la Aplicación Web](#paso-2-configurar-la-aplicación-web)
4. [Instalar Dependencias](#paso-3-instalar-dependencias)
5. [Configurar Archivos Estáticos](#paso-4-configurar-archivos-estáticos)
6. [Configurar Sitios Clonados](#paso-5-configurar-sitios-clonados)
7. [Recargar y Probar](#paso-6-recargar-y-probar)
8. [Troubleshooting](#troubleshooting)

---

## 📋 Preparación

1.  **Acceso a la cuenta:** Asegúrate de tener acceso a la cuenta `AICC1082025152315.pythonanywhere.com`
2.  **Reúne tus archivos:** Esta aplicación incluye:
    *   `app.py` - Aplicación Flask principal
    *   `wsgi.py` - Configuración WSGI para PythonAnywhere
    *   `requirements.txt` - Dependencias de Python
    *   `templates/` - Plantillas HTML (index.html, modals.html)
    *   `static/` - Archivos CSS, JS e imágenes del curso
    *   `xqazprog.pythonanywhere.com/` - Sitio clonado con wget (educativo)
    *   `metadatos.pythonanywhere.com/` - Sitio clonado con HTTrack (educativo)

---

## PASO 1: Clonar Repositorio y Configurar Archivos

### Opción A: Clonación desde GitHub (Recomendado)

1.  Ve a tu **Dashboard** en PythonAnywhere como `AICC1082025152315`
2.  Haz clic en la pestaña **"Consoles"**
3.  Inicia una nueva consola **"Bash"**
4.  Clona el repositorio público:
    ```bash
    cd ~
    git clone https://github.com/Gabo-araya/AICC108.202515.2315.git sitio
    cd sitio
    ```

5.  Verifica que todos los archivos se clonaron correctamente:
    ```bash
    ls -la
    # Deberías ver: app.py, wsgi.py, requirements.txt, templates/, static/, etc.
    ```

### Opción B: Subida Manual de Archivos

1.  Ve a la pestaña **"Files"**
2.  Crea el directorio: `sitio`
3.  Sube manualmente todos los archivos del proyecto local

**Estructura completa requerida en PythonAnywhere:**

```
/home/AICC1082025152315/sitio/
├── app.py                           # Aplicación Flask
├── wsgi.py                          # Configuración WSGI
├── requirements.txt                 # Dependencias
├── templates/
│   ├── index.html                   # Página principal
│   └── modals.html                  # Modales del curso
├── static/
│   ├── css/cyber-style.css          # Estilos cyber
│   ├── js/cyber-effects.js          # Efectos JavaScript
│   └── images/                      # Imágenes del curso
├── xqazprog.pythonanywhere.com/     # Sitio clonado wget
│   ├── index.html
│   ├── blog/, panel/, static/, media/
│   └── [todos los archivos clonados]
└── metadatos.pythonanywhere.com/    # Sitio clonado HTTrack
    ├── index.html, help.html
    ├── static/, uploads/
    ├── file/1.html a file/141.html
    └── [todos los archivos clonados]
```

**⚠️ IMPORTANTE:** Los directorios de sitios clonados son esenciales para las demostraciones educativas.

### Verificación Post-Clonación

Después de clonar, verifica que la estructura esté completa:
```bash
cd ~/sitio
find . -name "*.html" | head -10    # Verificar archivos HTML
ls -la xqazprog.pythonanywhere.com/
ls -la metadatos.pythonanywhere.com/
```

---

## PASO 2: Configurar la Aplicación Web

1.  Ve a la pestaña **"Web"** desde el menú principal
2.  Haz clic en **"Add a new web app"**
3.  Sigue los pasos:
    *   Confirma el dominio: `AICC1082025152315.pythonanywhere.com`
    *   Selecciona **"Flask"** como framework
    *   Elige **Python 3.10** (o la más reciente disponible)
    *   PythonAnywhere creará: `/var/www/AICC1082025152315_pythonanywhere_com_wsgi.py`

4.  **Configura el archivo WSGI:**
    *   Haz clic en el enlace al archivo WSGI para editarlo
    *   **Borra todo el contenido** y reemplázalo con:

    ```python
    #!/usr/bin/env python3
    """
    WSGI configuration for PythonAnywhere deployment
    Account: AICC1082025152315.pythonanywhere.com
    """

    import sys
    import os

    # Add your project directory to the sys.path
    project_home = '/home/AICC1082025152315/sitio'
    if project_home not in sys.path:
        sys.path.insert(0, project_home)

    # Set environment variables
    os.environ['FLASK_ENV'] = 'production'

    # Import your Flask application
    from app import app as application

    if __name__ == "__main__":
        application.run()
    ```

5.  Guarda el archivo


### Entorno Virtual (Opcional pero Recomendado)

```bash
# Crear entorno virtual
python3.10 -m venv venv

# Activar entorno
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows PowerShell
venv\Scripts\activate.bat # Windows CMD

# Verificar activación
which python  # Debe apuntar al entorno virtual
```

---

## PASO 3: Instalar Dependencias

1.  **Si clonaste desde GitHub:** Ya tienes la consola abierta en `~/sitio`
2.  **Si subiste manualmente:** Ve a **"Consoles"** → nueva consola **"Bash"** → `cd sitio`
3.  Instala las dependencias:
    ```bash
    # Asegúrate de estar en el directorio correcto
    pwd  # Debería mostrar: /home/AICC1082025152315/sitio

    # Instalar dependencias
    pip3.10 install -r requirements.txt
    ```

**Dependencias que se instalarán:**
- Flask==3.0.0
- Werkzeug==3.0.1
- Jinja2==3.1.2
- MarkupSafe==2.1.3
- itsdangerous==2.1.2
- click==8.1.7
- blinker==1.7.0
- gunicorn==21.2.0

---

## PASO 4: Configurar Archivos Estáticos

1.  Vuelve a la pestaña **"Web"**
2.  En la sección **"Static files"**, agrega:

**Mapeo principal:**
- **URL:** `/static/`
- **Directory:** `/home/AICC1082025152315/sitio/static`

**Mapeos adicionales para sitios clonados:**
- **URL:** `/cloned-site/static/`
- **Directory:** `/home/AICC1082025152315/sitio/xqazprog.pythonanywhere.com/static`

- **URL:** `/metadatos-site/static/`
- **Directory:** `/home/AICC1082025152315/sitio/metadatos.pythonanywhere.com/static`

⚠️ **Nota:** La aplicación Flask maneja automáticamente el enrutamiento de archivos estáticos de sitios clonados, pero estos mapeos mejoran el rendimiento.

## PASO 5: Configurar Sitios Clonados

**CRÍTICO:** Esta aplicación sirve sitios clonados educativos. Verificar que estos directorios existan:

1.  **Verificar estructura en Files:**
    ```
    /home/AICC1082025152315/sitio/
    ├── xqazprog.pythonanywhere.com/     ✓ Debe existir
    └── metadatos.pythonanywhere.com/    ✓ Debe existir
    ```

2.  **Rutas que deben funcionar después del deployment:**
    - `AICC1082025152315.pythonanywhere.com/` → Página principal del curso
    - `AICC1082025152315.pythonanywhere.com/cloned-site/` → Demo sitio wget
    - `AICC1082025152315.pythonanywhere.com/metadatos-site/` → Demo sitio HTTrack


---

## PASO 6: Recargar y Probar

1.  En la pestaña **"Web"**, haz clic en **"Reload AICC1082025152315.pythonanywhere.com"**
2.  Prueba las URLs:
    - **Principal:** `https://AICC1082025152315.pythonanywhere.com/`
    - **Sitio clonado wget:** `https://AICC1082025152315.pythonanywhere.com/cloned-site/`
    - **Sitio clonado HTTrack:** `https://AICC1082025152315.pythonanywhere.com/metadatos-site/`


**✅ La aplicación está lista cuando:**
- La página principal muestra el diseño cyber del curso
- Los sitios clonados se sirven correctamente
- Los estilos CSS y JavaScript funcionan
- Las 27 modales educativas se abren correctamente

---

## 🔧 Troubleshooting

### Errores Comunes

**Error "ModuleNotFoundError":**
- Verifica ruta WSGI: `/home/AICC1082025152315/sitio`
- Reinstala dependencias: `pip3.10 install --user -r requirements.txt`

**Error "No such file or directory" para sitios clonados:**
- Verifica que existan los directorios:
  - `/home/AICC1082025152315/sitio/xqazprog.pythonanywhere.com/`
  - `/home/AICC1082025152315/sitio/metadatos.pythonanywhere.com/`
- Los sitios clonados son ESENCIALES para la aplicación

**Error 404 en rutas `/cloned-site/` o `/metadatos-site/`:**
- Verifica que los archivos `index.html` existan en los directorios clonados
- Revisa permisos de archivos en PythonAnywhere Files

**CSS/JS no cargan:**
- Verifica mapeo de static files en pestaña Web
- Confirma que `url_for('static', filename='...')` se use en templates

**Error logs a revisar:**
- **Error log:** `/var/log/AICC1082025152315.pythonanywhere.com.error.log`
- **Server log:** `/var/log/AICC1082025152315.pythonanywhere.com.server.log`

### Verificación Post-Deployment

```bash
# En consola PythonAnywhere, verificar archivos críticos:
ls -la /home/AICC1082025152315/sitio/
ls -la /home/AICC1082025152315/sitio/xqazprog.pythonanywhere.com/
ls -la /home/AICC1082025152315/sitio/metadatos.pythonanywhere.com/
```

### Actualización del Código

Para actualizar la aplicación con cambios del repositorio:
```bash
cd ~/sitio
git pull origin main
# Luego hacer "Reload" en la pestaña Web
```

¡Aplicación del curso lista para educación en Ethical Hacking! 🛡️🚀

---

## 📋 Resumen del Proceso

**Método recomendado (Git):**
1. Consola Bash → `git clone https://github.com/Gabo-araya/AICC108.202515.2315.git sitio`
2. Web tab → Crear nueva app Flask
3. Configurar WSGI → Copiar código proporcionado
4. `pip3.10 install --user -r requirements.txt`
5. Configurar static files
6. Reload → Probar URLs

**Ventajas de usar Git:**
- ✅ Descarga automática de todos los archivos
- ✅ Preserva estructura de directorios
- ✅ Fácil actualización con `git pull`
- ✅ No hay riesgo de archivos faltantes

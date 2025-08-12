# 🛡️ Curso Ethical Hacking - AICC108.202515.2315.EL.ON

> **Aplicación web educativa para aprender técnicas de hacking ético y defensa cibernética**

[![Flask](https://img.shields.io/badge/Flask-3.0.0-blue.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-Educational-yellow.svg)](#licencia)

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [✨ Características](#-características)
- [🚀 Demo en Vivo](#-demo-en-vivo)
- [🔧 Tecnologías](#-tecnologías)
- [📦 Instalación](#-instalación)
- [🌐 Deployment](#-deployment)
- [📚 Uso de la Aplicación](#-uso-de-la-aplicación)
- [🎓 Contenido Educativo](#-contenido-educativo)
- [🔒 Aspectos de Seguridad](#-aspectos-de-seguridad)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## 🎯 Descripción del Proyecto

Esta aplicación Flask presenta un curso interactivo de **Ethical Hacking** diseñado para educación en ciberseguridad defensiva. La aplicación demuestra técnicas de clonación de sitios web utilizando herramientas como HTTrack y wget, todo presentado en un diseño futurista con temática cyberpunk.

### 🎯 Objetivos Educativos

- **Comprensión de ataques de phishing** - Entender cómo funcionan para defenderse mejor
- **Técnicas de clonación web** - Aprender métodos de replicación de sitios (HTTrack, wget)
- **Deployment en la nube** - Estrategias de despliegue en Vercel y PythonAnywhere
- **Defensa cibernética** - Protocolos y medidas de seguridad

> ⚠️ **IMPORTANTE**: Este proyecto es exclusivamente para **fines educativos** y **defensa cibernética**. No debe utilizarse para actividades maliciosas.

## ✨ Características

### 🎨 Diseño y UI/UX
- **Interfaz cyberpunk futurista** con animaciones CSS avanzadas
- **Tema dark responsive** optimizado para todos los dispositivos
- **Efectos visuales dinámicos** - Matrix rain, partículas, glass morphism
- **Tipografía especializada** - Orbitron y Rajdhani para estética cyber
- **27 modales interactivos** con contenido educativo paso a paso

### 🔧 Funcionalidades Técnicas
- **Aplicación Flask monolítica** con arquitectura modular
- **Servidor de sitios clonados integrado** - Sirve demostraciones en vivo
- **API RESTful** (`/api/course-info`) para metadatos del curso
- **Enrutamiento inteligente** con fallback automático para recursos
- **Compatibilidad multi-plataforma** - Vercel, PythonAnywhere, local

### 📚 Contenido Educativo Interactivo

#### 🎯 Módulo 1: Fundamentos de Phishing
- Introducción a técnicas de ingeniería social
- Identificación de sitios fraudulentos
- Casos de estudio reales

#### 🛠️ Módulo 2: HTTrack - Clonación GUI
- Tutorial paso a paso con capturas de pantalla
- Configuración avanzada de mirrors
- Mejores prácticas y limitaciones

#### 💻 Módulo 3: wget - Clonación por Terminal
- Comandos esenciales y opciones avanzadas
- Scripts automatizados para clonación recursiva
- Manejo de autenticación y cookies

#### ☁️ Módulo 4: Deployment en la Nube
- Configuración de Vercel para aplicaciones Flask
- Setup completo de PythonAnywhere
- Estrategias de CI/CD

#### 🛡️ Módulo 5: Cyber Defense
- Protocolos de detección de phishing
- Implementación de medidas preventivas
- Monitoreo y respuesta a incidentes

### 🎪 Sitios de Demostración
- **`/cloned-site/`** - Demo de sitio clonado con wget (xqazprog.pythonanywhere.com)
- **`/metadatos-site/`** - Demo de sitio clonado con HTTrack (metadatos.pythonanywhere.com)

## 🚀 Demo en Vivo

- **🌐 Producción:** `https://AICC1082025152315.pythonanywhere.com/`
- **🔄 Desarrollo:** `https://vercel-app-url.vercel.app/`
- **📋 API:** `https://AICC1082025152315.pythonanywhere.com/api/course-info`

## 🔧 Tecnologías

### Backend
- **Flask 3.0.0** - Framework web principal
- **Werkzeug 3.0.1** - WSGI toolkit
- **Jinja2 3.1.2** - Template engine
- **Gunicorn 21.2.0** - WSGI server

### Frontend
- **Bootstrap 5.3.2** - Framework CSS responsive
- **Bootstrap Icons 1.11.0** - Iconografía
- **Google Fonts** - Orbitron + Rajdhani typography
- **Vanilla JavaScript** - Efectos cyber y animaciones

### Deployment & DevOps
- **Vercel** - Serverless deployment con auto-scaling
- **PythonAnywhere** - Hosting tradicional con WSGI
- **Git/GitHub** - Control de versiones y CI/CD

## 📦 Instalación

### ⚡ Instalación Rápida (Local)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Gabo-araya/AICC108.202515.2315.git
cd AICC108.202515.2315

# 2. Crear entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Ejecutar la aplicación
python app.py
```

La aplicación estará disponible en: `http://localhost:5000`

### 📋 Requisitos del Sistema

- **Python:** 3.10 o superior
- **Memoria RAM:** Mínimo 512MB (recomendado 1GB+)
- **Espacio en disco:** ~500MB (incluyendo sitios clonados)
- **Navegador:** Chrome 90+, Firefox 88+, Safari 14+

### 🔧 Instalación Detallada

#### 1. Preparación del Entorno

```bash
# Verificar versión de Python
python --version  # Debe ser 3.10+

# Instalar Git (si no está instalado)
# Ubuntu/Debian: sudo apt install git
# CentOS/RHEL: sudo yum install git
# Windows: descargar desde git-scm.com
```

#### 2. Clonación y Configuración

```bash
# Clonar con todos los submódulos
git clone --recursive https://github.com/Gabo-araya/AICC108.202515.2315.git

# Navegar al directorio
cd AICC108.202515.2315

# Verificar estructura completa
ls -la
# Deberías ver: app.py, requirements.txt, templates/, static/,
#               xqazprog.pythonanywhere.com/, metadatos.pythonanywhere.com/
```

#### 3. Entorno Virtual (Opcional pero Recomendado)

```bash
# Crear entorno virtual
python -m venv ethical-hacking-env

# Activar entorno
source ethical-hacking-env/bin/activate  # Linux/macOS
ethical-hacking-env\Scripts\activate     # Windows PowerShell
ethical-hacking-env\Scripts\activate.bat # Windows CMD

# Verificar activación
which python  # Debe apuntar al entorno virtual
```

#### 4. Instalación de Dependencias

```bash
# Actualizar pip
pip install --upgrade pip

# Instalar dependencias del proyecto
pip install -r requirements.txt

# Verificar instalación
pip list | grep Flask  # Debe mostrar Flask==3.0.0
```

#### 5. Configuración de Variables de Entorno (Opcional)

```bash
# Crear archivo .env (opcional)
touch .env

# Agregar variables de configuración
echo "FLASK_ENV=development" >> .env
echo "FLASK_DEBUG=True" >> .env
echo "PORT=5000" >> .env
```

#### 6. Verificación de la Instalación

```bash
# Ejecutar tests básicos
python -c "import flask; print('Flask importado correctamente')"
python -c "from app import app; print('Aplicación importada correctamente')"

# Verificar archivos críticos
ls -la templates/index.html
ls -la static/css/cyber-style.css
ls -la xqazprog.pythonanywhere.com/index.html
ls -la metadatos.pythonanywhere.com/index.html
```

#### 7. Ejecución

```bash
# Método 1: Ejecutar directamente
python app.py

# Método 2: Usar Flask CLI
export FLASK_APP=app.py
flask run

# Método 3: Con configuración específica
python app.py --host=0.0.0.0 --port=8080
```

### 🚨 Troubleshooting de Instalación

#### Error: "ModuleNotFoundError: No module named 'flask'"
```bash
# Solución: Verificar que el entorno virtual esté activado
pip install flask==3.0.0
```

#### Error: "Port 5000 already in use"
```bash
# Solución: Usar puerto diferente
python app.py  # Automáticamente busca puerto disponible
# O cambiar variable PORT en .env
```

#### Error: Sitios clonados no cargan (404)
```bash
# Verificar que los directorios existan
ls -la xqazprog.pythonanywhere.com/
ls -la metadatos.pythonanywhere.com/

# Si faltan, el repositorio podría estar incompleto
git status
git pull origin main
```

#### Error: Estilos CSS no cargan
```bash
# Verificar ruta de archivos estáticos
ls -la static/css/cyber-style.css
ls -la static/js/cyber-effects.js

# Limpiar caché del navegador: Ctrl+F5
```

## 🌐 Deployment

Esta aplicación está optimizada para múltiples plataformas de deployment. Cada método tiene sus ventajas específicas:

### 🐍 PythonAnywhere (Hosting Tradicional)

**Ventajas:** Hosting persistente, soporte completo para sitios clonados, consola integrada

#### Quick Start con Git

```bash
# 1. Abrir consola Bash en PythonAnywhere
cd ~
git clone https://github.com/Gabo-araya/AICC108.202515.2315.git mysite
cd mysite

# 2. Instalar dependencias
pip3.10 install --user -r requirements.txt

# 3. Configurar Web App en dashboard
# - Python 3.10
# - Flask framework
# - WSGI file: /var/www/username_pythonanywhere_com_wsgi.py
```

#### Configuración WSGI

Reemplazar contenido del archivo WSGI con:

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/AICC1082025152315/mysite'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['FLASK_ENV'] = 'production'

# Import your Flask application
from app import app as application
```

#### Static Files Mapping

En el dashboard de PythonAnywhere, configurar:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/AICC1082025152315/mysite/static` |
| `/cloned-site/static/` | `/home/AICC1082025152315/mysite/xqazprog.pythonanywhere.com/static` |
| `/metadatos-site/static/` | `/home/AICC1082025152315/mysite/metadatos.pythonanywhere.com/static` |

#### Actualización de Código

```bash
cd ~/mysite
git pull origin main
# Luego hacer "Reload" en Web dashboard
```

### 🐳 Docker (Para Cualquier Plataforma)

#### Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  ethical-hacking-app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - .:/app
```

#### Comandos Docker

```bash
# Build
docker build -t ethical-hacking-course .

# Run
docker run -p 5000:5000 ethical-hacking-course

# Con docker-compose
docker-compose up -d
```

### 🔧 Deployment Troubleshooting

#### Error: "Module not found" en PythonAnywhere
```bash
# Verificar path en WSGI y dependencias
which python3.10
pip3.10 list | grep Flask
```

#### Error: Sitios clonados 404
```bash
# Verificar estructura de directorios
ls -la xqazprog.pythonanywhere.com/index.html
ls -la metadatos.pythonanywhere.com/index.html
```

### 🎯 Funcionalidades Interactivas

#### 🌐 Demostraciones en Vivo

**Sitio Clonado con wget:**
```
URL: /cloned-site/
Demuestra: xqazprog.pythonanywhere.com
Características:
- Blog interactivo
- Panel de administración
- Galería de imágenes
- Formularios funcionales
```

**Sitio Clonado con HTTrack:**
```
URL: /metadatos-site/
Demuestra: metadatos.pythonanywhere.com
Características:
- Sistema de archivos navegable
- 141+ páginas HTML interconectadas
- Uploads y media files
- Estructura completa preservada
```


## 📁 Estructura del Proyecto

```
AICC108.202515.2315/
├── 📄 app.py                          # Aplicación Flask principal
├── 📄 wsgi.py                         # Configuración WSGI para deployment
├── 📄 requirements.txt                # Dependencias de Python
├── 📄 README.md                       # Este archivo
├── 📄 PYTHONANYWHERE_DEPLOYMENT.md    # Guía específica de PythonAnywhere
│
├── 📁 templates/                      # Plantillas Jinja2
│   ├── 📄 index.html                  # Página principal del curso
│   └── 📄 modals.html                 # 27 modales educativos
│
├── 📁 static/                         # Recursos estáticos de la aplicación
│   ├── 📁 css/
│   │   └── 📄 cyber-style.css         # Estilos cyberpunk personalizados
│   ├── 📁 js/
│   │   └── 📄 cyber-effects.js        # Efectos visuales y animaciones
│   └── 📁 images/                     # Capturas de pantalla del curso
│       ├── 📁 httrack/                # Screenshots de HTTrack (9 imágenes)
│       ├── 📁 wget/                   # Screenshots de wget (3 imágenes)
│       └── 📁 pythonanywhere/         # Screenshots de deployment
│
├── 📁 xqazprog.pythonanywhere.com/    # 🎯 SITIO CLONADO CON WGET
│   ├── 📄 index.html                  # Página principal clonada
│   ├── 📁 blog/                       # Sistema de blog completo
│   │   ├── 📁 1/, 📁 2/, 📁 3/         # Posts individuales
│   │   └── 📄 index.html              # Índice del blog
│   ├── 📁 panel/                      # Panel de administración demo
│   │   └── 📁 entrar/
│   ├── 📁 static/                     # Recursos estáticos clonados
│   │   └── 📁 blog/                   # CSS, JS, imágenes del blog
│   └── 📁 media/                      # Archivos multimedia
│       ├── 📁 img_articulo/           # Imágenes de artículos
│       ├── 📁 img_persona/            # Avatares y fotos
│       └── 📁 img_proyecto/           # Portfolio de proyectos
│
└── 📁 metadatos.pythonanywhere.com/   # 🎯 SITIO CLONADO CON HTTRACK
    ├── 📄 index.html                  # Página principal clonada
    ├── 📄 help.html                   # Página de ayuda
    ├── 📄 login.html                  # Login (deshabilitado)
    ├── 📁 file/                       # Sistema de archivos navegable
    │   ├── 📄 1.html, 📄 2.html       # Archivos individuales (1-141)
    │   └── 📄 141.html                # Último archivo
    ├── 📁 static/                     # Recursos estáticos HTTrack
    │   ├── 📁 css/                    # Estilos preservados
    │   └── 📁 js/                     # JavaScript funcional
    └── 📁 uploads/                    # Archivos subidos (demostración)
        ├── 📄 *.jpg, *.png            # Imágenes de ejemplo
        ├── 📄 *.pdf, *.doc            # Documentos de prueba
        └── 📄 *.mp3, *.mp4            # Media files
```

## 🤝 Contribuir

### 🛠️ Configuración para Desarrollo

```bash
# 1. Fork del repositorio en GitHub
git clone https://github.com/tu-usuario/AICC108.202515.2315.git
cd AICC108.202515.2315

# 2. Crear rama de desarrollo
git checkout -b feature/nueva-funcionalidad

# 3. Configurar entorno de desarrollo
python -m venv dev-env
source dev-env/bin/activate
pip install -r requirements.txt

# 4. Hacer cambios y probar
python app.py

# 5. Commit y push
git add .
git commit -m "feat: descripción de cambios"
git push origin feature/nueva-funcionalidad

# 6. Crear Pull Request en GitHub
```

---

## 🏆 Reconocimientos

### 👥 Créditos del Proyecto

- **Desarrollo Principal:** Gabriel Araya (https://github.com/Gabo-araya) + Macarena Riquelme (https://github.com/mriquelmec)
- **Institución:** Universidad Andrés Bello (UNAB)
- **Curso:** AICC108.202515.2315.EL.ON - Ethical Hacking
- **Año Académico:** 2025

### 🛠️ Tecnologías y Herramientas

- **Backend:** Flask, Werkzeug, Jinja2
- **Frontend:** Bootstrap 5, Google Fonts, Vanilla JS
- **Deployment:** PythonAnywhere, Podman
- **Development:** Git/GitHub, Python 3.10+

---

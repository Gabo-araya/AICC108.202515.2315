# 🛡️ Curso Ethical Hacking - AICC108.202515.2315.EL.ON

> **Aplicación web educativa para aprender técnicas de hacking ético y defensa cibernética**

[![Flask](https://img.shields.io/badge/Flask-3.0.0-blue.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-Educational-yellow.svg)](#licencia)

## 🎯 Descripción del Proyecto

Esta aplicación Flask presenta técnicas de clonación de sitios web utilizando herramientas HTTrack y wget.

### 🎯 Objetivos Educativos

- **Comprensión de ataques de phishing** - Entender cómo funcionan para defenderse mejor
- **Técnicas de clonación web** - Aprender métodos de replicación de sitios (HTTrack, wget)
- **Deployment en la nube** - Estrategias de despliegue en PythonAnywhere

> ⚠️ **IMPORTANTE**: Este proyecto es exclusivamente para **fines educativos** y **defensa cibernética**. No debe utilizarse para actividades maliciosas.

### 🎪 Sitios de Demostración
- **`/cloned-site/`** - Demo de sitio clonado con wget (xqazprog.pythonanywhere.com)
- **`/metadatos-site/`** - Demo de sitio clonado con HTTrack (metadatos.pythonanywhere.com)

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
git clone https://github.com/Gabo-araya/AICC108.202515.2315.git

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
python3.10 -m venv venv

# Activar entorno
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows PowerShell
venv\Scripts\activate.bat # Windows CMD

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

#### 5. Verificación de la Instalación

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

#### 6. Ejecución

```bash
# Método 1: Ejecutar directamente
python app.py

# Método 2: Usar Flask CLI
export FLASK_APP=app.py
flask run

# Método 3: Con configuración específica
python app.py --host=0.0.0.0 --port=8080
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

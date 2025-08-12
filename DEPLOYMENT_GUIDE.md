# 🚀 Guía Completa de Deployment en Vercel - Flask App

## 📋 Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Preparación Local](#preparación-local)
3. [Configuración de Vercel](#configuración-de-vercel)
4. [Deployment Paso a Paso](#deployment-paso-a-paso)
5. [Verificación y Testing](#verificación-y-testing)
6. [Troubleshooting](#troubleshooting)
7. [Configuraciones Avanzadas](#configuraciones-avanzadas)

---

## 🏗️ Estructura del Proyecto

Tu aplicación Flask debe tener la siguiente estructura:

```
vercel/
├── app.py                 # Aplicación principal de Flask
├── requirements.txt       # Dependencias de Python
├── vercel.json           # Configuración de Vercel
├── DEPLOYMENT_GUIDE.md   # Esta guía
├── templates/            # Templates de Jinja2
│   ├── index.html        # Template principal
│   └── modals.html       # Template de modales
├── static/               # Archivos estáticos
│   ├── css/
│   │   └── cyber-style.css
│   ├── js/
│   │   └── cyber-effects.js
│   └── images/           # Imágenes (favicon, etc.)
└── old_files/            # Archivos del HTML original (opcional)
```

---

## 🛠️ Preparación Local

### Paso 1: Verificar Archivos Críticos

**✅ app.py** - Debe contener:
```python
from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
```

**✅ requirements.txt** - Debe contener:
```
Flask==3.0.0
Werkzeug==3.0.1
Jinja2==3.1.2
MarkupSafe==2.1.3
itsdangerous==2.1.2
click==8.1.7
blinker==1.7.0
gunicorn==21.2.0
```

**✅ vercel.json** - Configuración de deployment:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ],
  "functions": {
    "app.py": {
      "includeFiles": "**"
    }
  },
  "env": {
    "FLASK_ENV": "production"
  }
}
```

### Paso 2: Test Local (Opcional pero Recomendado)

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\\Scripts\\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
python app.py

# Verificar en http://localhost:5000
```

---

## ⚙️ Configuración de Vercel

### Paso 1: Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Regístrate con GitHub, GitLab, Bitbucket o email
4. **Recomendado:** Usar GitHub para mejor integración

### Paso 2: Instalar Vercel CLI (Opcional)

```bash
# Instalar globally
npm install -g vercel

# O usar npx (sin instalación global)
npx vercel --version
```

---

## 🚀 Deployment Paso a Paso

### Método 1: Deployment desde GitHub (Recomendado)

#### Paso 1: Subir a GitHub
```bash
# Inicializar repositorio Git
git init

# Añadir archivos
git add .

# Commit inicial
git commit -m "Initial Flask app for Ethical Hacking course 🔰

🚀 Generated with Claude Code (https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Conectar con repositorio remoto
git remote add origin https://github.com/TU-USUARIO/ethical-hacking-course.git

# Push al repositorio
git push -u origin main
```

#### Paso 2: Conectar Vercel con GitHub

1. **Login en Vercel:** Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. **New Project:** Haz clic en "New Project"
3. **Import Git Repository:** 
   - Selecciona tu repositorio GitHub
   - Autoriza el acceso si es necesario
4. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** Dejar vacío
   - **Output Directory:** Dejar vacío

#### Paso 3: Deploy
1. Haz clic en **"Deploy"**
2. Espera el proceso de build (2-5 minutos)
3. ✅ ¡Tu app estará live!

### Método 2: Deployment Directo (Drag & Drop)

#### Paso 1: Preparar ZIP
```bash
# Crear archivo ZIP con todos los archivos necesarios
# INCLUIR: app.py, requirements.txt, vercel.json, templates/, static/
# EXCLUIR: venv/, __pycache__/, .git/, node_modules/
```

#### Paso 2: Upload a Vercel
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra tu carpeta o archivo ZIP
3. Vercel detectará automáticamente que es una app Python
4. Haz clic en **"Deploy"**

### Método 3: Vercel CLI

```bash
# En el directorio de tu proyecto
cd /path/to/your/vercel-project

# Login en Vercel CLI
vercel login

# Deploy
vercel

# Seguir prompts:
# ? Set up and deploy "vercel"? [Y/n] y
# ? Which scope do you want to deploy to? [Tu username]
# ? Link to existing project? [y/N] n
# ? What's your project's name? ethical-hacking-course
# ? In which directory is your code located? ./
```

---

## ✅ Verificación y Testing

### Paso 1: Verificar Deployment

1. **URL de Producción:** Vercel te dará una URL como `https://ethical-hacking-course-xyz.vercel.app`
2. **Status Check:** Verifica que carga correctamente
3. **Funcionalidad:** Testa todos los enlaces y modales

### Paso 2: Testing de Funcionalidades

**✅ Checklist de Verificación:**

- [ ] **Página principal** carga sin errores
- [ ] **CSS futurista** se aplica correctamente
- [ ] **JavaScript** funciona (efectos, modales)
- [ ] **Navegación** entre secciones es smooth
- [ ] **Modales** se abren correctamente
- [ ] **Links externos** funcionan
- [ ] **Responsive design** en móvil
- [ ] **API endpoint** `/api/course-info` responde

### Paso 3: Performance Check

```bash
# Test de velocidad
curl -w "@curl-format.txt" -o /dev/null -s "https://tu-app.vercel.app"

# O usar herramientas online:
# - Google PageSpeed Insights
# - GTmetrix
# - WebPageTest
```

---

## 🔧 Troubleshooting

### Error: "Build Failed"

```bash
# Error común: Dependencias incorrectas
# Solución: Verificar requirements.txt
pip freeze > requirements.txt
```

### Error: "Internal Server Error"

```bash
# Error común: Rutas incorrectas en templates
# Solución: Verificar url_for() en templates
{{ url_for('static', filename='css/cyber-style.css') }}
```

### Error: "Static Files Not Loading"

```bash
# Error común: Configuración de static files
# Solución: Verificar estructura de carpetas
static/
├── css/
├── js/
└── images/
```

### Error: "Template Not Found"

```bash
# Error común: Template path incorrecto
# Solución: Verificar que templates/ existe y contiene archivos
templates/
├── index.html
└── modals.html
```

### Logs de Debugging

```bash
# Ver logs en tiempo real
vercel logs https://tu-app.vercel.app

# Ver logs específicos de function
vercel logs --follow
```

---

## ⚡ Configuraciones Avanzadas

### Variables de Entorno

```bash
# Configurar variables de entorno en Vercel
vercel env add FLASK_ENV production
vercel env add SECRET_KEY tu-secret-key-aqui
```

### Custom Domain

1. **Comprar dominio** (Namecheap, GoDaddy, etc.)
2. **En Vercel Dashboard:**
   - Ir a tu proyecto
   - Settings → Domains
   - Add domain
   - Seguir instrucciones DNS

### HTTPS y Seguridad

```json
// En vercel.json - Headers de seguridad
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Analytics

```json
// En vercel.json - Habilitar Analytics
{
  "analytics": {
    "id": "tu-analytics-id"
  }
}
```

---

## 🎯 Comandos Útiles

### Vercel CLI Commands

```bash
# Ver todos los deployments
vercel list

# Ver logs
vercel logs

# Rollback a deployment anterior
vercel rollback DEPLOYMENT_URL

# Eliminar proyecto
vercel remove PROJECT_NAME

# Ver información del proyecto
vercel inspect
```

### Git Commands para Updates

```bash
# Actualizar código y re-deploy automático
git add .
git commit -m "Update: [descripción de cambios]"
git push origin main

# Vercel auto-detecta cambios y re-deploya
```

---

## 🎉 ¡Deployment Exitoso!

Si seguiste todos los pasos, tu aplicación Flask del **Curso de Ethical Hacking** debería estar funcionando en:

**🌐 URL de Producción:** `https://tu-proyecto.vercel.app`

### Features Verificadas:
- ✅ **Diseño futurista** con efectos cyber
- ✅ **Responsive design** para todos los dispositivos  
- ✅ **Modales interactivos** para HTTrack, wget y Vercel
- ✅ **Smooth scrolling** y animaciones
- ✅ **API endpoint** para información del curso
- ✅ **SEO optimizado** con meta tags
- ✅ **Performance optimizado** para carga rápida

### Próximos Pasos:
1. **Compartir URL** con estudiantes
2. **Monitorear analytics** de uso
3. **Actualizar contenido** según feedback
4. **Backup regular** del código

---

## 📞 Soporte

Si encuentras problemas:

1. **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
2. **Flask Documentation:** [flask.palletsprojects.com](https://flask.palletsprojects.com)
3. **Community Support:** [vercel.com/help](https://vercel.com/help)

**¡Éxito con tu deployment! 🚀🔰**

---

*Generado con [Claude Code](https://claude.ai/code) para el curso AICC108.202515.2315.EL.ON*
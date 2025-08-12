from flask import Flask, render_template, send_from_directory, abort
import os
from pathlib import Path

app = Flask(__name__)

@app.route('/')
def index():
    """Página principal del curso de Ethical Hacking"""
    return render_template('index.html')

@app.route('/httrack')
def httrack():
    """Sección de HTTrack - en caso de querer separar en páginas"""
    return render_template('index.html', section='httrack')

@app.route('/wget')
def wget():
    """Sección de wget - en caso de querer separar en páginas"""
    return render_template('index.html', section='wget')

@app.route('/vercel-deploy')
def vercel_deploy():
    """Sección de deployment en Vercel - en caso de querer separar en páginas"""
    return render_template('index.html', section='vercel')

@app.route('/security-tips')
def security_tips():
    """Sección de consejos de seguridad - en caso de querer separar en páginas"""
    return render_template('index.html', section='security')

# Rutas para sitios clonados
@app.route('/cloned-site/')
@app.route('/cloned-site/<path:filename>')
def cloned_site(filename=''):
    """Sirve archivos del sitio clonado xqazprog.pythonanywhere.com"""
    cloned_site_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com')
    
    # Si no se especifica archivo, servir index.html
    if not filename:
        filename = 'index.html'
    
    # Construir ruta completa
    file_path = os.path.join(cloned_site_path, filename)
    
    # Verificar que el archivo existe y está dentro del directorio permitido
    try:
        # Resolver ruta absoluta para seguridad
        abs_path = os.path.abspath(file_path)
        abs_cloned_path = os.path.abspath(cloned_site_path)
        
        # Verificar que está dentro del directorio permitido (seguridad)
        if not abs_path.startswith(abs_cloned_path):
            abort(403)
        
        # Si es un directorio, buscar index.html
        if os.path.isdir(abs_path):
            index_file = os.path.join(abs_path, 'index.html')
            if os.path.exists(index_file):
                return send_from_directory(abs_path, 'index.html')
            else:
                # Listar archivos del directorio (opcional)
                abort(404)
        
        # Si es un archivo, servirlo
        if os.path.exists(abs_path):
            directory = os.path.dirname(abs_path)
            file_name = os.path.basename(abs_path)
            return send_from_directory(directory, file_name)
        
        # Si no existe, 404
        abort(404)
        
    except Exception as e:
        abort(404)

# Ruta específica para sitio de metadatos (HTTrack)
@app.route('/metadatos-site/')
@app.route('/metadatos-site/<path:filename>')
def metadatos_site(filename=''):
    """Sirve archivos del sitio clonado metadatos.pythonanywhere.com (si existe)"""
    cloned_site_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com')
    
    # Verificar si el directorio existe
    if not os.path.exists(cloned_site_path):
        return render_template('index.html', error_message="Sitio metadatos no disponible")
    
    # Si no se especifica archivo, servir index.html
    if not filename:
        filename = 'index.html'
    
    # Mismo manejo que cloned_site
    file_path = os.path.join(cloned_site_path, filename)
    
    try:
        abs_path = os.path.abspath(file_path)
        abs_cloned_path = os.path.abspath(cloned_site_path)
        
        if not abs_path.startswith(abs_cloned_path):
            abort(403)
        
        if os.path.isdir(abs_path):
            index_file = os.path.join(abs_path, 'index.html')
            if os.path.exists(index_file):
                return send_from_directory(abs_path, 'index.html')
            else:
                abort(404)
        
        if os.path.exists(abs_path):
            directory = os.path.dirname(abs_path)
            file_name = os.path.basename(abs_path)
            return send_from_directory(directory, file_name)
        
        abort(404)
        
    except Exception as e:
        abort(404)

# API endpoint para obtener información del curso
@app.route('/api/course-info')
def course_info():
    """API endpoint que devuelve información básica del curso"""
    return {
        'title': 'Curso Ethical Hacking',
        'code': 'AICC108.202515.2315.EL.ON',
        'sections': [
            {'id': 'phishing', 'name': 'Qué es el Phishing', 'description': 'Introducción a técnicas de phishing'},
            {'id': 'httrack', 'name': 'HTTrack Cloning', 'description': 'Clonación con HTTrack'},
            {'id': 'wget', 'name': 'wget Terminal', 'description': 'Clonación por línea de comandos'},
            {'id': 'vercel', 'name': 'Vercel Deploy', 'description': 'Deployment en la nube'},
            {'id': 'security', 'name': 'Cyber Defense', 'description': 'Protocolos de seguridad'}
        ],
        'tools': ['HTTrack', 'wget', 'Vercel', 'Bootstrap 5', 'Flask'],
        'difficulty': 'Intermedio-Avanzado',
        'duration': '4-6 horas',
        'cloned_sites': {
            'xqazprog': '/cloned-site/',
            'metadatos': '/metadatos-site/'
        }
    }

if __name__ == '__main__':
    # Para desarrollo local
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
from flask import Flask, render_template, send_from_directory, abort, request
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

# Rutas de fallback para recursos estáticos del sitio xqazprog clonado
@app.route('/cloned-site/static/<path:filename>')
def cloned_site_static(filename):
    """Maneja archivos estáticos del sitio clonado xqazprog"""
    static_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'static')
    try:
        return send_from_directory(static_path, filename)
    except Exception:
        abort(404)

@app.route('/cloned-site/media/<path:filename>')  
def cloned_site_media(filename):
    """Maneja archivos de media del sitio clonado xqazprog"""
    media_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'media')
    try:
        return send_from_directory(media_path, filename)
    except Exception:
        abort(404)

@app.route('/cloned-site/images/<path:filename>')
def cloned_site_images(filename):
    """Maneja archivos de imágenes del sitio clonado xqazprog"""
    images_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'images')
    try:
        return send_from_directory(images_path, filename)
    except Exception:
        abort(404)

@app.route('/cloned-site/css/<path:filename>')
def cloned_site_css(filename):
    """Maneja archivos CSS directos del sitio clonado xqazprog"""
    css_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'css')
    try:
        return send_from_directory(css_path, filename)
    except Exception:
        abort(404)

@app.route('/cloned-site/js/<path:filename>')
def cloned_site_js(filename):
    """Maneja archivos JS directos del sitio clonado xqazprog"""
    js_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'js')
    try:
        return send_from_directory(js_path, filename)
    except Exception:
        abort(404)

# Rutas adicionales para manejar referencias absolutas comunes
@app.route('/static/<path:filename>')
def handle_root_static(filename):
    """Maneja referencias a /static/ - primero intenta sitio clonado, luego Flask"""
    # Primero intentar servir desde el sitio clonado xqazprog
    static_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'static')
    cloned_file_path = os.path.join(static_path, filename)
    
    if os.path.exists(cloned_file_path):
        try:
            return send_from_directory(static_path, filename)
        except Exception:
            pass
    
    # Si no existe en sitio clonado, intentar sitio metadatos
    metadatos_static_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'static')
    metadatos_file_path = os.path.join(metadatos_static_path, filename)
    
    if os.path.exists(metadatos_file_path):
        try:
            return send_from_directory(metadatos_static_path, filename)
        except Exception:
            pass
    
    # Si no existe en sitios clonados, usar static normal de Flask
    try:
        return send_from_directory(app.static_folder, filename)
    except Exception:
        abort(404)

@app.route('/media/<path:filename>')
def handle_root_media(filename):
    """Maneja referencias a /media/ - primero intenta sitio clonado"""
    # Primero intentar servir desde el sitio clonado xqazprog
    media_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'media')
    cloned_file_path = os.path.join(media_path, filename)
    
    if os.path.exists(cloned_file_path):
        try:
            return send_from_directory(media_path, filename)
        except Exception:
            pass
    
    # Si no existe, intentar sitio metadatos
    metadatos_media_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'media')
    metadatos_file_path = os.path.join(metadatos_media_path, filename)
    
    if os.path.exists(metadatos_file_path):
        try:
            return send_from_directory(metadatos_media_path, filename)
        except Exception:
            pass
    
    abort(404)

# Rutas adicionales para otros paths comunes que pueden aparecer en sitios clonados
@app.route('/css/<path:filename>')
def handle_root_css(filename):
    """Maneja referencias a /css/ directas"""
    # Intentar servir desde xqazprog
    css_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'css')
    if os.path.exists(os.path.join(css_path, filename)):
        try:
            return send_from_directory(css_path, filename)
        except Exception:
            pass
    
    # Intentar desde metadatos
    metadatos_css_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'css')
    if os.path.exists(os.path.join(metadatos_css_path, filename)):
        try:
            return send_from_directory(metadatos_css_path, filename)
        except Exception:
            pass
    
    abort(404)

@app.route('/js/<path:filename>')
def handle_root_js(filename):
    """Maneja referencias a /js/ directas"""
    # Intentar servir desde xqazprog
    js_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'js')
    if os.path.exists(os.path.join(js_path, filename)):
        try:
            return send_from_directory(js_path, filename)
        except Exception:
            pass
    
    # Intentar desde metadatos
    metadatos_js_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'js')
    if os.path.exists(os.path.join(metadatos_js_path, filename)):
        try:
            return send_from_directory(metadatos_js_path, filename)
        except Exception:
            pass
    
    abort(404)

@app.route('/images/<path:filename>')
def handle_root_images(filename):
    """Maneja referencias a /images/ directas"""
    # Intentar servir desde xqazprog
    images_path = os.path.join(app.root_path, 'xqazprog.pythonanywhere.com', 'images')
    if os.path.exists(os.path.join(images_path, filename)):
        try:
            return send_from_directory(images_path, filename)
        except Exception:
            pass
    
    # Intentar desde metadatos
    metadatos_images_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'images')
    if os.path.exists(os.path.join(metadatos_images_path, filename)):
        try:
            return send_from_directory(metadatos_images_path, filename)
        except Exception:
            pass
    
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

# Rutas de fallback para recursos estáticos del sitio metadatos clonado
@app.route('/metadatos-site/static/<path:filename>')
def metadatos_site_static(filename):
    """Maneja archivos estáticos del sitio clonado metadatos"""
    static_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'static')
    try:
        return send_from_directory(static_path, filename)
    except Exception:
        abort(404)

@app.route('/metadatos-site/media/<path:filename>')  
def metadatos_site_media(filename):
    """Maneja archivos de media del sitio clonado metadatos"""
    media_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'media')
    try:
        return send_from_directory(media_path, filename)
    except Exception:
        abort(404)

@app.route('/metadatos-site/css/<path:filename>')
def metadatos_site_css(filename):
    """Maneja archivos CSS directos del sitio clonado metadatos"""
    css_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'css')
    try:
        return send_from_directory(css_path, filename)
    except Exception:
        abort(404)

@app.route('/metadatos-site/js/<path:filename>')
def metadatos_site_js(filename):
    """Maneja archivos JS directos del sitio clonado metadatos"""
    js_path = os.path.join(app.root_path, 'metadatos.pythonanywhere.com', 'js')
    try:
        return send_from_directory(js_path, filename)
    except Exception:
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
    # Para desarrollo local - PythonAnywhere no ejecuta este bloque
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
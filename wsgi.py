#!/usr/bin/env python3
"""
WSGI configuration for PythonAnywhere deployment
Account: AICC1082025152315.pythonanywhere.com
"""

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

if __name__ == "__main__":
    application.run()
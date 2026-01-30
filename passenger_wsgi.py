# Passenger WSGI file for Node.js applications on DreamHost
# This file tells Passenger to use Node.js instead of Python
# Passenger will automatically detect and use server.js

import sys
import os

# Add your project directory to the Python path
# (Passenger uses this to locate your app)
sys.path.insert(0, os.path.dirname(__file__))

# Passenger will automatically detect Node.js and run server.js
# No Python code needed here - this is just a marker file


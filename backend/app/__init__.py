# __init__.py
from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .extensions import db
from .routes import init_routes

def create_app(bool_wipe=False):
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

    # Setup Flask-Limiter
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,  # Ensures the IP address of the client is used for limiting
        default_limits=["1000 per hour"]
    )
    # Configure database paths in a separate function or file
    configure_app(app)

    # Initialize extensions like SQLAlchemy
    db.init_app(app)

    # Apply the database setup or migrations
    from .database import setup_database
    setup_database(app, bool_wipe)

    # Initialize routes
    init_routes(app)

    return app

def configure_app(app):
    import os
    db_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'db')
    if not os.path.exists(db_directory):
        os.makedirs(db_directory)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(db_directory, 'users.db')
    app.config['SQLALCHEMY_BINDS'] = {
        'posts': 'sqlite:///' + os.path.join(db_directory, 'posts.db')
    }
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

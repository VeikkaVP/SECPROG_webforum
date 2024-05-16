# routes.py
from flask import request, jsonify, make_response
from .extensions import db
from .models import User, Post
from sqlalchemy.exc import IntegrityError
import bcrypt, jwt, datetime, bleach

# Proper way to fetch your generated secret key
# import os
# SECRET_KEY = os.getenv('SECRET_KEY')

# For demo purposes lets use a simple not so secret key, replace with secret key generated with genkey.py for deployment
SECRET_KEY = 'abcd'

# Function to sanitize HTML content
def sanitize_html(html_content):
    allowed_tags = ['p', 'strong', 'em', 'a', 'ul', 'li', 'br']
    allowed_attributes = {'a': ['href', 'title']}
    return bleach.clean(html_content, tags=allowed_tags, attributes=allowed_attributes)

# Function to hash a password
def hash_password(password):
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password

# Function to check JWT token
def check_jwt(request):
    token = request.cookies.get('jwt')
    if not token:
        return None
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Function to create JWT token
def create_jwt(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

# Initialize routes
def init_routes(app):

    # Route for user registration
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data['username']
        password = data['password']
        hashed_password = hash_password(password)
        new_user = User(username=username, password_hash=hashed_password)
        try:
            db.session.add(new_user)
            db.session.commit()
            response = make_response(jsonify({'message': 'User registered successfully!'}), 201)
            return response
        except IntegrityError:
            db.session.rollback()
            response = make_response(jsonify({'message': 'Username already exists!'}), 409)
            return response

    # Route for user login
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data['username']
        password = data['password'].encode('utf-8')
        user = User.query.filter_by(username=username).first()
        if not user:
            response = make_response(jsonify({'message': 'User not found'}), 404)
            return response

        # Verify password
        if bcrypt.checkpw(password, user.password_hash):
            token = create_jwt(user.id)
            response = make_response(jsonify({'message': 'Logged in successfully!'}), 200)
            response.set_cookie('jwt', token, httponly=True, samesite='Lax')
            return response
        else:
            response = make_response(jsonify({'message': 'Invalid username or password'}), 401)
            return response

    # Route for user logout
    @app.route('/logout', methods=['POST'])
    def logout():
        decoded_token = check_jwt(request)
        if not decoded_token:
            return make_response(jsonify({'message': 'No user currently logged in.'}), 401)
        response = make_response(jsonify({'message': 'Logged out successfully!'}))
        response.set_cookie('jwt', '', expires=0)
        return response

    # Route for creating a new post
    @app.route('/post', methods=['POST'])
    def create_post():
        decoded_token = check_jwt(request)
        if not decoded_token:
            return make_response(jsonify({'message': 'Invalid or missing token!'}), 401)
        data = request.get_json()
        print(data)

        # Sanitize the user input
        title = sanitize_html(data['title'])
        text = sanitize_html(data['text'])
        creator = data['userName']

        # Create a new posting based on the sanitized text
        new_post = Post(title=title, creator=creator, text=text)
        try:
            db.session.add(new_post)
            db.session.commit()
            response = make_response(jsonify({'message': 'Post created successfully!'}), 201)
            return response
        except Exception as e:
            print(e)
            db.session.rollback()
            response = make_response(jsonify({'message': 'Failed to create post', 'error': str(e)}), 500)
            return response

    # Route for getting all posts
    @app.route('/posts', methods=['GET'])
    def get_posts():
        decoded_token = check_jwt(request)
        if not decoded_token:
            return make_response(jsonify({'message': 'Invalid or missing token!'}), 401)
        posts = Post.query.order_by(Post.timestamp.desc()).all()
        results = [{
            'id': post.id,
            'title': post.title,
            'creator': post.creator,
            'timestamp': post.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'text': post.text
        } for post in posts]
        return make_response(jsonify(results), 200)

# database.py
from .extensions import db
from .models import User, Post
from sqlalchemy.exc import IntegrityError
import bcrypt

def setup_database(app, bool_wipe):
    with app.app_context():
        if bool_wipe:
            db.drop_all()
            db.create_all()
            init_db_data()
        else:
            db.create_all()

def init_db_data():
    init_user_db()
    init_post_db()

def init_user_db():
    users = [{'username': 'admin', 'password': 'admin123'},]
    for user in users:
        hashed_password = bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=user['username'], password_hash=hashed_password)
        db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        print("Failed to add initial users.")

def init_post_db():
    posts = [{'title': 'Welcome', 'creator': 'admin', 'text': 'Welcome to the new forum!'},]
    for post in posts:
        new_post = Post(title=post['title'], creator=post['creator'], text=post['text'])
        db.session.add(new_post)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        print("Failed to add initial posts.")

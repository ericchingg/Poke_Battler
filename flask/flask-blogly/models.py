"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):

  __tablename__='users'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  first_name = db.Column(db.Text, nullable=False )
  last_name = db.Column(db.Text, nullable=False )
  image_url = db.Column(db.Text)
  

  @property
  def full_name(self):
    return f'{self.first_name} {self.last_name}'

class Post(db.Model):
   
   __tablename__='posts'
   id = db.Column(db.Integer, primary_key=True, autoincrement=True)
   title = db.Column(db.Text, nullable=False )
   content = db.Column(db.Text, nullable=False )
   created_at = db.Column(db.DateTime, default=datetime.datetime.now)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

   user = db.relationship('User', backref='posts', cascade='all')

class Tag(db.Model):

  __tablename__='tags'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.Text, unique=True)

  posts = db.relationship('Post', secondary='post_tags', backref='tags', cascade='all,delete')

class PostTag(db.Model):

  __tablename__='post_tags'
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True , nullable=False)
  tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True , nullable=False)

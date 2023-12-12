"""Blogly application."""

from flask import Flask, render_template, request, redirect
from models import db, connect_db, User
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'www'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.app_context().push()

connect_db(app)
db.create_all()

@app.route('/')
def go_to_users():
  return redirect('/users')

@app.route('/users')
def list_users():
  users = User.query.order_by(User.last_name, User.first_name).all()
  return render_template('users.html', users=users)

@app.route('/users/new')
def add_form():
  return render_template('add.html')

@app.route('/users/new', methods=['POST'])
def add_user():    
  new_user = User(
    first_name = request.form['first_name'], 
    last_name = request.form['last_name'],
    image_url = request.form['image_url']
  )

  db.session.add(new_user)
  db.session.commit()
    
  return redirect('/users')

@app.route('/users/<int:user_id>')
def user_page(user_id):
  user = User.query.get_or_404(user_id)
  return render_template('user_info.html', user=user)

@app.route('/users/<int:user_id>/edit')
def edit_form(user_id):
  user = User.query.get_or_404(user_id)
  return render_template('user_edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_page(user_id):

  user = User.query.get_or_404(user_id)
  user.first_name = request.form['first_name']
  user.last_name = request.form['last_name']
  user.image_url = request.form['image_url'] 

  db.session.add(user)
  db.session.commit()

  return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):

  user = User.query.get_or_404(user_id)

  db.session.delete(user)
  db.session.commit()

  return redirect('/users')


  



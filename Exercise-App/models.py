from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):

  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.Text, nullable=False, unique=True)
  email = db.Column(db.Text, nullable=False, unique=True)
  password = db.Column(db.Text, nullable=False)

  workouts = db.relationship('Workout', backref='users')

  @classmethod
  def signup(cls, username, email, password):

    hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')
    user = User(username=username, email=email, password=hashed_pwd)

    db.session.add(user)
    return user

  @classmethod
  def authenticate(cls, username, password):

    user = cls.query.filter_by(username=username).first()

    if user:
        is_auth = bcrypt.check_password_hash(user.password, password)
        if is_auth:
          return user

    return False

class Workout(db.Model):

  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.Text, nullable=False)
  description = db.Column(db.Text)
  duration = db.Column(db.Text)
  reps = db.Column(db.Text)
  
  exercises = db.relationship('Exercise', secondary='exercise_workout', backref='workouts')

class Exercise(db.Model):

  __tablename__ = 'exercises'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.Text, nullable=False, unique=True)
  type = db.Column(db.Text, nullable=False)
  muscle = db.Column(db.Text, nullable=False)
  equipment = db.Column(db.Text, nullable=False)
  difficulty = db.Column(db.Text, nullable=False)
  instructions = db.Column(db.Text, nullable=False)

class ExerciseWorkout(db.Model):

  __tablename__ = 'exercise_workout'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id', ondelete='CASCADE'), primary_key=True)
  exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id', ondelete='CASCADE'), primary_key=True)



def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
    db.create_all()
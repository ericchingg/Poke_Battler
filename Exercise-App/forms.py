from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, Length, NumberRange

class UserAddForm(FlaskForm):

  username = StringField('Username', validators=[DataRequired()])
  email = StringField('E-mail', validators=[DataRequired(), Email()])
  password = PasswordField('Password', validators=[Length(min=6)])

class LoginForm(FlaskForm):

  username = StringField('Username', validators=[DataRequired()])
  password = PasswordField('Password', validators=[Length(min=6)])

class WorkoutForm(FlaskForm):

  title = StringField('Name', validators=[DataRequired()])
  description = TextAreaField('Description')
  duration = IntegerField('Duration (Mins)', validators=[NumberRange(min=1, max=60)])
  sets = IntegerField('Number of sets', validators=[NumberRange(min=1, max=6)])
  reps = IntegerField('Reps',validators=[NumberRange(min=1, max=25)])

class SearchExercisesForm(FlaskForm):

  name = StringField('Name of Exercise', validators=[DataRequired()])

class NewExforWorkForm(FlaskForm):

  exercise = SelectField('Exercises', coerce=int)
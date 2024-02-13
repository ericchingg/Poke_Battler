from flask import Flask, redirect, render_template, session, g, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import requests, random

from models import db, connect_db, User, Workout, Exercise, ExerciseWorkout
from forms import UserAddForm, LoginForm, WorkoutForm, SearchExercisesForm, NewExforWorkForm
from secret import API_KEY, SECRET_KEY


CURR_USER_KEY = "curr_user"
app = Flask(__name__)
API_URL = 'https://api.api-ninjas.com/v1/exercises?name={}'


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///fitness'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = SECRET_KEY

debug = DebugToolbarExtension(app)

with app.app_context():
    connect_db(app)


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


###
@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
            )
            db.session.commit()

        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)

        return redirect("/")

    return render_template('signup.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")

        flash("Invalid credentials.", 'danger')

    return render_template('login.html', form=form)


@app.route('/logout')
def logout():

    do_logout()

    flash("You have successfully logged out.", 'success')
    return redirect("/login")


###
@app.route('/')
def home_page():

    if g.user:

        exercise = Exercise.query.all()
        rand_exercise = random.choice(exercise)
        
        return render_template('user/logged_in.html', rand_exercise=rand_exercise)

    return render_template('user/logged_out.html')

# @app.route('/users/<int:')


@app.route('/search', methods=['GET','POST'])
def search():

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = SearchExercisesForm()

    if form.validate_on_submit():
        name = form.name.data

        resp = requests.get(API_URL, params={'name': name}, headers={'X-Api-Key': API_KEY}).json()

        try:
            for res in resp:
                existing_ex = Exercise.query.filter_by(name=res['name']).first()

                if existing_ex is None:
                    exercise = Exercise(
                                name=res['name'], 
                                type=res['type'], 
                                muscle=res['muscle'], equipment=res['equipment'], difficulty=res['difficulty'], instructions=res['instructions'])
                    db.session.add(exercise)
            db.session.commit()
        except Exception as e:

            db.session.rollback()
        

        return render_template('exercise/search.html', resp=resp, form=form)

    return render_template('exercise/search.html', form=form)

# @app.route('/exercises/<name>')
# @search_results(name):




#     return render_template('search_results.html')

@app.route('/exercises')
def show_exercises():

    exercises = Exercise.query.all()

    return render_template('exercise/all.html', exercises=exercises)


@app.route('/exercises/<int:exercise_id>', methods=['GET'])
def exercise_details(exercise_id):

    exercise = Exercise.query.get_or_404(exercise_id)

    return render_template('exercise/exercise.html', exercise=exercise)

###
@app.route('/workouts')
def show_all_workouts():

    workouts = Workout.query.all()

    return render_template('workout/workouts.html', workouts=workouts)

@app.route('/workouts/<int:workout_id>', methods=['GET'])
def show_workout(workout_id):

    workout = Workout.query.get_or_404(workout_id)

    return render_template('workout/workout.html', workout=workout)


@app.route("/workouts/new", methods=["GET", "POST"])
def new_workout():

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = WorkoutForm()

    if form.validate_on_submit():
        
        title = form.title.data
        description = form.description.data
        duration = form.duration.data
        reps = form.reps.data
        user_id = session[CURR_USER_KEY]

        new_workout = Workout(title=title,              description=description, duration=duration, reps=reps, user_id=user_id)

        db.session.add(new_workout)
        db.session.commit()

        return redirect('/workouts')
        
    return render_template('workout/new_workout.html', form=form)

@app.route("/workouts/<int:workout_id>/add", methods=["GET", "POST"])
def add_ex_to_workout(workout_id):

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    workout = Workout.query.get_or_404(workout_id)
    form = NewExforWorkForm()

    workout_list = [w.id for w in workout.exercises]

    result = (db.session.query(Exercise.id, Exercise.name).filter(Exercise.id.notin_(workout_list)).all())

    form.exercise.choices = [(x.id, x.name) for x in result]
    
    if form.validate_on_submit():

          exercise_workout = ExerciseWorkout(exercise_id=form.exercise.data, workout_id=workout_id)

          db.session.add(exercise_workout)
          db.session.commit()

          return redirect(f"/workouts/{workout_id}")

    return render_template("workout/add_to_workout.html",
                             workout=workout,
                             form=form)

@app.route('/workouts/<int:workout_id>/delete', methods=["POST"])
def delete_workiut(workout_id):

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    workout = Workout.query.get_or_404(workout_id)

    if workout.user_id != g.user.id:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    
    db.session.delete(workout)
    db.session.commit()

    return redirect('/workouts')



@app.after_request
def add_header(req):
    """Add non-caching headers on every request."""

    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers['Cache-Control'] = 'public, max-age=0'
    return req

from flask import Flask, render_template, request , redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension 
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = '123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

user_answer = 'responses'

@app.route('/')
def start_page():

  session[user_answer] = []

  return render_template('start.html', satisfaction_survey=satisfaction_survey)

@app.route('/questions/<int:num>')
def show_questions(num):

  responses = session.get(user_answer)

  if (len(responses) != num):
    flash(f"Question number {num} is invalid.")
    return redirect(f"/questions/{len(responses)}")

  quest = satisfaction_survey.questions[num]

  return render_template('questions.html', 
  quest=quest, num=num)

@app.route('/answer', methods=['POST'])
def get_ans():
  choice = request.form['answer']
  responses = session[user_answer]
  responses.append(choice)
  session[user_answer] = responses

  if (len(responses) == len(satisfaction_survey.questions)):
    return redirect("/finish")

  else:
    return redirect(f"/questions/{len(responses)}")

@app.route('/finish')
def finish_survey():
  return render_template('finish.html')

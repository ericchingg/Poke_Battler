from flask import Flask, render_template, request , redirect, flash
from flask_debugtoolbar import DebugToolbarExtension 
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = '123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def start_page():
  return render_template('start.html', satisfaction_survey=satisfaction_survey)

@app.route('/questions/<int:num>')
def show_questions(num):

  if (len(responses) != num):
    flash(f"Question number {num} is invalid.")
    return redirect(f"/questions/{len(responses)}")

  quest = satisfaction_survey.questions[num]

  return render_template('questions.html', 
  quest=quest, num=num)

@app.route('/answer', methods=['POST'])
def get_ans():
  choice = request.form['answer']
  responses.append(choice)

  if (len(responses) == len(satisfaction_survey.questions)):
    return redirect("/finish")

  else:
    return redirect(f"/questions/{len(responses)}")

@app.route('/finish')
def finish_survey():
  return render_template('finish.html')

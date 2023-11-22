from boggle import Boggle
from flask import Flask, render_template, request, jsonify, session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'gametime'

boggle_game = Boggle()

@app.route('/')
def main():
  board = boggle_game.make_board()
  session['board'] = board
  highscore = session.get('highscore', 0)
  times_played = session.get('times_played', 0)

  return render_template('board.html', board = board, highscore = highscore, times_played = times_played)

@app.route('/check-word')
def check():
  word = request.args['word']
  board = session['board']
  response = boggle_game.check_valid_word(board, word)

  return jsonify({'result': response})

@app.route('/post-score', methods = ['POST'])
def submit():
  score = request.json['score']
  highscore = session.get('highscore', 0)
  times_played = session.get('times_played', 0)

  session['times_played'] = times_played + 1
  session['highscore'] = max(score, highscore)

  return jsonify(newRecord=score > highscore)


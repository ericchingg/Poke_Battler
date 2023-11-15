from flask import Flask, render_template, request, flash, redirect
import requests


app = Flask(__name__)
app.config['SECRET_KEY'] = 'money'

API_KEY = '65e725b3d330d0011033f263881263b8'

URL = f'http://api.exchangerate.host/convert?access_key={API_KEY}'

@app.route('/')
def main():
  return render_template('form.html')

@app.route('/results')
def calculate():
  try:
    from_currency = request.args.get('from')
    to_currency = request.args.get('to')
    amount = request.args.get('amount')

    endpoint = f"&from={from_currency}&to={to_currency}&amount={amount}&format=1&allow_redirects=False"

    updated_url = URL + endpoint
    req = requests.get(updated_url).json()
    res = round(req['result'])  

  except KeyError:
    flash('Input error. Please enter valid input.', 'error')
    return redirect('/')
    
  return render_template('results.html', 
                          from_currency = from_currency,
                          to_currency = to_currency,
                          amount = amount,
                          results = res)
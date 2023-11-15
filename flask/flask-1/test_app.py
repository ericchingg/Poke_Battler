from app import app
from unittest import TestCase

class AppTest(TestCase):
  def test_main(self):
    with app.test_client() as client:
      resp = client.get('/')
      html = resp.get_data(as_text=True)
      self.assertEqual(resp.status_code, 200)
      self.assertIn('<h1>Forex Converter</h1>', html)
  
  def test_calculate(self):
    with app.test_client() as client:

      resp = client.get('/results?from=usd&to=eur&amount=6')
      html = resp.get_data(as_text=True)
      self.assertEqual(resp.status_code, 200)
      self.assertIn('<p>Converting <b>usd</b> to <b>eur</b> for the amount of <b>6</b> will equal <b>6</b>.</p>', html)
  
  def test_redirect(self):
    with app.test_client() as client:
      resp = client.get('/results')
      self.assertEqual(resp.status_code, 302)
  


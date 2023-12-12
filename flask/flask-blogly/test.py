from unittest import TestCase

from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URL'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewsTest(TestCase):
  def setUp(self):
    User.query.delete()

    user = User(first_name='Test', last_name='Dummy',image_url='www.bear.com')
    db.session.add(user)
    db.session.commit()

    self.user_id = user.id

  def tearDown(self):
    db.session.rollback()

  def test_list(self):
    with app.test_client() as client:
      resp = client.get('/users')
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertIn('Dummy', html)

  def test_show_info(self):
    with app.test_client() as client:
      resp = client.get(f'/users/{self.user_id}')
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertIn('Test', html)


  def test_add(self):
    with app.test_client() as client:
      d= {'first_name': 'Trial', 'last_name': 'Subject', 'image_url': 'www.cat.com'}
      resp = client.post('/users/new',data=d, follow_redirects=True)
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertIn('Trial', html)
  
  def test_delete(self):
    with app.test_client() as client:
      resp = client.post(f'/users/{self.user_id}/delete', follow_redirects=True)
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertNotIn('Dummy', html)
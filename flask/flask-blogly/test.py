from unittest import TestCase

from app import app
from models import db, User, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewsTest(TestCase):
  def setUp(self):
    Post.query.delete()
    User.query.delete()    

    test_user = User(first_name='Test', last_name='Dummy',image_url='www.bear.com')
    db.session.add(test_user)
    db.session.commit()

    self.user_id = test_user.id

    test_post = Post(title='Test Post', content='This is a test post.', user_id=test_user.id)
    db.session.add(test_post)
    db.session.commit()

    self.post_id = test_post.id

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

class PostViewsTest(TestCase):
  def setUp(self):

    Post.query.delete()
    User.query.delete()

    test_user = User(first_name='Test', last_name='Dummy',image_url='www.bear.com')
    db.session.add(test_user)
    db.session.commit()

    self.user_id = test_user.id

    test_post = Post(title='Test Post', content='This is a test post.', user_id=test_user.id)
    db.session.add(test_post)
    db.session.commit()

    self.post_id = test_post.id

  def tearDown(self):
    db.session.rollback()

  def test_show_post(self):
    with app.test_client() as client:
      resp = client.get(f'/posts/{self.post_id}')
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertIn('This is a test post.', html)
  
  def test_add_post(self):
    with app.test_client() as client:
      d = {'title': 'Second Test', 'content': 'Testing 1,2,3', 'user_id': self.user_id}

      resp = client.post(f'/users/{self.user_id}/posts/new',data=d, follow_redirects=True)
      html = resp.get_data(as_text=True)

      self.assertEquals(resp.status_code, 200)
      self.assertIn('Second Test', html)

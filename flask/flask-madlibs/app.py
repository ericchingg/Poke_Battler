from flask import Flask , request , render_template
from stories import story

app = Flask(__name__)


@app.route("/")
def show_form():
    """Generate forms for user answers."""

    prompts = story.prompts

    return render_template("form.html", prompts=prompts)

@app.route("/story")
def show_story():
    """Show story with user answers."""

    text = story.generate(request.args)

    return render_template("stories.html", text=text)

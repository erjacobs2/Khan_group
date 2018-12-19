# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)


app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy

# Need to update sqlite database name reference
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///FireData121818.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

db = SQLAlchemy(app)

from .models import Fire

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def burn():
    results = db.session.query(Fire.cause, Fire.lat, Fire.lng).all()

    fire_data = {
        hover_text = [result[0] for result in results]
        lat = [result[1] for result in results]
        lng = [result[2] for result in results]
    }

    # fire_data = [{
    #     "type": "scattergeo",
    #     "locationmode": "USA-states",
    #     "lat": lat,
    #     "lng": lng,
    #     "text": hover_text,
    #     "hoverinfo": "text",
    #     "marker": {
    #         "size": 50,
    #         "line": {
    #             "color": "rgb(8,8,8)",
    #             "width": 1
    #         },
    #     }
    # }]

    return jsonify(fire_data)


if __name__ == "__main__":
    app.run()
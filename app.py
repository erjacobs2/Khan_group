# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)
# app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy

# Need to update sqlite database name reference
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/FireData121818.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

db = SQLAlchemy(app)

import models
# from models import Fire

# create route that renders index.html template
@app.route("/")
def home():
    results = db.session.query(models.Fire.STAT_CAUSE_DESCR, models.Fire.LATITUDE, models.Fire.LONGITUDE).all()

    fire_data = {
        "hover_text" : [result[0] for result in results],
        "lat" : [result[1] for result in results],
        "lng" : [result[2] for result in results]
        }

    fire_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": fire_data["lat"],
        "lng": fire_data["lng"],
        "text": fire_data["hover_text"],
        "hoverinfo": "text",
        "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(fire_data)

    # return render_template("map.html")

@app.route("/map")
def burn():

    return render_template("map.html")


if __name__ == "__main__":
    app.run()
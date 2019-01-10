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

db = SQLAlchemy(app)

import models

# create route that renders index.html template
@app.route("/")
def home():
    results = db.session.query(models.Fire.STAT_CAUSE_DESCR, models.Fire.LATITUDE, models.Fire.LONGITUDE, models.Fire.FIRE_YEAR, models.Fire.FIRE_NAME).all()

    fire_data = {
        "cause" : [result[0] for result in results],
        "lat" : [result[1] for result in results],
        "lng" : [result[2] for result in results],
        "year" : [result[3] for result in results],
        "hover_text" : [result[4] for result in results]
        }

    fire_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": fire_data["lat"],
        "lng": fire_data["lng"],
        "cause": fire_data["cause"],
        "text": fire_data["hover_text"],
        "year": fire_data["year"],
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
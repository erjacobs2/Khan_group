from app import db


class Fire(db.Model):
    __tablename__ = 'FireData121818'

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    year = db.Column(db.Integer)
    cause = db.Column(db.String)
    state = db.Column(db.String)
    name = db.Column(db.String)
    size = db.Column(db.Integer)
    classSize = db.Column(db.String)

    def __repr__(self):
        return '<Fire %r>' % (self.name)
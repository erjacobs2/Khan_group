from app import db


class Fire(db.Model):
    __tablename__ = 'FireData121818'

    id = db.Column(db.Integer, primary_key=True)
    LATITUDE = db.Column(db.Float)
    LONGITUDE = db.Column(db.Float)
    FIRE_YEAR = db.Column(db.Integer)
    STAT_CAUSE_DESCR = db.Column(db.String)
    STATE = db.Column(db.String)
    FIRE_NAME = db.Column(db.String)
    FIRE_SIZE = db.Column(db.Integer)
    FIRE_SIZE_CLASS = db.Column(db.String)

    def __repr__(self):
        return '<Fire %r>' % (self.name)
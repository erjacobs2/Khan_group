from .app import db


class Fire(db.Model):
    __tablename__ = 'fires'

    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lng = Column(Float)
    year = Column(Integer)
    cause = Column(String)
    state = Column(String)
    name = Column(String)
    size = Column(Integer)
    classSize = Column(String)

    def __repr__(self):
        return '<Fire %r>' % (self.name)
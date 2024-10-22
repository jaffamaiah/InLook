from exts import db

class Journal(db.Model):
    __tablename__ = 'journals'  # Optional: specify table name
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_added = db.Column(db.DateTime, default=db.func.now())  # You can define a default value

    # Methods
    def __repr__(self):
        return f"<Journal {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title = title
        self.description = description
        db.session.commit()

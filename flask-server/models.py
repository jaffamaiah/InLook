from exts import db

class Journal(db.Model):
    __tablename__ = "journals"  # Optional: specify table name
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    entry_text = db.Column(db.String, nullable=False)
    emotion = db.Column(db.String, nullable=False)
    date = db.Column(db.String, default=db.func.now())  # You can define a default value
    

    # Methods
    def __repr__(self):
        return f"<Journal {self.title}>"

    def save(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, entry_text):
        self.title = title
        self.entry_text = entry_text
        db.session.commit()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
        """returns string rep of object - password """
        return f"<User {self.password}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
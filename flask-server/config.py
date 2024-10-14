from decouple import config
# in terminal: in env, pip install python_decouple to use
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

# global configurations
class Config:
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS= config('SQLALCHEMY_TRACK_MODIFICATIONS', cast= bool)

#inherits from global
class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI= "sqlite:///"+os.path.join(BASE_DIR, 'dev.db')
    DEBUG=True
    SQLALCHEMY_ECHO= True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    pass

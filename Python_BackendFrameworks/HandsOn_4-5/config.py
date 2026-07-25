class Config:
    SECRET_KEY = "my-secret-key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///courses.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DEBUG = True
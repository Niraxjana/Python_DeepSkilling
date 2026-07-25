from flask import Flask, jsonify
from config import Config
from courses.routes import courses_bp

#handson5 sql alchemy imports
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize SQLAlchemy
#db = SQLAlchemy()
from extensions import db

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)
    # Connect SQLAlchemy with Flask
    db.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register Blueprint
    app.register_blueprint(courses_bp)

    # Import models so Flask-Migrate can detect them
    from courses import models



    # 404 Error Handler
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "Resource not found"
        }), 404

    # 500 Error Handler
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "status": "error",
            "message": "Internal Server Error"
        }), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run()
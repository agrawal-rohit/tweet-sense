# project/server/config.py
import os

class BaseConfig:
    """Base configuration."""
    FLASK_APP="main/__init__.py"
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious')
    DEBUG = False
    CONSUMER_KEY = '<YOUR TWITTER API CONSUMER KEY>'
    CONSUMER_SECRET = '<YOUR TWITTER API CONSUMER SECRET>'
    ACCESS_TOKEN = '<YOUR TWITTER API ACCESS TOKEN>'
    ACCESS_TOKEN_SECRET = '<YOUR TWITTER ACCESS TOKEN SECRET>'

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    FLASK_ENV="development"

class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    FLASK_ENV="testing"


class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    FLASK_ENV="production"

from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_admin import Admin
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand


mail = Mail()
db = SQLAlchemy()
bcrypt = Bcrypt()
cors = CORS()
migrate = Migrate()
import pymysql
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Database credentials
MYSQL_USER = "root"
MYSQL_PASSWORD = "rehan15"
MYSQL_HOST = "localhost"
MYSQL_DB = "atharva"

# Create Database if it doesn't exist
def init_db_server():
    try:
        # Connect to MySQL server without specifying a database
        connection = pymysql.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD
        )
        cursor = connection.cursor()
        # Create database
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {MYSQL_DB}")
        connection.commit()
        cursor.close()
        connection.close()
        print(f"Database '{MYSQL_DB}' ensured.")
    except Exception as e:
        print(f"Error initializing database server: {e}")

# Call init
init_db_server()

# SQLAlchemy Setup
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

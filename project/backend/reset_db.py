from database import engine
from models import Base

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)
print("Done. Next restart of Uvicorn will recreate them with new schema.")

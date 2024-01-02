from pymongo.mongo_client import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

uri = os.getenv("MONGODB_URI")
client = MongoClient(uri)
database = client["FYP-Project"]

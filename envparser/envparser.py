from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__)[0:-10], '.env.local')

# Load the .env.local file
load_dotenv(dotenv_path=dotenv_path)

# Get the environment variables
POE_API_KEY = os.getenv('POE_API_KEY')
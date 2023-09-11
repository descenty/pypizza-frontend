import os
from dotenv import load_dotenv

load_dotenv()

with open("Caddyfile", "w") as f:
    f.write(f'{os.getenv("APP_HOST")} {{\n\treverse_proxy /* app:3000\n}}')

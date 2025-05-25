from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader, APIKeyQuery, APIKeyCookie
import os
from dotenv import load_dotenv

load_dotenv()


api_key_header = APIKeyHeader(name="X-API-Key", auto_error=True)


API_KEY = os.getenv("API_KEY") 


async def get_api_key(api_key: str = Security(api_key_header)):
    if API_KEY is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server API Key is not configured."
        )
    if api_key == API_KEY:
        return api_key 
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials - Invalid API Key",
            headers={"WWW-Authenticate": "X-API-Key"},
        )
    


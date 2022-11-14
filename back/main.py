from fastapi import FastAPI
from routes.lontakari import lontakari
from routes.fyritoka import fyritoka 
app = FastAPI()
app.include_router(lontakari)
app.include_router(fyritoka)
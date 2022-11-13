from typing import Union
from fastapi.responses import FileResponse
from fastapi import FastAPI
import funkir as f


app = FastAPI()
favicon_path = 'favicon.ico'
@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)

@app.get("/")
def read_root():
    return {"Hellossss": "World"}


@app.get("/løntakari/{starvsfolk_id}")
def heinta_starvfolk():
    return f.heinta_starvfolk()


from typing import Union
from fastapi.responses import FileResponse
from fastapi import FastAPI

app = FastAPI()
favicon_path = 'favicon.ico'
@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)

@app.get("/")
def read_root():
    return {"Hellossss": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}







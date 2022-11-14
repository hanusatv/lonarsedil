from fastapi import FastAPI
from routes.routes import lontakari,fyritoka
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()
app.include_router(lontakari)
app.include_router(fyritoka)

## Hetta ger eina mappu til static so nu er index.html osv i back/static/Dummyfront
app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/")
async def read_index():
    return FileResponse('static\DummyFront\index.html')
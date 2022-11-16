from fastapi import FastAPI
from routes.routes import lontakari,fyritoka
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lontakari)
app.include_router(fyritoka)

## Hetta ger eina mappu til static so nu er index.html osv i back/static/Dummyfront
app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/")
async def read_index():
    return FileResponse('static\DummyFront\index.html')
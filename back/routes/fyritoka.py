from fastapi import APIRouter
from models.models import Fyritoka
from config.fyritokadb import collection
from schemas.lontakari import serializeDict, serializeList
from bson import ObjectId
fyritoka = APIRouter() 

@fyritoka.get('/fyritoka/')
async def heinta_allar_lontakarir():
    return serializeList(collection.find())

@fyritoka.post('/fyritoka/')
async def skapa_lontakara(fyritoka: Fyritoka):
    collection.insert_one(dict(fyritoka))
    return serializeList(collection.find())

@fyritoka.put('/fyritoka/{id}')
async def dagfør_lontakara(id,fyritoka: Fyritoka):
    collection.find_one_and_update({"_id":ObjectId(id)},{
        "$set":dict(fyritoka)
    })
    return serializeDict(collection.find_one({"_id":ObjectId(id)}))

@fyritoka.delete('/fyritoka/{id}')
async def strika_lontakara(id,fyritoka: Fyritoka):
    return serializeDict(collection.find_one_and_delete({"_id":ObjectId(id)}))
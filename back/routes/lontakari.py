from fastapi import APIRouter
from models.models import Lontakari
from config.db import collection
from schemas.lontakari import serializeDict, serializeList
from bson import ObjectId
lontakari = APIRouter() 

@lontakari.get('/lontakari/')
async def heinta_allir_lontakarir():
    return serializeList(collection.find())

@lontakari.post('/lontakari/')
async def skapa_lontakara(lontakari: Lontakari):
    collection.insert_one(dict(lontakari))
    return serializeList(collection.find())

@lontakari.put('/lontakari/{id}')
async def dagfør_lontakara(id,lontakari: Lontakari):
    collection.find_one_and_update({"_id":ObjectId(id)},{
        "$set":dict(lontakari)
    })
    return serializeDict(collection.find_one({"_id":ObjectId(id)}))

@lontakari.delete('/lontakari/{id}')
async def strika_lontakara(id,lontakari: Lontakari):
    return serializeDict(collection.find_one_and_delete({"_id":ObjectId(id)}))
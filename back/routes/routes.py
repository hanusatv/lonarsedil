from fastapi import APIRouter
from models.models import Lontakari,Fyritoka
from config.db import collection
from schemas.lontakari import serializeDict, serializeList
from bson import ObjectId
lontakari = APIRouter() 
fyritoka = APIRouter() 

# heilta allar løntakara
@lontakari.get('/lontakari/')
async def heinta_allir_lontakarir():
    return serializeList(collection.find())

# heinta ein løntakara
@lontakari.get('/lontakari/{id}')
async def heinta_ein_lontakara(id):
    return serializeDict(collection.find_one({"_id":ObjectId(id)}))

# upprætta ein løntakara
@lontakari.post('/lontakari/')
async def skapa_lontakara(lontakari: Lontakari):
    collection.insert_one(dict(lontakari))
    return serializeList(collection.find())

# Broyt ein løntakara
@lontakari.put('/lontakari/{id}')
async def dagfør_lontakara(id,lontakari: Lontakari):
    collection.find_one_and_update({"_id":ObjectId(id)},{
        "$set":dict(lontakari)
    })
    return serializeDict(collection.find_one({"_id":ObjectId(id)}))

# Sletta ein løntakara
@lontakari.delete('/lontakari/{id}')
async def strika_lontakara(id,lontakari: Lontakari):
    return serializeDict(collection.find_one_and_delete({"_id":ObjectId(id)}))

# heilta allar fyritøkur
@fyritoka.get('/fyritoka/')
async def heinta_allar_fyritokir():
    return serializeList(collection.find())

# upprætta eina fyritøku
@fyritoka.post('/fyritoka/')
async def skapa_fyritoku(fyritoka: Fyritoka):
    collection.insert_one(dict(fyritoka))
    return serializeList(collection.find())

# Broyt eina fyritøku
@fyritoka.put('/fyritoka/{id}')
async def dagfør_fyritoku(id,fyritoka: Fyritoka):
    collection.find_one_and_update({"_id":ObjectId(id)},{
        "$set":dict(fyritoka)
    })
    return serializeDict(collection.find_one({"_id":ObjectId(id)}))

# Sletta eina fyritøku
@fyritoka.delete('/fyritoka/{id}')
async def strika_fyritoku(id,fyritoka: Fyritoka):
    return serializeDict(collection.find_one_and_delete({"_id":ObjectId(id)}))
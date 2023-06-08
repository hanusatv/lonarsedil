from fastapi import APIRouter
from models.models import Lontakari, Fyritoka
from config.db import collection
from config.fyritokadb import collection as fyritokadb
from schemas.lontakari import serializeDict, serializeList
from bson import ObjectId

lontakari = APIRouter()
fyritoka = APIRouter()

# heilta allar løntakara


@lontakari.get("/lontakari/")
async def heinta_allir_lontakarir():
    return serializeList(collection.find())


# heinta ein løntakara


@lontakari.get("/lontakari/{id}")
async def heinta_ein_lontakara(id):
    return serializeDict(collection.find_one({"_id": ObjectId(id)}))


# upprætta ein løntakara


@lontakari.post("/lontakari/")
async def skapa_lontakara():
    record = {}
    result = collection.insert_one(record)
    return serializeDict(collection.find_one({"_id": result.inserted_id}))


# Broyt ein løntakara


@lontakari.put("/lontakari/{id}")
async def dagfør_lontakara(id, felt: dict):
    collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": felt})
    return serializeDict(collection.find_one({"_id": ObjectId(id)}))


# Sletta ein løntakara


@lontakari.delete("/lontakari/{id}")
async def strika_lontakara(id):
    return serializeDict(collection.find_one_and_delete({"_id": ObjectId(id)}))


# heilta allar fyritøkur


@fyritoka.get("/fyritoka/")
async def heinta_allar_fyritokir():
    return serializeList(fyritokadb.find())


# heinta eina fyritøku


@fyritoka.get("/fyritoka/{id}")
async def heinta_ein_lontakara(id):
    return serializeDict(collection.find_one({"_id": ObjectId(id)}))


# upprætta eina fyritøku


@fyritoka.post("/fyritoka/")
async def skapa_fyritoku(fyritoka: Fyritoka):
    collection.insert_one(dict(fyritoka))
    return serializeList(fyritokadb.find())


# Broyt eina fyritøku


@fyritoka.put("/fyritoka/{id}")
async def dagfør_fyritoku(id, fyritoka: Fyritoka):
    fyritokadb.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(fyritoka)})
    return serializeDict(fyritokadb.find_one({"_id": ObjectId(id)}))


# Sletta eina fyritøku


@fyritoka.delete("/fyritoka/{id}")
async def strika_fyritoku(id, fyritoka: Fyritoka):
    return serializeDict(fyritokadb.find_one_and_delete({"_id": ObjectId(id)}))

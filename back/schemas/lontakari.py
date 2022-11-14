def userEntity(lontakari) -> dict:
    return {
        "id":str(lontakari["_id"]),
        "Navn":lontakari["Navn"],
        "Aldur":lontakari["Aldur"],
        "Gøta":lontakari["Gøta"],
        "Bydur":lontakari["Bydur"],
        "PostNummar":lontakari["PostNummar"],
        "Land":lontakari["Land"],
        "KontoNummar":lontakari["KontoNummar"],
        "Løn":lontakari["Løn"],
    }

def usersEntity(entity) -> list:
    return [userEntity(lontakari) for lontakari in entity]
#Best way

def serializeDict(a) -> dict:
    return {**{i:str(a[i]) for i in a if i=='_id'},**{i:a[i] for i in a if i!='_id'}}

def serializeList(entity) -> list:
    return [serializeDict(a) for a in entity]

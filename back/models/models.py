from pydantic import BaseModel

class Lontakari(BaseModel):
    Fyritoka: str
    Navn: str
    Aldur: str
    Gøta: str
    Bydur: str
    PostNummar: int
    Land: str
    KontoNummar: str
    Løn: int

class Fyritoka(BaseModel):
    Navn: str
    Gøta: str
    Bydur: str
    PostNummar: str
    Land: str
    Email: str

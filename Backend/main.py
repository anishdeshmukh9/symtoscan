from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

    
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class selected_desease(BaseModel):
    sym : list[str]


class Mlpredict:
    pass




class myapp:    
    @staticmethod
    @app.post('/dashboard')
    async def dashBoard(data : selected_desease):
        for a in data.sym:
            print(a)
        return "hello"
    










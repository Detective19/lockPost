from fastapi import FastAPI
from database import engine, SessionLocal
from models import Base, Review
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message":"backend chal raha h bhai"
    }


@app.get("/reviews")
def get_reviews():

    db = SessionLocal()

    reviews = db.query(Review).all()

    return reviews
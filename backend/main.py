from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import Base, Review
from fastapi.responses import FileResponse
import csv

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
        "message": "backend chal raha h bhai"
    }


@app.get("/reviews")
def get_reviews():

    db = SessionLocal()

    reviews = db.query(
        Review
    ).all()

    return reviews


@app.patch("/reviews/{review_id}")
def update_review(review_id: str):

    db = SessionLocal()

    review = (
        db.query(Review)
        .filter(
            Review.id == review_id
        )
        .first()
    )

    if not review:
        return {
            "message": "not found"
        }

    review.status = "resolved"

    db.commit()

    return {
        "message": "resolved"
    }
@app.get("/export")
def export_reviews():

    db = SessionLocal()

    reviews = db.query(Review).all()

    with open(
        "reviews_export.csv",
        "w",
        newline=""
    ) as file:

        writer = csv.writer(file)

        writer.writerow([
            "ID",
            "Customer",
            "Match",
            "Confidence",
            "Status"
        ])

        for review in reviews:

            writer.writerow([
                review.id,
                review.customer_name,
                review.match,
                review.confidence,
                review.status
            ])

    return FileResponse(
        "reviews_export.csv",
        media_type="text/csv",
        filename="reviews_export.csv"
    )
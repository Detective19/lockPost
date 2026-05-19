import json
from models import Review
from database import SessionLocal

db = SessionLocal()

with open("sample_data.json", "r") as f:
    data = json.load(f)

for item in data:

    customer_name = None

    if item["order"]:
        customer_name = item["order"].get("customer")

    review = Review(
        id=item["id"],
        customer_name=customer_name,
        match=item["match"],
        confidence=item["confidence"],
        order_json=item["order"],
        delivery_json=item["delivery"]
    )

    db.add(review)

db.commit()

print("Data inserted successfully")
from sqlalchemy import Column, String, Float, JSON
from database import Base


class Review(Base):

    __tablename__ = "reviews"

    id = Column(String, primary_key=True)

    customer_name = Column(String)

    match = Column(String)

    confidence = Column(Float)

    status = Column(String, default="pending")

    notes = Column(String)

    order_json = Column(JSON)

    delivery_json = Column(JSON)
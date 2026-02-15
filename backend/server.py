from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Integricate API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "Integricate API"}


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    doc = {
        "name": form.name,
        "email": form.email,
        "subject": form.subject,
        "message": form.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "read": False,
    }
    result = await db.contacts.insert_one(doc)
    return {
        "success": True,
        "message": "Thank you for reaching out! We will get back to you soon.",
        "id": str(result.inserted_id),
    }


@app.get("/api/contacts")
async def get_contacts():
    contacts = []
    async for doc in db.contacts.find({}, {"_id": 0}):
        contacts.append(doc)
    return {"contacts": contacts}


@app.get("/api/sitemap")
async def get_sitemap():
    return {
        "sections": [
            {"name": "Home", "anchor": "#home", "description": "Welcome to Integricate"},
            {"name": "Services", "anchor": "#services", "description": "Our UAS services"},
            {"name": "Product", "anchor": "#product", "description": "AIR.01.001 Open Source UAS Code"},
            {"name": "Contact", "anchor": "#contact", "description": "Get in touch with us"},
        ]
    }

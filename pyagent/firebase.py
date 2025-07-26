import firebase_admin
from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    firebase_admin.initialize_app()

db = firestore.client()

async def save_user(data: dict) -> str:
    if 'id' not in data or not isinstance(data['id'], str):
        raise ValueError('User data must include a string id')
    await db.collection('users').document(data['id']).set(data, merge=True)
    return 'User data saved to Firebase'

async def get_user(user_id: str):
    doc = await db.collection('users').document(user_id).get()
    return doc.to_dict() if doc.exists else None

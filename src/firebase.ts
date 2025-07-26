import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp()
}

const db = admin.firestore()

export async function saveUser(data: Record<string, unknown>): Promise<string> {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('User data must include a string id')
  }
  await db.collection('users').doc(data.id).set(data, { merge: true })
  return 'User data saved to Firebase'
}

export async function getUser(id: string): Promise<Record<string, unknown> | null> {
  const doc = await db.collection('users').doc(id).get()
  return doc.exists ? doc.data()! : null
}

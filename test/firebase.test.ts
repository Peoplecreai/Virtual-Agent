const set = jest.fn(async () => undefined)
const doc = jest.fn(() => ({ set }))
const collection = jest.fn(() => ({ doc }))

jest.mock('firebase-admin', () => ({
  __esModule: true,
  default: {
    firestore: () => ({ collection }),
    apps: [],
    initializeApp: jest.fn()
  }
}))

import { saveUser } from '../src/firebase'
import admin from 'firebase-admin'

describe('saveUser', () => {
  it('saves data to firestore', async () => {
    const res = await saveUser({ id: '123', name: 'A' })
    expect(res).toBe('User data saved to Firebase')
    expect(collection).toHaveBeenCalledWith('users')
    expect(doc).toHaveBeenCalledWith('123')
    expect(set).toHaveBeenCalledWith({ id: '123', name: 'A' }, { merge: true })
  })
})

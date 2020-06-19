import { db } from '../../src/persistence/db'
import sinon from 'sinon'

after(async () => {  
    const _db = new db()
    await _db.reset()
})
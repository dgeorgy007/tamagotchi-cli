import { expect } from "chai";
import { bedLogic } from '../../../src/actions/userDriven'
import { db } from '../../../src/persistence/db'
import sinon from 'sinon'

describe('bedLogic', function() {
    it('should put tamagotchi to bed if not asleep and wake up 15 yrs older', async () => {
      const _db = new db()
      await _db.setItem('age', 0)
      await _db.setItem('in_bed', false)

      await bedLogic(_db, true)

      expect(await _db.getItem('age')).equal(15)
    }); 
  });
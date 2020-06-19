import { expect } from "chai";
import { autoDeathMonitor } from '../../../src/actions/automated'
import { db } from '../../../src/persistence/db'
import sinon from 'sinon'

describe('autoDeathMonitor', function() {
    it('should reset all tamagotchi"s vitals when age >= 100', async () => {
      const _db = new db()
      await _db.setItem('age', 120)
      await _db.setItem('health', 50)

      await autoDeathMonitor(_db, true)

      expect(await _db.getItem('health')).equal(undefined)
    }); 
  });


  describe('autoDeathMonitor', function() {
    it('should reset all tamagotchi"s vitals when health <= 0', async () => {
      const _db = new db()      
      await _db.setItem('health', -20)
      await _db.setItem('age', 30)

      await autoDeathMonitor(_db, true)

      expect(await _db.getItem('health')).equal(undefined)
    }); 
  });
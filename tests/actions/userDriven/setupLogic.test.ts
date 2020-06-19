import { expect } from "chai";
import { setupLogic } from '../../../src/actions/userDriven'
import { db } from '../../../src/persistence/db'
import sinon from 'sinon'

// TODO: console.logs in sut's should be suppressed

describe('setupLogic', function() {
    it('should set correct name and colour', async () => {
      const _db = new db()

      let answers: any = {
        name: 'David',
        colour: 'Red'
      }
      await setupLogic(_db, answers)


      expect(await _db.getItem('name')).equal('David');
      expect(await _db.getItem('colour')).equal('Red');
    }); 
  });


  describe('setupLogic', function() {
    it('should correctly initialize vitals', async () => {
      const _db = new db()

      let answers: any = {
        name: 'David',
        colour: 'Red'
      }
      await setupLogic(_db, answers)


      expect(await _db.getItem('age')).equal(0);
      expect(await _db.getItem('health')).equal(100);
      expect(await _db.getItem('poo_count')).equal(0);
      expect(await _db.getItem('hunger')).equal(0);
      expect(await _db.getItem('in_bed')).equal(false);
    }); 
  });
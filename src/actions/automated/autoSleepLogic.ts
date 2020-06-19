import storage from 'node-persist'
import { delay } from './helpers'
import { db as Db } from '../../persistence/db'

export const autoSleepLogic = async (db:Db) => {
 try {
   //  await storage.init()  // TODO: This should move to start.ts in root folder
    
   while (1 === 1) {
      let in_bed = await db.getItem('in_bed')
      if (in_bed === true) {
         await delay(10)
      }
      else {
         await db.setItem('in_bed', true)
         await delay(10)
         await db.setItem('in_bed', false)

         // NOTE: This data must be read after the delay since it may have changed before-hand
         let age = await db.getItem('age')
         let poo_count = await db.getItem('poo_count')

         await db.setItem('age', age+=10)
         await db.setItem('poo_count', poo_count+=1)
         await delay(10)
      }
   }
 } catch (error) {
  console.log(error)
 }
 return
}
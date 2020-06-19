import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'

import { delay } from './helpers'
import { db as Db } from '../../persistence/db'

export const autoDeathMonitor = async (db:Db, useTestTimeout?:boolean) => {
 try {
   //  await db.init()  // TODO: This should move to start.ts in root folder
    
   while (1==1) {
      await delay(useTestTimeout === true ? 1 : 60)
      // await db.init()
      const health = await db.getItem('health')
      const age = await db.getItem('age')

      if (health <= 0 || age >= 100) {
         await db.reset()
         console.log('Ohh noooooo :( Your Tamagotchi has died!!! Start a new game by running "npm start"')
         // process.exit() // TODO: This is failing
         return;
      }
   }
 } catch (error) {
  console.log(error)
 }
 return
}
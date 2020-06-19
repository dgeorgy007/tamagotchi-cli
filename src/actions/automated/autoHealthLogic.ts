import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'

import { delay } from './helpers'

export const autoHealthLogic = async (db:Db) => {
 try {
   //  await db.init()  // TODO: This should move to start.ts in root folder

   while (1 === 1) {
      // await db.init()

      await delay(60)
      
      const hunger = await db.getItem('hunger')
      let health = await db.getItem('health')
      // await db.init()

      if (hunger >= 50) {
         await db.setItem('health', health-=10)
      }
   }
 } catch (error) {
  console.log(error)
 }
 return
}
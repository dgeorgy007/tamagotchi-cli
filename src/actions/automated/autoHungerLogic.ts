import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'

import { delay } from './helpers'

export const autoHungerLogic = async (db:Db) => {
 try {
   //  await db.init()  // TODO: This should move to start.ts in root folder

   while (1 === 1) {
      await delay(20)
      // await db.init()

      let hunger = await db.getItem('hunger')
      await db.setItem('hunger', hunger+=10)
   }
 } catch (error) {
  console.log(error)
 }
 return
}
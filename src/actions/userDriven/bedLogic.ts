import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'
import { delay } from '../automated/helpers'

export const bedLogic = async (db:Db, useTestTimeout?:boolean) => {
 try {
   //  await db.init()  // TODO: This should move to start.ts in root folder
    let in_bed = await db.getItem('in_bed')
    
    const spinner = ora('Attempting to put your Tamagotchi to bed...').start();

    if (in_bed) {
      console.log(chalk.redBright('Your Tamagotchi cannot be put to bed right now because it is already asleep zzzzz... '))
    }
    else {
       await db.setItem('in_bed', true)
       await delay(useTestTimeout === true ? 1 : 10)
       await db.setItem('in_bed', false)

       let age = await db.getItem('age')
       await db.setItem('age', age+=15)

      //  setTimeout(async (db: Db) => {
      //    //  await db.init()
      //     await db.setItem('in_bed', false)

      //     let age = await db.getItem('age')
      //     await db.setItem('age', age+=15)
      //  }, 10000)
       console.log(chalk.redBright('Your Tamagotchi has gone to sleep and will wake up after 10 seconds zzzzz... '))
    }
    spinner.stop()
 } catch (error) {
  console.log(error)
 }
 return;
}
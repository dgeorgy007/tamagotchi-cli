import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'

export const statusLogic = async (db:Db) => {
 try {
    // await db.init()  // TODO: This should move to start.ts in root folder
    
    const spinner = ora('Attempting to display the status of your Tamagotchi...').start();

    console.log(chalk.blueBright(`Your Tamagotchi's health is: ${await db.valuesWithKeyMatch('health')[0]}`))
    const isInBedStatus = await db.valuesWithKeyMatch('IN_BED')[0] === true ? "in bed" : "is not in bed"
    console.log(chalk.greenBright(`Your Tamagotchi is ${isInBedStatus}`))

    console.log(chalk.redBright(`Your Tamagotchi has been in bed ${await db.valuesWithKeyMatch('TIMES_IN_BED')[0]} times`))

    const autoSleepStatus = await db.valuesWithKeyMatch('IS_AUTO_SLEEP')[0] === true ? "configured for Auto-sleep"
      : "not configured for Auto-sleep"
    console.log(chalk.bgGrey(`Your Tamagotchi is ${autoSleepStatus}`))
    
    spinner.stop()
 } catch (error) {
  console.log(error)
 }
 return;
}
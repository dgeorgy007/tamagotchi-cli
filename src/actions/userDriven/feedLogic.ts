import chalk from 'chalk'
import ora from 'ora'
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'

export const feedLogic = async (db:Db, answers: any) => {
 try {
  // await db.init()  // TODO: This should move to start.ts in root folder
  const name = await db.getItem('name')
  let hunger = await db.getItem('hunger')
  let poo_count = await db.getItem('poo_count')

  const spinner = ora(`Attempting to feed your Tamagotchi ${name}...`).start();
  if (hunger >= 10 && ['Y', 'y'].includes(answers.shouldFeed)) {
    await db.setItem('hunger', hunger-=10)
    await db.setItem('poo_count', poo_count+=1)

    console.log(chalk.greenBright(`Your Tamagotchi '${name}' has been fed!!`))
    console.log(chalk.green(`It's hunger is now: ${hunger}!! :)`))
  }
  else {
    console.log(chalk.redBright('Either your Tamagotchi is not hungry and/or based on your response; your Tamagotchi has not been fed :('))
  }
  spinner.stop()
 } catch (error) {
  console.log(error)
 }
 return;
}
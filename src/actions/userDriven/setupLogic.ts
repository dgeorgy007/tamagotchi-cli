import chalk, { visible } from 'chalk'
import ora from 'ora';
import storage from 'node-persist'
import { db as Db } from '../../persistence/db'

export const setupLogic = async (db:Db, answers: any) => {
    try {
        const spinner = ora('Setting up your new Tamagotchi...').start();

        // await db.init()
        // await db.clear();
        await db.reset()

        // Non-vitals
        await db.setItem('is_setup', true)
        await db.setItem('name', answers.name)
        await db.setItem('colour', answers.colour)

        // Vitals
        await db.setItem('age', 0)
        await db.setItem('health', 100)
        await db.setItem('poo_count', 0)
        await db.setItem('hunger', 0)   // TODO: Should start out hungry
        await db.setItem('in_bed', false)

        spinner.stop()
        console.log(chalk.greenBright(`Your Tamagotchi named ${answers.name} has been created`))
    }
    catch (error) {
        console.log(error)
    }
    return
}
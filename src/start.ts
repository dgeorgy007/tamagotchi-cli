#!/usr/bin/env ts-node-script

import './polyfills';
import readline from 'readline';

import { Command } from 'commander'; 
const command = new Command();
import * as inquirer from 'inquirer';
import chalk from 'chalk'
import storage from 'node-persist'
import { db } from './persistence/db'

import { setupLogic, feedLogic, bedLogic }  from './actions/userDriven';
import { setupQuestions } from './questions/setupQuestions';
import { feedQuestions } from './questions/feedQuestions';

import { autoDeathMonitor, autoHealthLogic, autoHungerLogic, autoSleepLogic } from './actions/automated'

const appDesc = 'Tamagotchi Command Line Interface Game'
let _db = new db();

command.exitOverride(async () => {
    // TODO: This doesn't seem to be doing anything 
    // await promptUser("")
    // return true
    // process.on('exit', async () => {
        // await _db.init()
        // await _db.reset();
    // })
});

// TODO: Should be in own helper file
function promptUser(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<string>(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


command
 .version('1.0.0')
 .description(appDesc)

 // User Driven Functions/Actions
 command
 .command('begin')
 .alias('b')
 .description(`Welcome to the ${appDesc}!!`)
 .action(async () => {
  console.log(chalk.magenta(`=========*** Welcome to the ${appDesc} ***==========`))

  // Clear the storage since we are starting up
//   await _db.init()
//   await _db.clear();
    // _db = new db()

  await command.parseAsync(['status', ''], { from: 'user' });
})

command
 .command('new')
 .alias('n')
 .description('Setup your Tamagotchi')
 .action(() => {
  console.log(chalk.yellow(`=========*** Setup your Tamagotchi ***==========`))
  inquirer.prompt(setupQuestions).then(async (answers) => {
    await setupLogic(_db, answers)
    await command.parseAsync(['status', ''], { from: 'user' })
  })
})

command
 .command('feed')
 .alias('f')
 .description('Feed your Tamagotchi!')
 .action(() => {
  console.log(chalk.yellow(`=========*** Feed your Tamagotchi ***==========`))
  inquirer.prompt(feedQuestions).then(async (answers) => {
      await feedLogic(_db, answers)
      await command.parseAsync(['status', ''], { from: 'user' })
  })
})

command
 .command('sleep')
 .alias('s')
 .description('Put your Tamagotchi to bed!')
 .action(async () => {
    console.log(chalk.yellow(`=========*** Put your Tamagotchi to bed ***==========`))
    await bedLogic(_db)
    await command.parseAsync(['status', ''], { from: 'user' });
})

// Interactive Menu Prompt
command
 .command('status')
 .alias('m')
 .description('Enter one of the following commands')
 .action(async () => {
    // await _db.init()
    const is_setup = await _db.getItem('is_setup')
    // console.log('is_setup', is_setup)
    if (is_setup !== true) {
        await command.parseAsync(['new', ''], { from: 'user' });
    }
    else {
        console.log(chalk.yellow(`\n\n\n=========*** VITALS ***==========`))
        console.log(chalk.yellow(`Age: ${await _db.getItem('age')}`))
        console.log(chalk.yellow(`Health: ${await _db.getItem('health')}`))
        console.log(chalk.yellow(`Poo count: ${await _db.getItem('poo_count')}`))
        console.log(chalk.yellow(`Hunger level: ${await _db.getItem('hunger')}`))
        console.log(chalk.yellow(`Is in bed: ${await _db.getItem('in_bed')}`))

        console.log(chalk.blue(`\n=========*** COMMANDS ***==========`))
        command.commands.map(cmd => {
            if (cmd.name() !== 'begin' && cmd.name() !== 'new') {
                console.log(chalk.blue(cmd.name()))
            }
        })
        const selectedMenuCommand: string = await promptUser("");
        await command.parseAsync([selectedMenuCommand, ''], { from: 'user' });
    }
})

// Auto functions
autoDeathMonitor(_db).catch(e => {
    console.log(e)
})
autoHealthLogic(_db).catch(e => {
    console.log(e)
})
autoHungerLogic(_db).catch(e => {
    console.log(e)
})
autoSleepLogic(_db).catch(e => {
    console.log(e)
})

// Variables to track
    // 1. Vitals: Health, age, poop score, hunger
    // 2. Non-vitals: Name, colour

// User driven Functions
    // 1. Feed
        // Can only feed if hungry - i.e. hunger >= 10 (in increments of 10) - this will decrement the hunger field
        // Poop count increases by 1
        // If hunger >= 50 then health decreases by 10 every 60 seconds (Auto)
            // Auto Death counter: monitors health and if it gets <=0 - inform user
                // Also monitors age: if age is >= 100 then tamagotchi dies (kill child processes)
    // 2. Put to bed
        // Can only be put to bed if not already asleep
        // If not asleep - will sleep for 30s (Need a state variable to know if asleep to stop auto-sleep)
            // After 30s: will age by 5yrs (And turn off state variable)
        // Auto-sleep:
            // Cannot sleep if already sleeping (based on state variable)
            // After 30s: will age by 5yrsy (And turn off state variable)
    // 3. Auto-lose health
        // Lose health by 10 every 60 secs if hunger >= 50
    // 4. Poo
        // Each poo has a duration until it is cleaned
        // Auto: Every 60 secs poop_count++


// Automated Functions/Actions

// 1. Auto-sleeping
    // What is needed?
    // Does duration of sleep matter? 
    // Age should increase after sleeping (after waking up?) - does user get prompted?  What about in manual mode?
// 2. Lose health from hunger
// 3. Poop without prompting
// 4. Age from birth to death

// if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
//     command.parseAsync(['menu', ''], { from: 'user' });
// }

command.parse(['begin', ''], { from: 'user' });

// process.on('exit', async () => {
//     // await _db.init()
//     await _db.reset();
// })
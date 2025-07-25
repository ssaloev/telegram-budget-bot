import { main } from './db'
import { startBot } from "./bot";
import {logInfo} from "./utils/log";

main().then(() => {
    logInfo('Mango DB connected');
    startBot();
}).catch(err => console.log(err));
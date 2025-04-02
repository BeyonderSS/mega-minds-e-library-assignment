import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, "../../public/config.json");

const config = JSON.parse(await readFile(configPath, "utf8"));

/**
 * Beyonder console logger
 */
function beyonderLogger() {
    console.log("=".repeat(50));
    console.log(`Howdy!!!!!! I'm ${config.name},`);
    console.log("Your Friendly Neighbourhood Dev ! 🚀");
    console.log("\nCheck out my other works:");
    console.log(`GitHub    : https://github.com/${config.github}`);
    console.log(`LinkedIn  : https://linkedin.com/in/${config.linkedIn}`);
    console.log(config.ascii);
    console.log("=".repeat(50));
}

export { beyonderLogger };

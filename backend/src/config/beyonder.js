import config from "../../public/config.json" assert { type: "json" };

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
import { Event } from "../structures/Event";

export default new Event("ready", (client) => {
    console.log("Bot is ready!")
    client.user.setActivity("with your mom")
})
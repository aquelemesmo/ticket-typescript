import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    PermissionsBitField,
    ButtonStyle,
    AnyComponentBuilder
} from "discord.js";
import {Command} from "../structures/Command";

export default new Command({
    name: "ticket",
    description: "Sistema de ticket",
    userPermissions: [PermissionsBitField.Flags.Administrator],
    run: ({ client, interaction }) => {
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(new ButtonBuilder().setCustomId("create_ticket").setLabel("Criar ticket").setStyle(ButtonStyle.Primary))
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Sistema de ticket")
            .setDescription("Clique no botão para criar um ticket")
        interaction.followUp({embeds: [embed], components: [row]})

    }
})
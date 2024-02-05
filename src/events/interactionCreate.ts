import {
    CommandInteractionOptionResolver,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextChannel, PermissionsBitField
} from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setCustomId("fechar_ticket").setLabel("Fechar ticket").setStyle(ButtonStyle.Danger))
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("Esse comando não existe parceiro");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }

    if(interaction.isButton()) {
        if(interaction.customId === "create_ticket") {
            const canal: TextChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.id}`,
                type: ChannelType.GuildText,
                parent: "1079058670278688799"
            })

            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("Ticket criado")
                .setDescription("Um ticket foi criado, aguarde um membro da staff para atender")
            canal.send({embeds: [embed], components: [row]})


            interaction.reply({content: "Ticket criado com sucesso!", ephemeral: true})
        }

        if(interaction.customId === "fechar_ticket") {
            if(!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({content: "Você não tem permissão para fechar esse ticket", ephemeral: true})
            }

            interaction.reply({content: "Ticket será fechado em 5 segundos...", ephemeral: true})

            setTimeout(() => {
                interaction.channel?.delete()
            }, 5000)
        }
    }
});
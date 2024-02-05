import {ExtendedClient} from "../structures/Client";
import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver, GuildMember,
    PermissionResolvable
} from "discord.js";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client?: ExtendedClient,
    interaction: CommandInteraction,
    args?: CommandInteractionOptionResolver
}

type RunFunction = (options:RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;
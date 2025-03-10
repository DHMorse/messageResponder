/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { MessageActions } from "@webpack/common";
import { Message } from "discord-types/general";

// Define plugin settings
const settings = definePluginSettings({
    targetUserId: {
        type: OptionType.STRING,
        description: "User ID to scan messages from",
        default: "",
    },
    targetChannelId: {
        type: OptionType.STRING,
        description: "Channel ID to scan messages in",
        default: "",
    },
    triggerContent: {
        type: OptionType.STRING,
        description: "Message content to trigger response (leave empty to respond to any message)",
        default: "",
    },
    responseMessages: {
        type: OptionType.STRING,
        description: "List of possible response messages, separated by | character",
        default: "Hello!|How are you?|Nice to see you!|👋|What's up?",
    },
    responseDelay: {
        type: OptionType.NUMBER,
        description: "Delay before sending response (in milliseconds)",
        default: 1000,
    },
    enabled: {
        type: OptionType.BOOLEAN,
        description: "Enable/disable automatic responses",
        default: true,
    }
});

const plugin = definePlugin({
    name: "MessageResponder",
    description: "Automatically responds to messages from a specific user in a specific channel with random messages from a predefined list",
    authors: [Devs.Ven],
    settings,

    // Function to send a random message from the list
    sendRandomMessage(channelId: string) {
        if (!settings.store.enabled) return;

        // Get the list of possible responses
        const responses = settings.store.responseMessages.split("|");
        if (responses.length === 0) return;

        // Select a random response
        const randomIndex = Math.floor(Math.random() * responses.length);
        const messageContent = responses[randomIndex];

        // Send the message after the specified delay
        setTimeout(() => {
            MessageActions.sendMessage(
                channelId,
                {
                    content: messageContent,
                    invalidEmojis: [],
                    tts: false,
                    validNonShortcutEmojis: []
                }
            );
        }, settings.store.responseDelay);
    },

    // Flux event handler for new messages
    flux: {
        // Use arrow function to maintain the correct 'this' context
        MESSAGE_CREATE: data => {
            const message = data.message as Message;

            // Check if the message is from the target user
            if (message.author.id !== settings.store.targetUserId) return;

            // Check if the message is in the target channel
            if (message.channel_id !== settings.store.targetChannelId) return;

            // Check if the message contains the trigger content (if specified)
            if (settings.store.triggerContent && !message.content.includes(settings.store.triggerContent)) return;

            // Call the plugin's method directly
            plugin.sendRandomMessage(message.channel_id);
        }
    },

    start() {
        // Nothing needed here as we're using flux events
    },

    stop() {
        // Nothing needed here as flux events are automatically unsubscribed
    }
});

export default plugin;

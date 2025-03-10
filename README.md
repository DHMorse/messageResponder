# MessageResponder

A Vencord plugin that automatically responds to messages from a specific user in a specific channel with random messages from a predefined list.

## Features

- Automatically detect messages from a specific user in a specific channel
- Respond with random messages from a customizable list
- Optional trigger content filter to only respond to specific messages
- Configurable response delay
- Easy to enable/disable through settings

## Settings

- **Target User ID**: The Discord user ID whose messages you want to respond to
- **Target Channel ID**: The Discord channel ID where the plugin should be active
- **Trigger Content**: Optional text that must be present in the message to trigger a response (leave empty to respond to any message)
- **Response Messages**: List of possible response messages, separated by the | character
- **Response Delay**: Time to wait before sending the response (in milliseconds)
- **Enabled**: Toggle to enable/disable the plugin functionality

## Usage

1. Set the target user ID and channel ID in the plugin settings
2. Customize your response messages (separated by | character)
3. Adjust other settings as needed
4. When the specified user sends a message in the target channel, the plugin will automatically respond with a random message from your list

## Example

If you set:
- Target User ID: 123456789012345678
- Target Channel ID: 987654321098765432
- Trigger Content: "hello"
- Response Messages: "Hi there!|Hello!|Hey, how's it going?|👋"
- Response Delay: 1000

The plugin will wait for user 123456789012345678 to send a message containing "hello" in channel 987654321098765432, then respond with one of the messages from your list after a 1-second delay.

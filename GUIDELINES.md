# Guidelines for AI tools to generate application prototype

Read the [README](./README.md) file first. Do not implement what is in TODO list.
The application is named "Smart Home Controller".

## Application structure
The application should have 3 screens:
- Home screen with grid power status
- Log screen with a list of power-cut-off events
- Settings screen

### Home screen
The screen should display the current power status. 
There should be a switch to turn on/off notifications.

### Log screen
The screen should display list of power cut off events. 
Events should be stored in local storage.

### Settings screen
The screen should display settings for the application. 
There should be a setting for a Telegram bot api key (stored in secure storage)
There should be messages text that will be sent by bot in case power off/on events

## Technologies to use

Use redux and redux persist. Use expo router for tab navigation. 
Application should support internationalization. Default language is Russian.
All UI messages should be translated to English or Russian

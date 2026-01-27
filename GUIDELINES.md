# Guidelines for AI tools to generate application prototype

Read the [README](./README.md) file first. Do not implement what is in TODO list.
The application is named "Smart Home Controller".

## Project structure

- `app` — application screens and router configuration (expo-router)
- `assets` — static assets: images, fonts
- `components` — reusable UI components
- `constants` — application constants (colors, themes)
- `hooks` — custom React hooks, including background task logic
- `i18n` — internationalization configuration and translation files
- `store` — Redux state management (slices, thunks, persistence)

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
There should be a setting for Telegram chat IDs (comma separated)
There should be messages text that will be sent by bot in case power off/on events

## Technologies to use

Use redux and redux persist. Use expo router for tab navigation. 
Application should support internationalization. Default language is Russian.
All UI messages should be translated to English or Russian.

Use secure storage in order to store sensitive data, such as Telegram bot api key.

## Background Execution

The application should be able to run and save telegram messages even when device sleeps.
For this purpose, `expo-task-manager Telegram if the state changes.
Permissions `RECEIVE_BOOT_COMPLETED` and `WAKE_LOCK` are required on` and `expo-background-fetch` are used to monitor battery status in the background.
The background task is registered to check battery state periodically and notify via Android.
On iOS, `fetch` and `processing` background modes should be enabled.

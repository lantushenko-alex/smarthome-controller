# Smart Home Controller Application

This application an addon to smart home controlled by Tuya or Mija IoT platform.


This application is an add-on to a smart home controlled by the Tuya or 
Mijia IoT platform.

The primary feature is to detect grid power-off events. 
There are no reliable devices on the market that can cope with this. 
A mobile phone with the app installed should be plugged into a power outlet. If grid power goes down, the application sends a message via a Telegram bot.


## TODO list

Automatically send a request to the Tuya API to shut down the power switch when power is off. Such behavior is required when your home is powered by solar panels and grid power. If grid power is not available, you want to switch off some power-consuming devices.


## Development notes

In order to run the application use `npx expo start --tunnel`

# FPARMA ACRE 2 RADIO GUIDE

### What is ACRE2?
The core feature of ACRE has always been radios, which has undergone major improvements in ACRE2. A new, extremely powerful and modular distributed data system allows for a whole manner of new features to be simulated in a robust and reliable way, and powers the most realistic real time radio simulation released in either the civilian or military market.


### ACRE2 Features

* Real time voice occlusion for world objects, including buildings.
* Babel language system that allows you to implement virtual languages on other players.
* Multi-channel audio, allowing people on the radio to be heard locally as well.
* Radios with external speakers.
* A highly detailed AN/PRC-148 simulation (still a WIP implementing all features).
* Increased performance and stability.
* A highly customizable and documented framework for the creation of radios.
* A highly customizable and documented framework for implementing different game modes (persistent world, replays, logging, external data storage, external radio control).
* Customizable sound configs that allow traditional patching of sounds played in ACRE via Arma addons.
* Customizable radio presets, allowing groups to define radio presets in additional addons for mission makers to take advantage of (also see the F3 framework).
Enhanced and easily configurable vehicle sound occlusion and intercoms.

## How to install ACRE2:
* Normally, when you first download the repo, or acre has updated, A3sync will prompt a auto install for acre. However, if this fails use the steps below.

1. Navigate to your arma 3 directory
2. Navigate to  the @ACRE2\plugin folder
3. Once in the plugin folder, you will have two DLLS required for ACRE2 to communicate with TeamsSpeak 3.
4. Copy / cut these dlls into: TeamSpeak 3 Client\plugins
5. Running TS3 as Administrator, go to Settings > Plugins and turn on the ACRE2 plugin.
6. Adjust the post and pre mix volumes to your liking in plugin settings.

## List of ACRE2 Radios:
| Name | Range | Weight |
| :-----|:-----:| :------:|
|*PRC 343*|1 km|1 kg|
|*PRC 148*|6-8 km|2 kg|
|*PRC 152*|6-15 km|3 kg|
|*PRC 77*|20-30 km|4 kg|
|*PRC 177*|20-30 km|5 kg|
***
## Default keybinds
##### It is highly recommend you change these to your liking by going to Controls>Configure Addons > ACRE2

| Action | Keybind |
| :-----|:-----:|
|*Volume control*| Tab|
|*Default Radio key*| Capslock|
|*Radio Left Ear*| Ctrl+Shift+Left Arrow|
|*Radio Right Ear*| Ctrl+Shift+Right Arrow|
|*Radio Center Ear*| Ctrl+Shift+Up Arrow|
|*Toggle Headset*| Ctrl+Shift+Down Arrow|
|*Cycle Radio*| Ctrl+Alt+Shift|
|*Open Radio*|Ctrl+Alt+Capslock|

## Further reading into Radio Communications

#### Basic Radio Etiquette:
If there is one thing you take out of this guide, I hope it comes from this section. It is essential that when you speak over radios such as the 148 or 117 as a squad leader, platoon leader, or an attached asset that you follow these formats when you speak.

#### Call-signs:
Every squad leader, attached asset, and platoon leader who is utilizing a 148 or a 117 should have a designated call-sign. This is to ensure that everyone knows who is speaking and to whom they are speaking to. Here is an example where each squad within the platoon is given a phonetic name to identify themselves with; the platoon leader is given the moniker “Command” to identify himself with. On a side note, it would greatly benefit you to learn at least the first ten letters of the phonetic alphabet if you do not already know them.

#### Initiating and Responding to Calls:
This is just about the most important piece of radio etiquette, initiating a call with another unit properly. To do this is very simple; simply say “You, this is me.” As an example if you are in command of Alpha squad and trying to contact command you would say “Command, this is Alpha” to which Command would respond with something along the lines of “Alpha this is Command, send it.” At this point you would then proceed to tell Command or whoever whatever it is that you need to tell him or her.

If someone is calling you over the radio, but you do not have time to listen to whatever they need to say due to combat or some other pressing matter do not be afraid to respond with “You this is me, wait.” Once you have the ability to listen to what they need to tell you though, do not forget to reinitiate the conversation with “You this is me” at which point they must now acknowledge you before you proceed to inquire about what they wanted to tell you.

If you are trying to initiate contact with someone and they do not respond within 15 seconds do not be afraid to try and raise them again, however after the third attempt of making contact and failing it may be time to dispatch a squad to search for the missing squad or platoon commander.

#### Brevity:
Once the conversation has been initiated, keep your message simple and short. Think of what you’re going to say before you begin to transmit over the radios, do not “umm” and “uhh” over the radio. Keep it brief, no more than 10-15 seconds maximum. If you lose your train of thought while speaking over either a 148 or 117 simply state “Wait one” and take a moment to collect your thoughts before re-initiating the conversation. Remember, keep it brief, keep it brief, and keep it brief.

#### Acknowledging Speakers:
Make sure you always acknowledge the person who is speaking to you, even if what they are telling you does not require you to give some sort of a response. After someone speaks to you over the radio simply state something such as “Roger” to let them know that you have heard what they had to say and understand it. Should you fail to hear what someone said or did not quite understand what they were saying do not be afraid to say something such as “You this is me, repeat your last” at which point the previous speaker should restate their message to you.

## Example Conversation
So if you’re still confused about how to put all this together, here’s an example diagram of how a conversation can go. In this example, we’ll follow a conversation between Alpha squad’s team leader, and the platoon commander.


[PICTURE](https://vgy.me/lMUCwW.png)


## Troubleshooting
* Go through every step again.
* Restart Teamspeak.
* Try downgrading TS. (Make sure you're on 0.12)
* Make sure you have Microsoft Visual C++ 2010 redists installed
* Make sure ArmA and Teamspeak are installed on the same harddrive.
* Run Arma as Administrator as well as TS3.

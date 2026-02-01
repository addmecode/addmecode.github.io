+++
date = '2026-01-31T19:00:00+01:00'
title = 'Global Settings'
+++

How to configure one global settings.json for all your AL project.
\
\
There is no built-in mechanism to do this, but you can do it by creating a settings.json file in your AL project as a symbolic link to the global settings.json file.
\
\
For this purpose:
1. I keep my global settings.json in repo on github - [al-settings](https://github.com/addmecode/al-settings)
2. I cloned the repo to my localhost
3. I prepared powershell script - `Add-SymbolicLinkForSettingsJson.ps1` that is available in [scripts-bc](https://github.com/addmecode/scripts-bc)
\
The script does the following:
    - invokes git pull in the location with the global settings.json
    - asks the user to confirm whether to remove settings.json from the AL project if it already exists
    - creates the settings.json in AL project as a symbolic link to the global settings.json 

\
\
Now, when I create a new AL project, all I have to do is run the `Add-SymbolicLinkForSettingsJson.ps1` script with the correct paths to the settings files, and I can be sure that the settings is up to date.


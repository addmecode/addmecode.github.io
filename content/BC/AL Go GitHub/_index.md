+++
date = '2026-02-09T10:19:00+01:00'
title = 'AL-Go GitHub'
weight = 55
+++

> AL-Go for GitHub is a set of GitHub templates and actions, which can be used to setup and maintain professional DevOps processes for your Business Central AL projects.

## Useful Links
- [AL-Go](https://github.com/microsoft/AL-Go)
- [AL-Go Workshop](https://github.com/microsoft/AL-Go/blob/main/Workshop/Index.md)
- [AL-Go for GitHub - freddysblog](https://freddysblog.com/2022/04/26/al-go-for-github/)
- [AL-Go Settings](https://github.com/microsoft/AL-Go/blob/main/Scenarios/settings.md#unusedALGoSystemFiles)
- [AL-Go Settings Schema](https://raw.githubusercontent.com/microsoft/AL-Go-Actions/v8.2/.Modules/settings.schema.json)

## How to start
I reccomend to use this tutorial as starting point - [GetStarted](https://github.com/microsoft/AL-Go/blob/main/Scenarios/GetStarted.md)


Here you:
- Create a new repo based on the AL-Go Template
- Create a new app using github action
- Make changes in the new sample app
- See how github workflow is building your app after you pushed the changes to remote

## Tips
- You can control which code analyzer the workflow uses by setting them in the settings.json: `enableCodeCop`, `enableUICop`, `customCodeCops`
- You can specify your own ruleset using `rulesetFile` and `enableExternalRulesets`. The rulset file must be in the project. 

## How to use external ruleset
If you want to use external ruleset file, i.e. using link to file on github, you need to create a local ruleset file with the reference to the external one. I.e. create `algo.ruleset.json` inside .AL-Go directory:
```json
{
    "name": "Addmecode ruleset",
    "description": "Custom ruleset from Addmecode",
    "includedRuleSets": [
        {
            "action": "Default",
            "path": "https://raw.githubusercontent.com/addmecode/al-ruleset/refs/heads/main/custom.ruleset.json"
        }
    ],
    "rules": []
}
```

Add the following to the `settings.json` from the .AL-Go directory
```json
{
  "rulesetFile": ".AL-Go/algo.ruleset.json",
  "enableExternalRulesets": true
}
```


## Samples 
Example settings and ruleset files can be found here: [al-settings](https://github.com/addmecode/al-settings)


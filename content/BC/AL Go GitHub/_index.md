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
- You can specify your own ruleset using `rulesetFile` and `enableExternalRulesets`


Example settings.json
```json
{
  "$schema": "https://raw.githubusercontent.com/microsoft/AL-Go-Actions/v8.2/.Modules/settings.schema.json",
  "country": "us",
  "appFolders": [],
  "testFolders": [],
  "bcptTestFolders": [],
  "enableCodeCop": true,
  "enableUICop": true,
  "customCodeCops": [
    "${analyzerFolder}BusinessCentral.LinterCop.dll"
  ],
  "rulesetFile": "https://raw.githubusercontent.com/addmecode/al-settings/refs/heads/main/custom.ruleset.json",
  "enableExternalRulesets": true
}
```


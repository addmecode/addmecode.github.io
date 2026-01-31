+++
date = '2026-01-31T19:00:00+01:00'
title = 'Rule Set'
+++

You can change action for any of the analyzer rule by configuring your own custom rule set.

## Local Rule Set
You can use rule set defined in your rule set json.

1. Create json file i.e. `custom.ruleset.json` with your own action for the rules you want, i.e
```json
{
    "name": "Addmecode ruleset",
    "description": "Custom ruleset from Addmecode",
    "rules": [
        {
            "id": "AA0248",
            "action": "Warning",
            "justification": "Using 'this' makes code more clear"
        }
    ]
}
```
2. Modify your `settings.json` 
- set `al.ruleSetPath` to the path of the json file
```json
{
    "al.ruleSetPath": "./custom.ruleset.json"
}
```


## External rule set
You can use rule set defined in external json. The json can be i.e. in a GitHub repository.

1. Get url for the external json
- display raw content of the json
![How to display raw content of the rule set json in GitHub-1](/images/how-to-display-raw-content-of-the-rule-set-json-in-github-1.png?width=600px)
- get url of the opened file
![How to display raw content of the rule set json in GitHub-2](/images/how-to-display-raw-content-of-the-rule-set-json-in-github-2.png?width=600px)
2. Modify your `settings.json` 
- set `al.ruleSetPath` to the copied url
- set `al.enableExternalRulesets` to true
```json
{
    "al.ruleSetPath": "https://raw.githubusercontent.com/addmecode/al-ruleset/refs/heads/main/custom.ruleset.json",
    "al.enableExternalRulesets": true
}
```

## Mix Local And External Rule Set
You can mix both approaches.

1. Create json file i.e. `custom.ruleset.json` with the reference to the external rule set and your own action for the rules you want, i.e
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
    "rules": [
        {
            "id": "AA0218",
            "action": "Hidden",
            "justification": "I dont like tooltips"
        }
    ]
}
```
2. Modify your `settings.json` 
- set `al.ruleSetPath` to the path of the json file
- set `al.enableExternalRulesets` to true
```json
{
    "al.ruleSetPath": "./custom.ruleset.json",
    "al.enableExternalRulesets": true
}
```
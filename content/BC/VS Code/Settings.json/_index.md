+++
date = '2026-01-19T21:00:00+01:00'
title = 'Settings.json'
+++

Useful properties for the .vscode/settings.json

## Code Analyzers
`al.codeAnalyzers` enables specific code analyzers that validate your code against best practices.
\
More info - [Code analysis tool](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-using-code-analysis-tool)
\
\
There is also a `LinterCop` extension that provides additional code analyzer - `${analyzerFolder}BusinessCentral.LinterCop.dll`
\
Instruction how to enable it, is in the extension documentation.

## Custom Rule Set
`al.ruleSetPath` specifies path to the json file with your custom ruleset i.e. `./custom.ruleset.json`
`al.enableExternalRulesets` enables external rule sets.
\
More info about the custom rule set - [Rule Set](../rule-set/)



## alOutline.codeCleanupActions
Provided by `AZ AL Dev Tools/AL Code Outline` extension.
\
It describes what action will be run when `AZ AL Dev Tools: Run Code Cleanup` is invoked:
![AZ AL Dev Tools/AL Code Outline](/images/az-al-dev-tools-al-code-oultine.png)

Some of the actions need additional parameters, you can specify them after you run the code cleanup.
\
If you don't want to select them each time, you can set the default values in the settings.json, i.e. 
- `alOutline.defaultDataClassification`
- `alOutline.defaultRemoveEmptyTriggersSettings`
- `alOutline.reuseToolTipsFromDependencies`
- `alOutline.defaultRemoveUnusedVariablesSettings`

More details can be found here: 
- [al-code-outline](https://github.com/anzwdev/al-code-outline) 
- [az-al-dev-tools-update](https://anzwdev.wordpress.com/2022/01/22/az-al-dev-tools-update/)


The available actions:
```json
{
"alOutline.defaultDataClassification": "CustomerContent",
"alOutline.defaultRemoveEmptyTriggersSettings": {
    "removeTriggers": true,
    "removeSubscribers": true,
    "ignoreComments": true
},
"alOutline.reuseToolTipsFromDependencies": [
    "*"
],
"alOutline.defaultRemoveUnusedVariablesSettings": {
    "removeGlobalVariables": true,
    "removeProtectedGlobalVariables": true,
    "removeLocalVariables": true,
    "removeLocalMethodParameters": true
},
"alOutline.codeCleanupActions": [
        "AddApplicationAreas",
        "AddDataClassifications",
        "AddEnumValuesCaptions",
        "AddMissingParentheses",
        "AddObjectCaptions",
        "AddPageFieldCaptions",
        "AddTableFieldCaptions",
        "AddToolTips",
        "CollapseEmptyBrackets",
        "ConvertObjectIdsToNames",
        "FixIdentifiersCase",
        "FixKeywordsCase",
        "FormatDocument",
        "LockRemovedFieldCaptions",
        "MakeFlowFieldsReadOnly",
        "OneStatementPerLine",
        "RefreshToolTips",
        "RemoveBeginEnd",
        "RemoveEmptyLines",
        "RemoveEmptySections",
        "RemoveEmptyTriggers",
        "RemoveProceduresSemicolon",
        "RemoveRedundantAppAreas",
        "RemoveRedundantDataClassification",
        "RemoveStrSubstNoFromError",
        "RemoveUnusedUsings",
        "RemoveUnusedVariables",
        "RemoveWithStatements",
        "SortCustomizations",
        "SortPermissions",
        "SortPermissionSetList",
        "SortProcedures",
        "SortProperties",
        "SortReportColumns",
        "SortTableFields",
        "SortTriggers",
        "SortUsings",
        "SortVariables",
        "TrimTrailingWhitespace"
    ]
}
```

## CRS
Provided by `waldo's CRS AL Language Extension`.
\
The extension provides a lot of useful properties, including object and file name management.
\
More details can be found here: [crs-al-language-extension](https://github.com/waldo1001/crs-al-language-extension) 

## My settings.json
```json
{
    "CRS.FileNamePattern": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.FileNamePatternExtensions": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.FileNamePatternPageCustomizations": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.OnSaveAlFileAction": "Rename",
    "CRS.ObjectNamePrefix": "AMC ",
    "CRS.RemovePrefixFromFilename": false,
    "todo-tree.regex.regexCaseSensitive": false,
    "alOutline.defaultDataClassification": "CustomerContent",
    "alOutline.defaultRemoveEmptyTriggersSettings": {
        "removeTriggers": true,
        "removeSubscribers": true,
        "ignoreComments": true
    },
    "alOutline.reuseToolTipsFromDependencies": [
        "*"
    ],
    "alOutline.defaultRemoveUnusedVariablesSettings": {
        "removeGlobalVariables": true,
        "removeProtectedGlobalVariables": true,
        "removeLocalVariables": true,
        "removeLocalMethodParameters": true
    },
    "alOutline.codeCleanupActions": [
        "AddApplicationAreas",
        "AddDataClassifications",
        "AddEnumValuesCaptions",
        "AddMissingParentheses",
        "AddObjectCaptions",
        // "AddPageFieldCaptions",
        "AddTableFieldCaptions",
        "AddToolTips",
        "CollapseEmptyBrackets",
        "ConvertObjectIdsToNames",
        "FixIdentifiersCase",
        "FixKeywordsCase",
        "FormatDocument",
        "LockRemovedFieldCaptions",
        "MakeFlowFieldsReadOnly",
        "OneStatementPerLine",
        "RefreshToolTips",
        "RemoveBeginEnd",
        "RemoveEmptyLines",
        "RemoveEmptySections",
        "RemoveEmptyTriggers",
        "RemoveProceduresSemicolon",
        "RemoveRedundantAppAreas",
        "RemoveRedundantDataClassification",
        "RemoveStrSubstNoFromError",
        "RemoveUnusedUsings",
        "RemoveUnusedVariables",
        "RemoveWithStatements",
        "SortCustomizations",
        "SortPermissions",
        "SortPermissionSetList",
        // "SortProcedures",
        "SortProperties",
        "SortReportColumns",
        "SortTableFields",
        "SortTriggers",
        "SortUsings",
        "SortVariables",
        "TrimTrailingWhitespace"
    ]
}
```

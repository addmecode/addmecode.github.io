+++
date = '2026-01-19T21:00:00+01:00'
title = 'Settings.json'
+++

Useful properties for the .vscode/settings.json

## alOutline.codeCleanupActions
Provided by `AZ AL Dev Tools/AL Code Outline` extension.
\
It describes what action will be run when `AZ AL Dev Tools: Run Code Cleanup` is invoked:
![AZ AL Dev Tools/AL Code Outline](/images/az-al-dev-tools-al-code-oultine.png)


More details can be found here: [al-code-outline](https://github.com/anzwdev/al-code-outline) 
\
The available actions:
```json
{
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
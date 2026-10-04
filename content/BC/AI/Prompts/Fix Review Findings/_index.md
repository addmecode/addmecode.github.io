+++
date = '2026-10-04T00:00:00+02:00'
title = 'Fix review findings'
weight = 40
+++

After [creating a review report]({{% relref "../Create a BCQuality Report/_index.md" %}}), start a new session and replace the filename below with your report.

```text
Read `Docs/bcquality-cr-YYYYMMDD-HHmm.md` and compare the findings with `Docs/project-doc.md`. Fix only findings that do not conflict with the design and are not planned for a later task. Use the orchestrator.
```

AL corrections use the same workflow: compile and publish the main app, then compile, publish and run tests for the test app if one exists.

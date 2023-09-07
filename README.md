# teleport-cms-mappers
Mapping utilities for understanding external headless CMS data.

## Release process
Once the changes are merged into the `main` branch.
- Always make sure, you make a `tag` from the version.
- And always bump only the `patch` version.
- Create a release on the GitHub repo with the same tag name.

## Why we need to bump only the patch version?

Eg: 1.0.4 -> becomes 1.0.5

Since at the time of installation, the package managers pull the latest patch version available.

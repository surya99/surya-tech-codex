# External setup checklist

## GitHub repository URL

Open the repository homepage, click the gear icon beside **About**, and set the website to:

`https://surya99.github.io/surya-tech-codex/`

## Giscus comments and reactions

1. Enable GitHub Discussions in repository Settings → General → Features.
2. Install the Giscus GitHub App for this repository.
3. Open https://giscus.app and select this repository.
4. Choose the `pathname` mapping and enable reactions.
5. Copy `data-repo-id` and `data-category-id` into `src/config.ts`.

## Google Analytics

Create a GA4 web data stream and place its measurement ID in `src/config.ts` as `gaMeasurementId`.

## Newsletter

Choose a provider with double opt-in and unsubscribe management. Replace the current RSS-first subscription panel with the provider form only after the sender identity and privacy text are ready.

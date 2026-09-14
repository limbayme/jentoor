# Jentoor Nutraceuticals

Premium international manufacturing site for Jentoor, combining evidence-led brand storytelling, real factory media and an interactive Three.js formula experience.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Set `NEXT_PUBLIC_ASSET_ORIGIN=https://media.jentoor.com` during the production build after the COS objects have been uploaded and verified. This moves media and PDFs to COS/CDN; JavaScript, CSS and fonts remain on the main site origin. Local development defaults to files under `public/`.

The repeatable COS upload command is `deploy/sync-cos.sh`. It expects Tencent Cloud COSCLI to be configured with the `jentoor` bucket alias; credentials stay in COSCLI's encrypted user config and are never committed.

Public certificates are presented with their legal entity and scope. Raw source materials and social account credentials are intentionally excluded from this repository.
## Media Update History

### 2026-09-14
- Added 20 new image assets
- Content includes supplement factory environments, production equipment, and manufacturing process visuals
- Asset location: `public/media/`
- Updated by: Zac

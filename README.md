This piano repertoire is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The songs listed here come from a Google Sheet I've been maintaining since 2020.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Configuration

- **`NEXT_PUBLIC_COLOR_MODE_REGISTRABLE_DOMAIN`** (optional): Set to your site’s registrable domain (e.g. `chrisvogt.me`) in production so light/dark preference stays in sync with [www.chrisvogt.me](https://www.chrisvogt.me) via the shared first-party cookie from `@chronogrove/ui`. Omit for local-only `localStorage` behavior. Must match the value used on the Gatsby site (`GATSBY_COLOR_MODE_REGISTRABLE_DOMAIN` there).

This app pins **`@chronogrove/ui`** to the same release line as `gatsby-theme-chronogrove` on www; bump both together when you upgrade the theme packages.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How to update the repertoire data

I've been soring my repertoire in the following Google Sheet.

After making updates, I export the sheet as a CSV file and convert it to JSON using the conversion script:

```bash
pnpm convert:csv src/data/repertoire-02082026.csv
```

This will create a JSON file with the same name in the same directory (e.g., `repertoire-02082026.json`).

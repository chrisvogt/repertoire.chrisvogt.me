/**
 * Same shape as Gatsby `gatsby-ssr` / `gatsby-browser` when `GATSBY_COLOR_MODE_REGISTRABLE_DOMAIN` is set.
 * Keep head (`ChronogroveNextRootLayoutHead`) and client (`ChronogroveNextAppShell`) in lockstep.
 */
export const chronogroveCrossDomainColorMode = process.env.NEXT_PUBLIC_COLOR_MODE_REGISTRABLE_DOMAIN?.trim()
  ? { registrableDomain: process.env.NEXT_PUBLIC_COLOR_MODE_REGISTRABLE_DOMAIN.trim() }
  : null;

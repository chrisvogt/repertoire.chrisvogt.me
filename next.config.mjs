/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["repertoire.dev-chrisvogt.me"],
  transpilePackages: [
    "@chronogrove/ui",
    "@theme-ui/components",
    "@theme-ui/presets",
    "@theme-toggles/react",
    "theme-ui",
    "three",
  ],
};

export default nextConfig;

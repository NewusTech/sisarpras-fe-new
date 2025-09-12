export const isProduction = process.env.NEXT_PUBLIC_MODE === "PRODUCTION";

const withPWA = require("next-pwa")({
  dest: "public", // build service worker ke /public
  register: true, // auto register SW
  skipWaiting: true, // langsung aktifin SW baru
});

const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "newus-bucket.s3.ap-southeast-2.amazonaws.com",
      "loremflickr.com",
      "picsum.photos",
    ],
  },
  compiler: {
    ...(isProduction && {
      removeConsole: {
        exclude: ["error"],
      },
    }),
  },
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withPWA(nextConfig);

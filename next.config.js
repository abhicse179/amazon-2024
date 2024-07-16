module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
        port: "",
      },
    ],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};

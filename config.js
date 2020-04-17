
export default {
  msLandingUrl:
    process.env.NODE_ENV == "development"
      ? "http://localhost:5001"
      : "https://landing-api.iamlanistar.com"
};

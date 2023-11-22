const defaultConfig = {
    delay: 1000,
    maxImageCount: 3
  };
  
  const developmentConfig = {
    assetsBaseUrl: "http://192.168.88.251:9000/assets/",
    port: 9000
  };
  
  const productionConfig = {
    assetsBaseUrl: "https://moshbucket1.s3.us-east-2.amazonaws.com/"
  };
  
  export { defaultConfig, developmentConfig, productionConfig };
  
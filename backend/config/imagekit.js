import ImageKit from "imagekit";

const imageKit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLICKEY,
  privateKey: process.env.IMAGE_KIT_PRIVATEKEY,
});

export default imageKit;

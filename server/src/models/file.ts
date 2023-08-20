import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

const ImageModel = mongoose.model('Image', imageSchema);

export default ImageModel;

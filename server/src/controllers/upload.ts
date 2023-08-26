

import { Response, Request, NextFunction } from "express"
import formidable from 'formidable';
import ImageModel from "../models/file"
import fs from 'fs'

const upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const form = formidable({});
  form.parse(req, async (err:any, fields:any, files:any) => {
    if (err) {
      next(err)
      return;
    }
    const uploadImg = files.file[0];
    console.log('files :>> ', files.file[0]);
    console.log('uploadImg :>> ', uploadImg.filepath);
    try {
      const imgBuffer = fs.readFileSync(uploadImg.filepath);
      const image = new ImageModel({
        name: uploadImg.newFilename,
        data: imgBuffer,
        contentType: uploadImg.mimetype,
      })
      await image.save();
    }catch(err) {
      next(err)
      return;
    }
    //save img file to db
    
    res.json({ fields, files });
  });
}
export {
  upload
}

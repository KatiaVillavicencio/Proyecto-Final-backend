import {dirname} from "path"
import { fileURLToPath } from "url"
import passport from "passport"
import nodemailer from 'nodemailer'
import multer from 'multer'
export const __dirname=dirname(fileURLToPath(import.meta.url))

//hasheo

//import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync (password, bcrypt.genSaltSync (10))
export const isValidPassword = (user,password) => bcrypt.compareSync (password, user.password)


export const passportCall = (strategy) => {
    return async(req, res, next)=>{
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user){
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }
            req.user = user
            next()
        })(req, res, next)
    }
}
export const authorization= (role) => {
    return async(req, res, next)=>{
        if(!req.user) return res.status(401).send({error: "Unauthorized"})
        if(req.user.role!= role) return res.status(403).send({error:"No permissions"})
        next()
    }
}
export const transport= nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:'katiamvv5@gmail.com',
        pass:'tcgm apwy anop bnnh'

    }
})

//upload documents with multer//

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const fileType = file.fieldname;
      let uploadPath = 'public/files/';
  
      // Destino de la carpeta según el tipo de archivo
      switch (fileType) {
        case 'profiles':
          uploadPath += 'profiles/';
          break;
        case 'products':
          uploadPath += 'products/';
          break;
        case 'documents':
          uploadPath += 'documents/';
          break;
      
        default:
          uploadPath += 'other/';
          break;
      }
  
      // Crea la carpeta de destino si no existe
      const fullPath = path.join(__dirname, uploadPath);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
  
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const fileType = file.fieldname;
  
      // Genera un nombre único usando el timestamp actual y un número aleatorio
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      const finalFilePath = fileType + '-' + uniqueSuffix + fileExtension;
  
      cb(null, finalFilePath);
    }
  });
 const uploader = multer({ storage: storage });
export default uploader
  


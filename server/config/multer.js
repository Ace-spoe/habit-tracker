const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb){
  cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename : function (req , file , cb){
    cb(null , 
      Date.now() + '-'+ file.originalname
    )
  }
})


const checkfileType = function (req , file , cb){
  if(file.mimetype.startsWith('image')){
    cb(null , true)
  }else{
    cb(new Error('File type is not image'), false)
  }
}

module.exports = multer({
  storage : storage,
  fileFilter : checkfileType,
  limits :{ fileSize : 5 * 1024 * 1024} //5MB
})

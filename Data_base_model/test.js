var number = '10';
img: {
    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    contentType: 'image/png'
}console.log(number.toString());


upload.single('file'),
(req,res) => {
  const tempath = req.file.path;
  const targetpath = path.join(__dirname, ".uploads/image.png");
  if(path.extname(req.file.originalname).toLocaleLowerCase()===".png") {
    fs.rename(tempath, targetpath, err => {
      if(err) return handleError(err, res);
      res
          .status(200)
          .contentType('text/plain')
          .end('File Uploaded');
    });
  } else {
      fs.unlink(tempath, err => {
        if(err) return handleError(err, res);
        
        res 
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed");
      })
  }
}
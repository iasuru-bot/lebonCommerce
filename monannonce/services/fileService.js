const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

async function uploadFile(req, res) {
    const form = new formidable.IncomingForm();
    
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        console.log(files);
        console.log(fields);
        if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }
        const file = files.file;
        const filePath = path.join(uploadDir, file.newFilename);
        res.status(200).json({ filePath });
    });
}

async function serveFile(req, res) {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.sendFile(filePath);
    });
}

module.exports = {
    uploadFile,
    serveFile,
};
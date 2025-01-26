const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
    console.log(`Upload directory created at ${UPLOAD_DIR}`);
} else {
    console.log(`Upload directory exists at ${UPLOAD_DIR}`);
}


// impossible de upload un file depuis expo mais ca fonctionne depuis postman on laisse en stand by 
async function uploadFiles(req, res, next) {
    console.log('Starting file upload process');
    const form = new formidable.IncomingForm();

    form.uploadDir = UPLOAD_DIR;
    form.keepExtensions = true;

    form.on('fileBegin', (name, file) => {
        console.log(`Starting to receive file: ${file.originalFilename}`);
    });

    form.on('progress', (bytesReceived, bytesExpected) => {
        console.log(`Progress: ${bytesReceived} / ${bytesExpected}`);
    });

    form.on('error', (err) => {
        console.error('Error during file upload:', err);
        return res.status(500).json({ error: 'File upload failed' });
    });

    form.on('end', () => {
        console.log('File upload process completed');
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing the form:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const file = files.filetoupload[0];
        if (!file) {
            console.error('No file received');
            return res.status(400).json({ error: 'No file received' });
        }

        const filePath = path.join(UPLOAD_DIR, file.originalFilename || 'uploaded_file');
        fs.rename(file.filepath, filePath, (err) => {
            if (err) {
                console.error('Error saving the file:', err);
                return res.status(500).json({ error: 'File save failed' });
            }

            console.log(`File saved successfully to ${filePath}`);
            res.status(201).json({ status: 'success', filePath });
        });
    });
}

async function serveFile(req, res) {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.sendFile(filePath);
    });
}

module.exports = {
    uploadFiles,
    serveFile
};
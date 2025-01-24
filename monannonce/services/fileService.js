const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`Upload directory created at ${uploadDir}`);
} else {
    console.log(`Upload directory exists at ${uploadDir}`);
}

async function uploadFile(req, res) {
    console.log('Starting file upload process');
    const form = new formidable.IncomingForm();

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.on('fileBegin', (name, file) => {
        console.log(`Starting to receive file: ${file.name}`);
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

        console.log('Form parsed successfully');
        console.log('Fields:', fields);
        console.log('Files:', files);

        const file = files.file;
        if (!file) {
            console.error('No file received');
            return res.status(400).json({ error: 'No file received' });
        }

        const filePath = path.join(uploadDir, file.newFilename || file.name);
        console.log(`File will be saved to ${filePath}`);

        fs.rename(file.path, filePath, (err) => {
            if (err) {
                console.error('Error saving the file:', err);
                return res.status(500).json({ error: 'File save failed' });
            }

            console.log(`File saved successfully to ${filePath}`);
            res.status(200).json({ filePath });
        });
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
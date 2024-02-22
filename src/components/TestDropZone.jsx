import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const TestDropZone = () => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const uploadFiles = () => {
        files.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);

            // fetch('http://localhost:33402/upload', {
            // fetch('http://api.qurux.net/upload', {
            fetch('https://sever-qurux.onrender.com/upload', {
            // fetch('https://sever-qurux.vercel.app/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Aquí puedes manejar lo que sucede después de que el archivo se ha subido
                    // Por ejemplo, podrías guardar la URL del archivo en el estado de tu componente
                })
                .catch(error => {
                    console.error(error);
                });
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                <img src={file.preview} alt="preview" />
            </div>
        </div>
    ));

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{thumbs}</ul>
            </aside>
            <button onClick={uploadFiles}>Upload Files</button>
        </div>
    );
};

export default TestDropZone;
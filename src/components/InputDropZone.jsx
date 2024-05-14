import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, gql } from '@apollo/client';
import { useUserStore } from '../store/userStore';

const UPDATE_FILE = gql`
    mutation UpdateFile($input: FileInput!) {
        setFileData(input: $input) {
        id
        alias
        tipo
        }
    }
`;



const InputDropZone = forwardRef(({ fileName = "prueba", maxFiles = 1, tipo = 'picture', recomendedSize = '', userId, files, setFiles }, ref) => {

    // console.log(fileName)
    // console.log(tipo)

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(prevFiles => {
            let newFiles = [...prevFiles];
            // Si el número total de archivos después de agregar los nuevos excede maxFiles
            if (prevFiles.length + acceptedFiles.length > maxFiles) {
                // Elimina los archivos más antiguos hasta que el número total sea igual a maxFiles
                const numToRemove = prevFiles.length + acceptedFiles.length - maxFiles;
                newFiles.splice(0, numToRemove);
            }
            // Agrega los nuevos archivos al final de la lista
            acceptedFiles.forEach(file => {
                let timestamp = Date.now();
                let newFileName = maxFiles === 1 ? `${fileName}${timestamp}.${file.name.split('.').pop()}` : `${fileName}_${timestamp}.${file.name.split('.').pop()}`;
                let newFile = new File([file], newFileName, { type: file.type });
                newFile.preview = URL.createObjectURL(file);
                newFiles.push(newFile);
            });
            return newFiles;
        });
    }, [fileName, maxFiles]);
    
    


    const [img, setImg] = useState('prueba1708638964547.svg');
    const [imgId, setImgId] = useState('1');
    // ...resto del código...

    const [updateFile] = useMutation(UPDATE_FILE);

    const uploadFiles = async () => {
        // console.log('subiendo archivos');
        // console.log(files)
        let archivosSubidos = 0
        for (const file of files) {
            // console.log('si los estoy subiendo')
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const response = await
                // fetch('http://localhost:33402/upload', {
                fetch('https://sever-qurux.onrender.com/upload', {
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                // console.log('data', data);
                setImg(data.file.filename);
                setImgId(data.id);
                // console.log(img);
    
                // Realizar la mutación
                const updateResponse = await updateFile({ variables: { input: { id: data.id, userId: userId, alias: fileName, tipo: tipo } } });
                if (updateResponse.data.setFileData.id) {
                    // console.log('archivo subido');
                    // return true
                    archivosSubidos++

                } else {
                    // console.log('archivo no subido');
                    return false
                }
            } catch (error) {
                // console.error(error);
                return false
            }
        }
        // console.log("Archivos subidos", archivosSubidos === maxFiles)
        // console.log(archivosSubidos)
        // console.log(maxFiles)
        return archivosSubidos === maxFiles

    };
    

    useImperativeHandle(ref, () => ({
        uploadFiles
    }));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles
    });

    const thumbs = files.map((file, index) => (
        <div className='h-20 w-20 relative' key={file.name}>
            <div>
                <img src={file.preview} alt="preview" />
            </div>
            <button 
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                onClick={() => {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);
                    setFiles(newFiles);
                }}
            >
                x
            </button>
        </div>
    ));

    return (
        <div>
            <div className='p-4'>
                <label className='text-[#caa776] font-semibold text-xl'>{recomendedSize}</label>
            </div>
            <div className={`border flex items-center justify-center rounded-xl h-40 transition-all ${isDragActive? 'bg-[#caa776] border-black text-white shadow-2xl':''}`} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className='text-[#ccc] font-light text-sm'>Suelte el archivo aqui ...</p> :
                        <div className='flex flex-col'>
                            <p className='text-[#ccc] font-light text-sm'>Arrastre y suelte su archivo aqui,</p>
                            <p className='text-[#ccc] font-light text-sm'>o de click en seleccionar archivo</p>
                        </div>
                }
            </div>
            <aside className='p-4 flex flex-col gap-4'>
                <h4 className='text-[#caa776] font-semibold'>Archivos adjuntados:</h4>
                <div className='flex flex-wrap gap-4 text-[#ccc]'>{thumbs.length > 0 ? thumbs : "aun no ha seleccionado archivos."}</div>
            </aside>
        </div>
    )
});

export default InputDropZone;
import React, { useState } from 'react';
import './UploadPage.css';

const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbyco9VdsYkpcfcLSw_ofsJPq07GPnKawyUuqPQQHJKE7rd6-Yhk158-ZmSlaMPJtb5L/exec';

const MAX_CONCURRENT_UPLOADS = 3;

export default function UploadPage() {
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completedFiles, setCompletedFiles] = useState(0);
    const [activeUploads, setActiveUploads] = useState(0);

    function handleFileChange(event) {
        setFiles(Array.from(event.target.files || []));
        setStatus('');
        setProgress(0);
        setCompletedFiles(0);
        setActiveUploads(0);
    }

    async function uploadFiles() {
        if (!files.length || isUploading) {
            return;
        }

        setIsUploading(true);
        setStatus('');
        setProgress(0);
        setCompletedFiles(0);
        setActiveUploads(0);

        const filesToUpload = [...files];
        const failedFiles = [];

        let nextFileIndex = 0;
        let processedFileCount = 0;

        async function uploadWorker() {
            while (true) {
                const currentIndex = nextFileIndex;
                nextFileIndex += 1;

                if (currentIndex >= filesToUpload.length) {
                    return;
                }

                const file = filesToUpload[currentIndex];

                setActiveUploads((current) => current + 1);

                try {
                    await uploadSingleFile(file);
                } catch (error) {
                    console.error(`Upload failed for ${file.name}:`, error);
                    failedFiles.push(file);
                } finally {
                    setActiveUploads((current) => Math.max(0, current - 1));

                    processedFileCount += 1;

                    setCompletedFiles(processedFileCount);
                    setProgress(
                        Math.round(
                            (processedFileCount / filesToUpload.length) * 100
                        )
                    );
                }
            }
        }

        try {
            const workerCount = Math.min(
                MAX_CONCURRENT_UPLOADS,
                filesToUpload.length
            );

            const workers = Array.from(
                { length: workerCount },
                () => uploadWorker()
            );

            await Promise.all(workers);

            if (failedFiles.length === 0) {
                setStatus('Köszönjük, a feltöltés sikerült!');
                setFiles([]);
            } else if (failedFiles.length === filesToUpload.length) {
                setStatus(
                    'A feltöltés nem sikerült. Kérlek, próbáld újra.'
                );
                setFiles(failedFiles);
            } else {
                setStatus(
                    `${filesToUpload.length - failedFiles.length} fájl feltöltése sikerült, ` +
                    `${failedFiles.length} fájlé nem. Kérlek, próbáld újra a megmaradt fájlokkal.`
                );

                setFiles(failedFiles);
            }
        } catch (error) {
            console.error(error);
            setStatus('A feltöltés nem sikerült. Kérlek, próbáld újra.');
        } finally {
            setIsUploading(false);
            setActiveUploads(0);
        }
    }

    async function uploadSingleFile(file) {
        const base64Data = await fileToBase64(file);

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                fileName: file.name,
                mimeType: file.type || 'application/octet-stream',
                data: base64Data
            })
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Upload failed.');
        }
    }

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                if (typeof result !== 'string') {
                    reject(new Error('Could not read file.'));
                    return;
                }

                resolve(result.split(',')[1]);
            };

            reader.onerror = () => {
                reject(reader.error || new Error('Could not read file.'));
            };

            reader.readAsDataURL(file);
        });
    }

    return (
        <main className="upload-page">
            <section className="upload-card">
                <h1 className="handwriting upload-title">
                    Oszd meg velünk a pillanatokat!
                </h1>

                <p className="upload-description">
                    Válaszd ki az esküvőn készült képeket és videókat.
                </p>

                <label
                    className={`file-picker ${
                        isUploading ? 'file-picker-disabled' : ''
                    }`}
                >
                    <span>
                        {files.length
                            ? `${files.length} fájl kiválasztva`
                            : 'Képek és videók kiválasztása'}
                    </span>

                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                </label>

                {files.length > 0 && (
                    <div className="selected-files">
                        {files.map((file) => (
                            <div
                                className="selected-file"
                                key={`${file.name}-${file.size}-${file.lastModified}`}
                            >
                                <span>{file.name}</span>
                                <span>{formatFileSize(file.size)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className="upload-button"
                    type="button"
                    onClick={uploadFiles}
                    disabled={!files.length || isUploading}
                >
                    {isUploading
                        ? 'Feltöltés folyamatban...'
                        : 'Feltöltés'}
                </button>

                {isUploading && (
                    <div className="upload-progress-section">
                        <p className="upload-warning">
                            Kis türelmet kérünk, ez eltarthat pár percig.
                            <br />
                            Ne lépj ki az oldalról a feltöltés alatt.
                        </p>

                        <div className="upload-progress-header">
                            <span>
                                {completedFiles} / {files.length} fájl
                            </span>

                            <span>{progress}%</span>
                        </div>

                        <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={progress}
                        >
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <p className="current-file-name">
                            {activeUploads > 0
                                ? `${activeUploads} fájl feltöltése folyamatban`
                                : 'Fájlok előkészítése...'}
                        </p>
                    </div>
                )}

                {status && (
                    <p className="upload-status" aria-live="polite">
                        {status}
                    </p>
                )}
            </section>
        </main>
    );
}

function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) {
        return `${Math.ceil(bytes / 1024)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
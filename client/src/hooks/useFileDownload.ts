import { useCallback } from 'react';

export const useFileDownload = () => {
  const downloadFile = useCallback((data: BlobPart, filename: string, mime: string) => {
    const blob = new Blob([data], { type: mime });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  return downloadFile;
};

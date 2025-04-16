import { useState, useCallback } from 'react';

function useBase64Converter() {
  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const base64ToFile = useCallback((base64String: string, filename: string, mimeType: string): Promise<File | null> => {
    return new Promise((resolve, reject) => {
      try {
        const byteString = atob(base64String.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const file = new File([blob], filename, { type: mimeType });
        resolve(file);
      } catch (error) {
        console.error("Error converting Base64 to File:", error);
        resolve(null); // 或者你可以選擇 reject(error)
      }
    });
  }, []);

  return { fileToBase64, base64ToFile };
}

export default useBase64Converter;
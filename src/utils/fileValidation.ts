interface UploadFileValidationOptions {
  accept?: string;
  acceptText?: string;
  maxSizeMB?: number;
}

const BYTES_PER_MB = 1024 * 1024;

const getAcceptedMimeTypes = (accept?: string): string[] => {
  if (!accept) {
    return [];
  }

  return accept
    .split(',')
    .map((mimeType) => mimeType.trim().toLowerCase())
    .filter(Boolean);
};

export const validateUploadFile = (
  file: File,
  { accept, acceptText, maxSizeMB }: UploadFileValidationOptions,
): string | null => {
  const acceptedMimeTypes = getAcceptedMimeTypes(accept);

  if (
    acceptedMimeTypes.length > 0
    && !acceptedMimeTypes.includes(file.type.toLowerCase())
  ) {
    const acceptedFormats = acceptText || acceptedMimeTypes.join(', ');
    return `File "${file.name}" type is not supported. Accepted formats: ${acceptedFormats}.`;
  }

  if (
    maxSizeMB !== undefined
    && file.size > maxSizeMB * BYTES_PER_MB
  ) {
    return `File "${file.name}" exceeds the ${maxSizeMB} MB size limit.`;
  }

  return null;
};

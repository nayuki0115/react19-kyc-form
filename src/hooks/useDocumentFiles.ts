import {
  useOutletContext,
} from 'react-router-dom';
import type {
  Dispatch,
  SetStateAction,
} from 'react';

export interface DocumentFilesContext {
  idFrontFile: File | null;
  setIdFrontFile: Dispatch<SetStateAction<File | null>>;
  idBackFile: File | null;
  setIdBackFile: Dispatch<SetStateAction<File | null>>;
  additionalFiles: File[];
  setAdditionalFiles: Dispatch<SetStateAction<File[]>>;
  clearDocumentFiles: () => void;
}

const useDocumentFiles = () => useOutletContext<DocumentFilesContext>();

export default useDocumentFiles;

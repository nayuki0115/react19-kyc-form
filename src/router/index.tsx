import { createBrowserRouter } from 'react-router-dom';
import Index from '../pages/Index';
import BasicInfo from '../pages/BasicInfo';
import DocumentUpload from '../pages/DocumentUpload';
import Confirmation from '../pages/Confirmation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        index: true,
        element: <BasicInfo />,
      },
      {
        path: 'basic-info',
        element: <BasicInfo />,
      },
      {
        path: 'document-upload',
        element: <DocumentUpload />,
      },
      {
        path: 'confirmation',
        element: <Confirmation />,
      },
    ],
  },
]);

export default router;
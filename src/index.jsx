import ReactDOM from 'react-dom/client';
import React from 'react';
import App from 'components/App';
import { AppProvider } from 'components/Context';
import ModalPortal from 'utils/portal';
import Modal from 'components/Modals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </AppProvider>
  </React.StrictMode>,
);

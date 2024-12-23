import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import 'assets/styles/index.scss';

import { AppProvider } from 'components/Context';
import ModalPortal from 'utils/portal';
import Modal from 'components/Modals';

const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
    <ModalPortal>
      <Modal />
    </ModalPortal>
  </AppProvider>
);

export default App;

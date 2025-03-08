
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.scss';

import Index from './pages/Routes';
import { useAuthContext } from './context/AuthContext';
import ScreenLoader from './components/ScreenLoader';
function App() {
const {isAppLoading}= useAuthContext()

  return (
   <>
   {!isAppLoading?
     <Index/>:
     <ScreenLoader/>

   }
   </>
  );
}

export default App;

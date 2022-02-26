import Nav from './Components/1-Nav'
import Header from './Components/2-Header'
import Title from './Components/3-Title'
import Mature from './Components/4-Mature/1-Mature'
import Kontakt from './Components/5-Kontakt'
import Footer from './Components/6-Footer'
import ReactGa from 'react-ga4'
import { useEffect } from 'react'
import {FrontendContextProvider} from './State/FrontendState'
import { BackendContextProvider } from './State/BackendState';
import useGaTracker from "./useGaTracker";

function App() {


  useGaTracker()


  return (
    <FrontendContextProvider>
      <BackendContextProvider>
        <div className="App">
          <Nav />
          <Header />
          <Title title='MATURE' />
          <Mature />
          <Title title='KONTAKT' />
          <Kontakt />
          <Footer />
        </div>
      </BackendContextProvider>
    </FrontendContextProvider>
    
  );
}

export default App;

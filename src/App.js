import Nav from './Components/1-Nav'
import Header from './Components/2-Header'
import Title from './Components/3-Title'
import Mature from './Components/4-Mature/1-Mature'
import Kontakt from './Components/5-Kontakt'
import Footer from './Components/6-Footer'

function App() {

  console.log(window.innerWidth)

  return (
    <div className="App">
      <Nav />
      <Header />
      <Title title='MATURE' />
      <Mature />
      <Title title='KONTAKT' />
      <Kontakt />
      <Footer />
    </div>
  );
}

export default App;

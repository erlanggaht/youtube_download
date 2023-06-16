import { BrowserRouter,Route } from "react-router-dom";
import Hero from "./Components/organism/hero";
import Navbar from "./Components/organism/navbar";
import Downloader from "./Pages/downloader";
import SlideRoutes from 'react-slide-routes';


export function App() {

  return (
    <BrowserRouter>
    <section className={'min-h-[200px] mx-auto'}>
          <Navbar/>
        <main>
          <SlideRoutes duration={500}>
          <Route path='/' element={<Hero/>}/>
          <Route path='/downloader' element={<Downloader/>}/>
          </SlideRoutes>
        </main>
    </section>
    </BrowserRouter>
  )
}

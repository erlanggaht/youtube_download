import {Link} from 'react-router-dom'
import BgCircleAnim from '../molecul/bgCircleAnim'
export default function Hero() {
  return (
    <div className={'relative h-full'} >
     <div className="context z-50 ">
        <div>
        <h1 className={'drop-shadow font-bold'}>Unduh Video Youtube</h1>
        <p className={'text-2xl text-textDark  text-center'}>Gratis. <span className={'font-semibold'}>Mudah!</span></p>
        <p className={'text-lg font-thin text-textDark  text-center py-6 mx-auto'}>tinggal copy url youtube favorit kalian, unduh dan putar secara offline</p>
        </div>
        <Link to={'/downloader'}><div className={'bottom-16 left-0 right-0 text-center '}><span className={'text-center capitalize p-4 bg-yellowBase inline-block shadow rounded-md font-semibold cursor-pointer hover:bg-base text-base hover:text-yellowBase'}>unduh sekarang</span></div></Link>
    </div>
    <BgCircleAnim/>

    </div>
  )
}

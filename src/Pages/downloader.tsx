import { TargetedEvent, useCallback, useEffect, useRef, useState } from "preact/compat";
import RestAPI from "../Lib/restAPI";
import BgCircleAnim from "../Components/molecul/bgCircleAnim";
import { ComponentChild, VNode } from "preact";
import { Link } from "react-router-dom";
import sound from '../assets/icon/sound.svg'
import AlertWarn from "../Components/atoms/alertWarn";
import ButtonLoading from "../Components/atoms/buttonLoading";
import Footer from "../Components/organism/footer";

type TODOS = {
    url: any; qualityLabel: string | number | bigint | boolean | object | ComponentChild[] | VNode<any> | null | undefined; container: string | number | bigint | boolean | object | ComponentChild[] | VNode<any> | null | undefined; 
    contentLength: number; 
    hasAudio : boolean
}

function getIDYoutube(url : string) {
    return url && url.split('/')[4]
}

export default function Downloader() {
    const [url,setUrl] = useState('')
    const [dataAPI,setDataAPI] = useState({})
    const [toggleSuara,setToggleSuara] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const refDownload = useRef(null)
    
    const Submit =  useCallback(async(e:TargetedEvent,url : string) => {
        e.preventDefault()
        setLoadingButton(true)
        const data = await RestAPI(url)
         setDataAPI(data) 
         setToggleSuara(false)
    },[]);

    useEffect(() => {
        
        if(dataAPI) {
           refDownload && (refDownload as any).current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            })
            setLoadingButton(false)

        }
        //@ts-ignore
        if(dataAPI.messageError ) {
            setLoadingButton(false)
        }
        //@ts-ignore
    },[dataAPI,dataAPI.messageError])
console.log(dataAPI)
        return (
            <>
        <section className={'relative'} >
     <div className="context z-50">
        <div className={'w-full'}>
        <div className={'flex items-center h-full'}>
                <section className={' w-full'}>
                <h3 className={'text-center w-full text-4xl '}>URL Video Youtube</h3>
                <div className={'w-full flex justify-center'}><img src={'/src/assets/icon/down-arrow.gif'} height={98} width={98} alt={'arrowgifdown'} /></div>
                <div className="form-control  items-center mt-2">
                    <label className="label">
                        <span className="label-text">Masukan disini</span>
                    </label>
                    <label className="input-group justify-center">
                        <input type="text" placeholder="cth: https://www.youtube.com/watch?v=lNgkYMID***" className="input py-8 w-1/2 bg-base  shadow placeholder:text-lg sm:placeholder:text-md focus:outline-transparent active:bg-[#eee] border-[#eee] text-yellowBase  text-lg" value={url} onChange={(e) => setUrl((e.target as HTMLTextAreaElement).value)}/>
                        {loadingButton ? <ButtonLoading props={{text:"Tunggu",setLoadingButton}}/>:
                        <button className={'bg-yellowBase text-base hover:opacity-80 shadow font-bold cursor-pointer z-50 px-3 active:opacity-70'} 
                        onClick={(e) => Submit(e,url)}>Download</button> }
                    </label>
                    <p className={'text-center pt-2 text-semiDark'}>{undefined ? "" : (dataAPI as any).messageError} <br/> {(dataAPI as any).messageError && "Ada kesalahan pada URL atau kesalahan pada server kami. silahkan coboa lagi"} </p>
                </div>
                </section>
            </div>
        </div>
      
    </div>
        <BgCircleAnim/>
    </section>
     
     {(dataAPI as any).messageError ? "" : 
     <>
    {Object.keys(dataAPI).length > 0  ? 
    <section className={' bg-base w-screen sm:w-full'} ref={refDownload}>
    <h3 className={'text-center text-lg sm:text-xl py-3 bg-yellowBase text-white shadow'}>{(dataAPI as any).url}</h3>
    
    <div className={'p-6 sm:p-12 w-full mx-auto'}>
    <AlertWarn text='jika video tidak mengunduh secara otomatis. silahkan unduh secara manual. saat muncul page putar video biasanya ada menu pilihan klik dan download !!'/>
    </div>

    <div className={'flex sm:flex-row flex-col gap-6 justify-center mt-6'}>
        <div className={'lay1 '}>
        <figure className={'flex flex-col sm:block items-center p-2 '}>
            <img src={`https://i.ytimg.com/vi/${getIDYoutube((dataAPI as any).url)}/maxresdefault.jpg`} alt={'thumbnailyout'} width={250} height={280} className={'rounded shadow w-[320px]  '}/>
            <figcaption className={'text-center pt-1 '}>Thumbnail</figcaption>
        </figure>
        </div>

        <div className={'lay2 bg-white py-6 px-6 sm:px-6 rounded  '}>
        <div className="overflow-x-auto">
        
        <div className={'flex justify-center gap-2'}>

        <div className={'bottom-16 left-0 right-0 text-center '}><span className={`${!toggleSuara ? 'bg-base text-semiDark' : 'bg-yellowBase text-base shadow'} text-center capitalize p-3  inline-block  rounded-md font-semibold cursor-pointer hover:bg-base  hover:text-semiDark`}  onClick={() => setToggleSuara(false)}>Video + Suara</span></div>
        <div className={'bottom-16 left-0 right-0 text-center '} onClick={() => setToggleSuara(true)}><span className={` ${toggleSuara ? 'bg-base text-semiDark ' : 'bg-yellowBase text-base shadow'}  text-center capitalize p-3  inline-block  rounded-md font-semibold cursor-pointer hover:bg-base  hover:text-semiDark `}>Tanpa Suara</span></div>

        </div>

            <h4 className={'gap-2 p-4 font-semibold text-2xl bg-yellowBase text-white rounded m-2 mb-6 relative'}><img src={sound} alt={'soundIcon'} width={25} height={25} className={'absolute right-3 mt-1'}/> <span>{toggleSuara ? 'Video Mute' : "Video Suara"}</span>  </h4>
           

            <table className="table">
                
    {/* head */}
    <thead>
      <tr className={' border-base text-lg text-center text-dark'}>
        <th>Kualitas</th>
        <th>Format</th>
        <th>Ukuran File</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {dataAPI && (dataAPI as any).info?.map((m : TODOS ,i: number) => {
      return <tr key={i} className={'border-transparent shadow-sm py-2 px-12 text-lg text-semiDark drop-shadow-sm'}>
        {/* false = suara ---- true == nosuara */}
        {m.hasAudio || toggleSuara  ? 
        <><td className={'text-center px-5 py-4 '}>{!m.qualityLabel && '-'} {m.qualityLabel}</td>
        <td className={'text-center px-5 py-4 '}>{m.container}</td>
        <td className={'text-center px-5 py-4 '}>{(m.contentLength * 9.5367e-7).toFixed(2)+" MB"}</td>
        <td className={'pl-0 sm:pl-12'}><Link to={`${m.url}`}><div className={'bottom-16 left-0 right-0 text-center '}><span className={'text-center capitalize p-2 sm:p-4 bg-yellowBase inline-block shadow rounded-md font-semibold cursor-pointer hover:bg-base text-base hover:text-yellowBase'}>downlaod</span></div></Link></td>
        </>  : ""}
      </tr>     
      })}
    </tbody>
  </table>
</div>
        </div>

    </div>
    </section>
    : "" }

<Footer/>

    </> }
    </>
  
    )
}

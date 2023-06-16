
export default function ButtonLoading({props} : any) {
    const {text,setLoadingButton} = props
  return (
    <>
    <div className={'fixed w-screen h-full top-0 opacity-90 bg-base z-[9999999999] grid place-items-center '}>
    <button className="relative btn btn-square bg-yellowBase border-none shadow-md" onClick={() => setLoadingButton(false)}>
  <span className="loading loading-spinner bg-white"></span>
  <p className={'absolute -bottom-6 drop-shadow text-yellowBase hover:text-dark'}>Cancel</p>
</button>
    </div>
   <button className="btn bg-yellowBase text-base hover:opacity-70 shadow font-bold  z-50 px-3 active:opacity-70 cursor-not-allowed border-none h-[67px]">
  <span className="loading loading-spinner"></span>
  {text}
</button>
    </>
  )
}

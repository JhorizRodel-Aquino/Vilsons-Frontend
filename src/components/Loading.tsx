import loaderGIF from "../assets/gear.gif"

export default function Loading() {
    return (
        <>
       
            <img src={loaderGIF} alt="" className="modal w-30"/>


            <div className="backdrop bg-white"></div>
        </>
    )
}
export default function ProfilePicture({ src }: {src: string}) {
    return (
        <img src={src} alt="Profile picture" className="w-30 h-30 rounded-full object-cover" />          
    )
}
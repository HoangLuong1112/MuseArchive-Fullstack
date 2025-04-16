import SpotifyPlayer from "../component/MusicPlayer";
import NavBar from "./NavBar";

export default function MainPage() {
    return (
        /*  flex flex-col: chia chiều cao của thẻ div theo chiều dọc.
            flex-1: khiến div chứa grid chiếm toàn bộ phần còn lại của chiều cao sau khi NavBar chiếm phần của nó.*/
        <div className="h-screen w-full bg-gray-400 flex flex-col">
            <NavBar />
            <div className="grid grid-cols-24 bg-green-400 flex-1 gap-2">
                <div className="bg-red-400 col-span-6 ml-2 rounded-lg">
                    efw
                </div>
                <div className="bg-blue-400 col-span-12 rounded-lg">
                    <h1>Main Page</h1>
                    <p>Welcome to the main page of the Muse Archive!</p>
                </div>
                <div className="bg-amber-400 col-span-6 mr-2 ">
                    wqf
                </div>
            </div>

            {/* <div className="h-[50px] w-full bg-black text-white flex items-center justify-center">
                Footer cuối trang
            </div> */}
            <SpotifyPlayer />
        </div>
    );
}

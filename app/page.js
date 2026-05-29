import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-5xl text-2xl flex justify-center items-center gap-2">Get Me a Chai <span><img className="invertImg" src="/tea.gif" width={88} alt="" /></span></div>
        <p className="text-center md:text-left">A crowdfunding platform for creators to fund their projects.

        </p>
        <p className="text-center md:text-left">
         A place where your fans can buy you a chai. unleash the power of your fans and get your projects funded.
        </p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button> </Link>

          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button> </Link>

        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-2xl font-bold text-center mb-14">Your Fans can buy a Chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans wants to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans wants to collab</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>


      <div className="bg-white h-1 opacity-10">
      </div>


      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mt-14">Learn more about Us</h2>
        <div className="video flex justify-center items-center">
          <video className="md:w-[20vw] w-[180px] -rotate-90"
            controls
            src="/Spidermanvideo.mp4"></video>
        </div>
      </div>
    </>
  );
}

"use client"

import React,{useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
   const { data: session } = useSession()
   const [showdropdown, setshowdropdown] = useState(false)
  //   if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row '>
        <div>
          <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
          <img className='invertImg' width={44} src="/tea.gif" alt="" />
          <span className='text-xl md:text-base my-2 md:my-0'>GetMeaChai!</span>
          </Link>
          </div>

      <div className='relative flex flex-col md:block gap-4'>
        {session && <><button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{setTimeout(() => setshowdropdown(false), 200);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="inline-flex items-center justify-center mx-4 bg-blue-700 rounded-lg text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs px-4 py-2.5 focus:outline-none" type="button">Welcome {session.user.email} <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
</button>

<div id="dropdown" className={`z-10 ${showdropdown?"": "hidden"} absolute left-[200px] bg-gray-600 bg-neutral-primary-medium rounded-lg rounded-base shadow-lg w-44`}>
    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link href="/dashboard" className="items-center w-full px-4 py-2 block hover:bg-slate-400 hover:rounded-lg">Dashboard</Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`} className="items-center w-full px-4 py-2 block hover:bg-slate-400 hover:rounded-lg">Your page</Link>
      </li>
      <li>
        <Link onClick={()=> signOut()} href="#" className="items-center w-full px-4 py-2 block hover:bg-slate-400 hover:rounded-lg">Sign out</Link>
      </li>
    </ul>
</div>
</>}

        {session && <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>{signOut()}}>Logout</button>}

        {!session && <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Login</button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar

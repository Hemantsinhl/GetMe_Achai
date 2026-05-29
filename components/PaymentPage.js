"use client"

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, intiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const usesearchParams = useSearchParams()
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        getData()

        if (!session) {
            router.push("/login")
        }
    }, [router, session])


    useEffect(() => {
        if (usesearchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            router.push(`/${username}`)
        }
    }, [])



    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)
    }


    const pay = async (amount) => {
        // Get the order Id
        let a = await intiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative '>
                <img className='object-cover w-full h-48 md:h-[450px]' src={currentUser.coverpic} alt="" />
                <div>
                    <img width={150} height={150} className='border-2 border-black absolute -bottom-16 md:right-[45%] right-[33%]  md:size-36 size-24 object-cover' src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col gap-2 justify-center items-center my-20">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400 md:text-base text-center px-5'>
                    Let's help {username} to get a chai☕!
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments .  ₹{(payments.reduce((a, b) => a + b.amount, 0) / 100).toFixed(2)} raised
                </div>
                <div className="payments flex flex-col md:flex-row gap-3 w-[80%] mt-11">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 md:p-10 p-5 rounded-lg text-white">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className='md:text-2xl text-xl text-center md:text-left font-bold my-5'>Top 5 Supporters</h2>
                        <ul>
                            {payments.length === 0 && <div className='text-slate-400'>No Payments yet.</div>}
                            {payments.map((p, i) => {
                                return (
                                    <li className='my-4 flex items-center gap-2' key={i}>
                                        <img width={33} src="/avatar.gif" alt="" />
                                        <span>{p.name} donated <span className='font-bold'>₹{p.amount / 100}</span> with a message "{p.message}"</span>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                    <div className="makePayment  w-full md:w-1/2 bg-slate-900 md:p-10 p-5 rounded-lg text-white">
                        <h2 className='md:text-2xl text-xl font-bold my-5'>Make a Payment</h2>

                        <div className="flex gap-2 flex-col">
                            {/* input for name and message */}
                            <input onChange={handleChange} name='name' value={paymentform.name} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handleChange} name='message' value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />

                            <input onChange={handleChange} name='amount' value={paymentform.amount} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => pay((paymentform.amount) * 100)} type="button" class="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        {/* Or choose from these amounts */}
                        <div className="flex flex-col md:flex-row gap-2 mt-5">
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage

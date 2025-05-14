'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "https://t.me/crt_create_bot"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] pb-[5%] gap-[3%] relative flex flex-col justify-evenly items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className="w-full max-w-[500px] px-[3%] py-[3%] flex justify-between items-end relative bg-[#E55E00] ">
                        <div className=" flex flex-col  ">
                            <p className="text-white text-[4.5vmin] sm:text-[3.5vmin] xs:text-[4.5vmin]">Invite Center</p>
                            <p className="text-white text-[4.5vmin] sm:text-[3.5vmin] xs:text-[4.5vmin] font-semibold">Create to Earn Project</p>
                        </div>
                        <div className="w-[13vmin] sm:w-[40vmin] aspect-[297/125] relative mb-1 ">
                            <Image
                                src="/image/crt_intro_logo.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between rounded-[23px]">
                        <div className="w-full relative flex justify-center ">
                            <div className=" w-full aspect-[567/315] relative ">
                                <Image
                                    src="/image/crt_invite_main.png"
                                    alt="scroll"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                        </div>
                        <div className=" w-full px-[3%]  relative flex flex-col justify-around items-center font-normal drop-shadow-lg">
                            <div className="flex flex-col pb-[5%] items-center ">
                                <p className=" text-white text-[6.7vmin] sm:text-[3vmin] font-bold">How It Works - Invite to Earn</p>
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Share your invitation link</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin] ">Invite others to CRT by sharing your personal referral link.<br/>For each successful join, you unlock a creative opportunity.</p>
                            </div>
                            <div className="flex flex-col pb-[5%] items-center">
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Your Friends Join CRT</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin] text-center">They start submitting stories, co-creating with AI<br/>and earning CRT</p>
                            </div>
                            <p className=" text-white text-[4vmin] sm:text-[2.5vmin] font-bold">1 Friend = 1 Ai pencil</p>
                            <p className=" text-white text-[3vmin] sm:text-[2.5vmin] text-center">Each referral gives you AI pencil lets you submit premium ideas, earn bonus rewards, or enter exclusive story contests.<br/>(Each pass is worth up to 2000 CRT based on performance.)</p>
                        </div>
                        <div className="w-full flex justify-center relative gap-[5%]  ">
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3  flex flex-col justify-center items-center relative bg-[#E1FF41] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Invite a friend</p>
                            </div>
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Copy Link</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

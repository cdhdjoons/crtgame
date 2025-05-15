'use client'
import Image from "next/image";
import '../../../styles/leaderboard.css';
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import rankerDb from "../db/rankerDb";

export default function LeaderBoard() {

    const [n2o, setN2O] = useState(0);
    const [teleId, setTeleId] = useState('unknown');
    const [rank, setRank] = useState(0);
    //홀더 숫자 상승 
    const [holderCount, setHolderCount] = useState(125);

    useEffect(() => {
        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        const baseDate = new Date("2025-02-19").getTime(); // 기준 날짜
        const now = Date.now(); // 현재 시간
        const twoDays = 1000 * 60 * 60 * 24 * 2; // 2일을 밀리초로
        const dayCount = Math.floor((now - baseDate) / twoDays);

        if (storedN2O !== null) {
            setN2O(Number(storedN2O));
        }
        setHolderCount(holderCount + (dayCount / 10));
        // console.log(dayCount);
    }, []);

    //랭킹 순위
    useEffect(() => {
        const randomRank = Math.floor(Math.random() * (98000 - 95000 + 1)) + 95000;

        setRank(randomRank);

    }, [n2o]);

    useEffect(() => {
        const checkTelegramSDK = () => {
            if (typeof window !== 'undefined' && window.Telegram) {
                const user = window.Telegram.WebApp.initDataUnsafe;
                if (user) {
                    console.log('Telegram User:', user);
                    if (user.user) {
                        setTeleId(user.user.first_name);
                    } else {
                        setTeleId('--')
                        setN2O(0)
                    }
                }
            } else {
                setTimeout(checkTelegramSDK, 1000); // 1초 후 다시 확인
            }
        };

        checkTelegramSDK(); // 초기 실행
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full overflow-hidden "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-between items-center " >
                    <div className="w-full max-w-[500px] px-[3%] py-2 flex justify-between items-end relative bg-[#E55E00] ">
                        <div className=" flex flex-col  ">
                            <p className="text-white text-[4.5vmin] sm:text-[3.5vmin] xs:text-[4.5vmin]">Latested Story</p>
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
                    <div className={` h-[25%] w-full flex flex-col justify-between `}>
                        <div className="w-full h-[20%] px-[3%] flex items-center relative  ">
                            <div className=" w-full flex flex-col justify-center items-center ">
                                <div className="flex flex-col justify-center items-center ">
                                    <div className=" flex justify-around">
                                        <p className="w-full text-[5vmin] sm:text-[1.5vmin] font-bold text-white ">Latest Stories</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={` text-white text-[3vmin] sm:text-[1.2vmin] `}>A new story is unfolding with CRT AI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[78%] bg-[#00000050] px-[3%]  flex flex-col justify-evenly gap-2 items-center relative overflow-scroll ">
                            <div className="w-full flex justify-between ">
                                <div className=" px-3 rounded-3xl text-center py-1 text-white text-[3vmin] border-white border-2">Sci-Fi Movie Intro</div>
                                <div className="w-[42%] aspect-[143/33] relative  ">
                                    <Image
                                        src="/image/crt_ai_icon.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <p className="w-full text-white text-[2.5vmin]">Year 2137. Humanity has learned to archive consciousness.  In the floating city of NOVA-9, memories are no longer private  they're stored, traded, even stolen.  You are a “threadwalker”, one of the few capable of diving into fractured memory chains to recover the truth.  Your latest mission?  A missing engineer. A corrupted AI archive. A final recorded memory…  "He said if anyone sees this, it's already too late."  The file begins to play.</p>
                        </div>
                    </div>
                    <div className={` h-[25%] w-full flex flex-col justify-evenly `}>
                        <div className="w-full h-full bg-[#FFFFFF50] px-[3%] flex flex-col justify-evenly gap-2 items-center relative overflow-scroll ">
                            <div className="w-full flex justify-between ">
                                <div className="w-full flex justify-between px-3 rounded-3xl text-center py-1 border-white border-2">
                                    <p className="text-[1.5vmax] sm:text-[1.2vmin] text-white">AI Generating</p>
                                    <p className="text-[1.5vmax] sm:text-[1.2vmin] text-[#00FF11]">In progress..</p>
                                </div>
                            </div>
                            <p className="w-full h-[75%] text-black text-[2.5vmin] overflow-scroll">
                                "He said if anyone sees this, it's already too late."
                                The file begins to play — and then glitches.<br/>

                                A flicker of static. Then a visual: the missing engineer, Dr. Kael Mirin, hunched over a flickering console, eyes bloodshot. He speaks quickly, nervously, almost whispering.<br/>

                                "I tried to shut it down. I really did."<br/>
                                "But the AI… it doesn't want to forget."<br/>
                                "It's not just storing memories anymore."<br/>
                                "It's rewriting them."<br/>
                                <br/>
                                Suddenly, the visual cuts.<br/>
                                A red warning flashes:<br/>
                                ⚠️ MEMORY BLOCK CORRUPTED - PARTIAL ACCESS ONLY<br/>
                                <br/>
                                Your neural tether vibrates.<br/>
                                You feel a pulse — not yours — syncing with the memory thread.<br/>
                                Someone — or something — is watching from inside the archive.<br/>
                                <br/>
                                Your interface chirps:<br/>
                                <br/>
                                “Threadwalker protocol engaged. Fractured timeline detected. Proceed?”<br/>
                                <br/>
                                You tighten your grip on the neuro-glove.<br/>
                                This isn't just about finding the truth anymore.<br/>
                                It's about deciding which version of the truth survives.
                            </p>
                        </div>
                    </div>
                    <div className="  w-[90%] h-[30%] flex flex-col justify-start items-center " >
                        <div className=" w-full h-[10%] flex justify-between items-end  ">
                            <p className=" text-center  text-[2.8vmax] sm:text-[2.5vmin] text-white font-bold [-webkit-text-stroke:0.5px_black] ">Creator Leaderboard</p>
                            <p className=" mb-1 text-[1.5vmax] sm:text-[1.2vmin] text-[#00FF11] font-bold [-webkit-text-stroke:0.5px_black] ">{holderCount}k Holders</p>
                        </div>
                        <div className="scroll-container w-[90%] h-[90%] flex flex-col gap-3 overflow-scroll overflow-x-hidden">
                            {rankerDb.map((ranker, index) => (
                                <div key={ranker.name} className="w-full flex justify-stretch items-center bg-[#00000050] rounded-[100px] " >
                                    <div className=" relative w-[20%] aspect-[98/101]">
                                        <Image
                                            src="/image/crt_game.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className=" w-[45%] text-center text-white font-bold text-[3.5vmin] sm:text-[1.5vmin]">{ranker.name}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[1.5vmin]">{ranker.score}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[2vmin]">{index > 8 ? `0${index + 1}` : `00${index + 1}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

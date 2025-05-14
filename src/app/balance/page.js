'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import Alert from '@mui/material/Alert';
import questionDb from "../db/questionDb";
import { CheckCircle } from 'lucide-react';

export default function Balance() {
  const router = useRouter();
  const [pop, setPop] = useState(false);
  const [okPop, setOkPop] = useState(0);
  const [n2o, setN2O] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [answer, setAnswer] = useState("");
  const [worngAnswer, setWrongAnswer] = useState("");
  const [week, setWeek] = useState(0);
  const [count, setCount] = useState(3);
  const inputRef = useRef(null);

  useEffect(() => {
    // 초기 n2o 값 불러오기
    const storedN2O = localStorage.getItem("n2o");
    if (storedN2O !== null) {
      setN2O(Number(storedN2O));
    }
    // 초기 티켓 값 불러오기
    const storedTickets = localStorage.getItem("tickets");
    // 대답을 하고 6시간 이내일 경우
    const storedTime = localStorage.getItem("timerStartTime");

    if (storedTickets !== null && storedTime == null) {
      setTickets(Number(storedTickets));
    }

    //몇 주 차 인지 값 불러오기
    const storedWeek = localStorage.getItem("week");
    if (storedWeek !== null) {
      setWeek(Number(storedWeek));
    }
    const handleFocus = () => {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("focus", handleFocus);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    if (okPop !== 1) return;

    setCount(3); // 상태가 1이 될 때마다 초기화

    const interval = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => {
      router.push('/');
      clearInterval(interval);
    };
  }, [okPop]);

  const useTickets = () => {
    //대답이 10글자 이상되어야함
    if (answer.length < 10) {
      setPop(true);
      setTimeout(() => setPop(false), 2000);
      return;
    }
    //틀린답 연속으로 적었을때
    if (answer === worngAnswer) {
      setOkPop(2);
      setTimeout(() => setOkPop(0), 2000);
      return;
    }
    //60%확률로 대답 성공
    const chance = Math.random();
    if (chance < 0.6) {
      localStorage.setItem("tickets", tickets - 1);
      localStorage.setItem("timerStartTime", Date.now().toString());
      setTickets(tickets - 1);
      setAnswer("");
      setOkPop(1);
      setTimeout(() => setOkPop(0), 3500);
    } else {
      setWrongAnswer(answer);
      setOkPop(2);
      setTimeout(() => setOkPop(0), 2000);
    }

  }
  //textarea 대답 관리
  const handleChange = (e) => {
    const input = e.target.value;
    setAnswer(input);
  };

  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = ((3 - count) / 3) * circumference;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className=" w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full relative flex flex-col items-center justify-between " >
          <div className="w-full max-w-[500px] px-[3%] py-[3%] flex justify-between items-end relative bg-[#E55E00] ">
            <div className=" flex flex-col  ">
              <p className="text-white text-[4.5vmin] sm:text-[3.5vmin] xs:text-[4.5vmin]">Story Center</p>
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
          <div className="w-full h-[90%] flex justify-center items-center relative">
            <div className={` h-full w-full px-[3%] rounded-[23px] flex flex-col gap-[2%] justify-between`}>
              <div className={` h-[45%] w-full pt-[2%] flex flex-col justify-between `}>
                <div className="w-full px-[3%] flex items-center relative  ">
                  <div className=" w-full flex flex-col justify-center items-center z-10 ">
                    <div className="w-[13vmin] sm:w-[6vmin] aspect-[1/1] relative  ">
                      <Image
                        src="/image/crt_game.svg"
                        alt="main logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                      <div className=" flex justify-around">
                        <p className="w-full text-[5vmin] sm:text-[1.5vmin] font-bold text-white ">Story Prompt</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={` text-white text-[3vmin] sm:text-[1.2vmin] `}>Imagination becomes reality. Rewards follow creativity.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[60%] bg-[#00000050] px-[3%] py-2 flex flex-col justify-evenly gap-2 items-center relative overflow-scroll ">
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
              <div className=" w-full h-[30%] relative flex flex-col items-start font-normal drop-shadow-lg overflow-scroll ">
                <div className="flex flex-col ">
                  <p className=" text-white text-[3vmin] sm:text-[2.2vmin] font-bold">How It Works - Create to Earn in Action</p>
                  <p className=" text-white text-[3vmin] sm:text-[2.2vmin]">1. Submit Your Story Idea</p>
                  <p className=" text-white text-[3vmin] sm:text-[2.2vmin]">Share a short concept, scene, or creative spark — anything from a line of dialogue to a full plot idea.</p>
                </div>
                <div className="flex flex-col">
                  <p className=" text-white text-[3vmin] sm:text-[2.2vmin] font-bold">2. AI Transforms Your Idea</p>
                  <p className=" text-white text-[3vmin] sm:text-[2.2vmin]">Within hours, our AI adapts your input into a structured script concept, storyboard, or visual outline.</p>
                </div>
                <p className=" text-white text-[3vmin] sm:text-[2.2vmin] font-bold">3. Earn CRT Tokens</p>
                <p className=" text-white text-[3vmin] sm:text-[2.2vmin]">Your contribution is reviewed and scored. Based on creativity and impact, you'll receive CRT token rewards automatically.</p>
              </div>
              <div className=" w-full h-[30%] flex flex-col justify-evenly bg-[#FF9041] rounded-[30px] px-[5%] relative overflow-hidden">
                <div className="absolute top-0 right-[5%] w-[60%] aspect-[2/1] bg-gradient-to-b from-[#E1FF41] to-white opacity-80 rounded-[80%] blur-2xl filter"></div>
                <textarea ref={inputRef} value={answer} onChange={handleChange} className="w-full bg-white h-[65%] py-[3%] px-[3%] rounded-[10px] placeholder:py-[12%] z-10 placeholder:text-center flex justify-center items-center text-left text-black text-[3.5vmin] sm:text-[2vmin] " placeholder="Fill out your answer"></textarea>
                <div className="w-full h-[15%] flex justify-center relative gap-[5%]  ">
                  {tickets > 0 ? (<div onClick={useTickets} className="w-[45%] rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#E55E00] active:scale-90 transition-transform duration-100">
                    <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">1 Pencil / Create</p>
                  </div>) : (<div className="w-[45%] rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#585858] ">
                    <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">1 Pencil / Create</p>
                  </div>)}
                  <Link href="/daily" className="w-[45%] rounded-[24px] py-2 flex flex-col justify-center items-center relative bg-[#4C9DE7] active:scale-90 transition-transform duration-100">
                    <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Get AI Pencils</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {
            pop && (
              <div className="w-[70%] absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">Please type more than 10 letters.</Alert></div>
            )
          }
          {
            okPop === 1 ? (
              <div className="w-full h-full bg-black opacity-80 absolute text-center flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                  className="font-bold text-[4vmin] sm:text-[2vmin] flex flex-col items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-blue-400" />
                  <span>The AI has approved your story.<br />CRT will be distributed in 6 hours.<br />Thank you!🤖</span>
                  {/* Circular Countdown */}
                  <div className="relative w-16 h-16 mt-2">
                    <svg height="64" width="64">
                      <circle
                        stroke="#41A4FF"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="32"
                        cy="32"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                      {count}
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : okPop === 2 ? (
              <div className="w-[70%] absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">It's not appropriate story. Try again.</Alert></div>
            ) : ""
          }

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

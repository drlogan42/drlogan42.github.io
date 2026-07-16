const Page2 = (props) => {
    const { experience } = props;
    return <div className="flex flex-col w-full justify-center bg-[#bcdeff]">

        <div className="flex flex-col justify-center items-center">

            <div className="flex flex-col items-center">

                {/*start*/}

                <div className ="text-[clamp(2rem,2vw,5rem)] text-center font-bold text-[#142857]">
                    Experience
                </div>

                <div className ="text-[clamp(1.5rem,2vw,2.25rem)] text-center mb-10 font-bold text-[#142857]">
                    Work Experiences
                </div>

            </div>

            {/*content*/}

            <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(300px,900px))] gap-20">
                {/*ostem nasa    */}
                <div className="rounded-xl shadow-slate-700 shadow-md bg-slate-500/25">
                        <div className="relative text-white pt-32 pb-5 pr-2 pl-2">
                            <div className=" flex flex-col absolute top-2 left-2 ">
                                <div className="font-bold text-[clamp(1.5rem,2vw,2.25rem)] ">
                                    {experience[0].title}
                                </div>
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-700 font-bold">
                                    {experience[0].position}
                                </div>
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                    {experience[0].time}
                                </div>
                            </div>

                            <div className=" flex absolute top-2 right-2 justify-center items-center">
                                <div className=" mr-2">
                                    <img className="w-[clamp(30px,5vw,60px)] h-[clamp(30px,5vw,60px)] object-cover aspect-square rounded-full" src={"assets/images/NASALOGO.png"} alt="" />
                                </div>
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-white font-bold">
                                    {experience[0].company}
                                    <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                        {experience[0].location}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-white font-semibold ">
                                    {experience[0].desc}
                                </div>
                            </div>
                        </div>
                    </div>

                {/*xr lab*/}
                <div className="rounded-xl shadow-slate-700 shadow-md bg-slate-500/25">
                    <div className="relative text-white pt-40 pb-5 pr-2 pl-2">
                        <div className=" flex flex-col w-[clamp(60px,30vw,600px)] absolute top-2 left-2">
                            <div className="font-bold text-[clamp(1.5rem,2vw,2.25rem)] ">
                                {experience[1].title}
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-700 font-bold">
                                {experience[1].position}
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                {experience[1].time}
                            </div>
                        </div>

                        <div className=" flex absolute top-2 right-2 justify-center items-center">
                            <div className=" mr-2">
                                <img className="w-[clamp(30px,5vw,60px)] h-[clamp(30px,5vw,60px)] object-cover aspect-square rounded-full" src={"assets/images/ERAULOGO.png"} alt="" />
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-white font-bold">
                                {experience[1].company}
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                    {experience[1].location}
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-white font-semibold ">
                                {experience[1].desc}
                            </div>
                        </div>
                    </div>
                </div>

                {/*reu*/}
                <div className="rounded-xl shadow-slate-700 shadow-md bg-slate-500/25">
                    <div className="relative text-white pt-50 pb-5 pr-2 pl-2">
                        <div className=" flex flex-col w-[clamp(100px,50vw,600px)] absolute top-2 left-2">
                            <div className="font-bold text-[clamp(1.5rem,2vw,2.25rem)] ">
                                {experience[2].title}
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-700 font-bold">
                                {experience[2].position}
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                {experience[2].time}
                            </div>
                        </div>

                        <div className=" flex absolute top-2 right-2 justify-center items-center">
                            <div className=" mr-2">
                                <img className="w-[clamp(30px,5vw,60px)] h-[clamp(30px,5vw,60px)] object-cover aspect-square rounded-full" src={"assets/images/NSFLOGO.jpeg"} alt="" />
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] w-[clamp(60px,30vw,300px)] text-white font-bold">
                                {experience[2].company}
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                    {experience[2].location}
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-white font-semibold ">
                                {experience[2].desc}
                            </div>
                        </div>
                    </div>
                </div>





            </div>



        </div>
    </div>
}
export default Page2;

const Page4 = (props) => {
    const { education } = props;

    function setShowModal(b) {
        
    }

    return <div className="relative min-h-screen flex flex-col bg-[#bcdeff] border border-green-400">

        <div className="flex flex-col justify-center items-center border border-yellow-400">

            <div className="flex flex-col items-center border border-red-300">

                <div className ="text-4xl mb-4 font-bold text-[#142857]">
                    Education
                </div>


            </div>

            <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(300px,900px))] gap-5 border border-black">
                <div className="rounded-xl shadow-slate-700 shadow-md bg-slate-500/25">
                    <div className="relative text-white pt-50 pb-5 pr-2 pl-2 border border-black">
                        <div className=" flex flex-col w-[clamp(150px,60vw,500px)] absolute top-2 left-2 border border-black">
                            <div className="font-bold text-[clamp(1.5rem,2vw,2.25rem)]">
                                {education[0].title} <span className="text-slate-700 font-light"> in </span> <span className="text-[#142857]"> {education[0].degree}</span>
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-[#142857] font-semibold">
                                {education[0].track} track
                            </div>
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-700">
                                Minors in <span className="text-[#142857] font-semibold">{education[0].minor1} </span> <span className="text-slate-700 font-light"> and </span> <span className="text-[#142857] font-semibold"> {education.minor2} </span>
                            </div>
                        </div>

                        <div className=" flex absolute top-2 right-2 justify-center items-center border border-black">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] w-[clamp(30px,25vw,300px)] text-white font-bold">
                                {education[0].university}
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                {education[0].location}
                            </div>
                            </div>
                        </div>

                        <div className="border border-black">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-100 font-semibold ">
                                {education[0].desc}
                            </div>
                        </div>
                    </div>
                </div>

                <div className =" text-center mt-10 text-4xl font-bold text-[#142857]">
                    Awards
                </div>
            </div>
        </div>

        <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(50px,100px))] gap-10">
            {[education[1], education[2], education[3], education[4], education[5], education[6]].map((item, index) => (
                <div key={index} className="text-[#142857] rounded-lg shadow font-semibold text-center">

                    <div onClick={() =>
                        setShowModal(!showModal)}
                         className="group transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 relative grid h-full w-full  flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">

                        <div style={{backgroundImage: `url(${item.image})`}}
                             className="absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center text-gray-700 shadow-none">

                            <div
                                className="absolute inset-0 w-full h-full bg-linear-to-t from-black/80 via-black/50 to-bg-black-10">
                            </div>
                        </div>


                        <div className="relative pt-60">
                        </div>

                        <div className="absolute bottom-4 left-4 text-white font-bold z-10">
                            <div className="flex flex-col items-start">
                                <div
                                    className="text-[clamp(0.5rem,5vw,2rem)] transition-colors group-hover:text-blue-300">
                                    {item.name}
                                </div>
                                <div
                                    className="text-gray-400 text-[clamp(1rem,2vw,1.5rem)] transition-colors group-hover:text-blue-300">
                                    {item.desc}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-2 right-2  bg-slate-50/75 rounded-4xl shadow-2xl z-10">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-bold p-1">
                                {item.category}
                            </div>
                        </div>

                    </div>
                </div>

            ))}
        </div>


    </div>
}

export default Page4;
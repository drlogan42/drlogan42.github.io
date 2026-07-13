const Page4 = (props) => {
    const { education } = props;

    function setShowModal(b) {
        
    }

    return <div className="relative min-h-screen flex flex-col bg-[#bcdeff]">

        <div className="flex flex-col justify-center items-center">

            <div className="flex flex-col items-center">

                <div className ="text-4xl mb-4 font-bold text-[#142857]">
                    Education
                </div>


            </div>

            <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(300px,900px))] gap-5">
                <div className="rounded-xl shadow-slate-700 shadow-md bg-slate-500/25">
                    <div className="relative text-white pt-50 pb-5 pr-2 pl-2">
                        <div className=" flex flex-col w-[clamp(150px,60vw,500px)] absolute top-2 left-2">
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

                        <div className=" flex absolute top-2 right-2 justify-center items-center">
                            <div className="text-[clamp(0.5rem,3vw,1rem)] w-[clamp(30px,25vw,300px)] text-white font-bold">
                                {education[0].university}
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-semibold">
                                {education[0].location}
                            </div>
                            </div>
                        </div>

                        <div className="">
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

        <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 max-w-6xl mx-auto w-full">
            {[education[1], education[2], education[3], education[4], education[5], education[6], education[7]].map((item, index) => (
                <div key={index} className="text-[#142857] rounded-xl shadow font-semibold text-center h-full">

                    <div
                        onClick={() => setShowModal(!showModal)}
                        className="group transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 relative flex h-full min-h-43.75 w-full flex-col items-end justify-end overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700"
                    >
                        {/* Background Image Container */}
                        <div
                            style={{ backgroundImage: `url(${item.image})` }}
                            className="absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center text-gray-700 shadow-none"
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black/90 via-black/60 to-transparent"></div>
                        </div>

                        {/* Card Info Content */}
                        <div className="relative w-full p-4 text-white font-bold z-10 text-left">
                            <div className="flex flex-col items-start gap-0.5">
                                <div className="text-lg leading-tight transition-colors group-hover:text-blue-300 wrap-break-word w-full">
                                    {item.name}
                                </div>
                                <div className="text-gray-300 text-xs font-medium transition-colors group-hover:text-blue-200 line-clamp-2 w-full">
                                    {item.desc}
                                </div>
                                <div className="text-gray-300 text-xs font-medium transition-colors group-hover:text-blue-200 line-clamp-2 w-full">
                                    {item.extra}
                                </div>
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 bg-slate-50/85 rounded-full shadow-md z-10">
                            <div className="text-[10px] text-slate-600 font-bold px-2.5 py-1 uppercase tracking-wider">
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
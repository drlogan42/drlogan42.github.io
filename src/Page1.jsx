import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Page1 = (props) => {
    const { projects } = props;
    const [showModal, setShowModal] = useState(false);

    return <div className="flex flex-col w-full justify-center bg-[#bcdeff]">

        <div className="flex flex-col justify-center items-center ">

            <div className="flex flex-col items-center">

                <div className="text-[clamp(2rem,2vw,5rem)] mb-4 font-bold text-[#142857]">
                    Projects
                </div>

                <div className="text-[clamp(1.5rem,2vw,2.25rem)] text-center mb-10 text-[#142857]">
                    Full-Stack, websites, simulators, games, and more!
                </div>
            </div>
        </div>

        <div className="m-5 justify-center grid grid-cols-[repeat(auto-fit,minmax(300px,600px))] gap-10">
            {[projects[0], projects[1], projects[2], projects[3], projects[4], projects[5], projects[6]].map((item, index) => (
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

        {/*modal logic*/}
        {showModal ?
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md flex items-center justify-center border border-purple-700">

                <div className="bg-white rounded-xl shadow-2xl p-8 mx-4 relative z-50 border border-red-700 w-[clamp(550px,80vw,2000px)] h-[clamp(600px,50vw,900px)]">
                    <img className="w-[clamp(100px,25vw,200px)] h-[clamp(100px,25vw,200px)] object-cover aspect-square mb-10 rounded-full" src={item.image} alt="" />

                    <h2 className="text-2xl font-bold mb-4 text-gray-900 border border-blue-700">Title</h2>
                    <p className="text-gray-600 mb-6 border border-blue-700"> Text </p>

                    <button onClick={() =>
                        setShowModal(!showModal)}
                            className=" absolute top-2 right-2 text-4xl text-slate-700 rounded-full hover:text-red-500 transition duration-200">
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </button>
                </div>
            </div> : null}
    </div>
}

export default Page1;
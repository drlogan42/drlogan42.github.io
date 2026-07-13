import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Page1 = (props) => {
    const { projects } = props;
    const [activeProject, setActiveProject] = useState(null);

    return (
        <div className="flex flex-col w-full justify-center bg-[#bcdeff]">
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
                {projects.slice(0, 7).map((item, index) => (
                    <div key={index} className="text-[#142857] rounded-lg shadow font-semibold text-center">
                        <div
                            onClick={() => setActiveProject(item)}
                            className="group transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 relative grid h-full w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
                        >
                            <div style={{ backgroundImage: `url(${item.image})` }}
                                 className="absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center text-gray-700 shadow-none">
                                <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black/80 via-black/50 to-bg-black-10"></div>
                            </div>

                            <div className="relative pt-60"></div>

                            <div className="absolute bottom-4 left-4 text-white font-bold z-10">
                                <div className="flex flex-col items-start">
                                    <div className="text-[clamp(0.5rem,5vw,2rem)] transition-colors group-hover:text-blue-300">
                                        {item.name}
                                    </div>
                                    <div className="text-gray-400 text-[clamp(1rem,2vw,1.5rem)] transition-colors group-hover:text-blue-300">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-2 right-2 bg-slate-50/75 rounded-4xl shadow-2xl z-10">
                                <div className="text-[clamp(0.5rem,3vw,1rem)] text-slate-500 font-bold p-1">
                                    {item.category}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {activeProject ? (
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex items-center justify-center">

                    <div className="bg-white rounded-xl shadow-2xl p-8 mx-4 relative z-50 w-[clamp(550px,80vw,2000px)] h-[clamp(600px,85vh,900px)] overflow-y-auto flex flex-col justify-between">

                        <div
                            style={{ backgroundImage: `url(${activeProject.image})` }}
                            className="absolute inset-0 m-0 h-full w-full bg-cover bg-center pointer-events-none"
                        >
                            <div className="absolute inset-0 w-full h-full bg-linear-to-b from-black/90 via-black/70 to-black/90"></div>
                        </div>

                        <div className="relative z-10 text-white flex flex-col h-full justify-between gap-6">

                            <div className="max-w-2xl mt-4">
                                <h2 className="text-4xl font-bold mb-3">
                                    {activeProject.name}
                                </h2>
                                <p className="text-gray-200 text-lg ">
                                    {activeProject.desc}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto">

                                {activeProject.extraImg1 && (
                                    <a
                                        href={activeProject.link1 || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] hover:border-blue-400 group/img"
                                    >
                                        <img
                                            src={activeProject.extraImg1}
                                            alt={`${activeProject.name} Gallery 1`}
                                            className="w-full h-full object-cover"
                                        />
                                    </a>
                                )}

                                {activeProject.extraImg2 && (
                                    <a
                                        href={activeProject.link2 || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] hover:border-blue-400 group/img"
                                    >
                                        <img
                                            src={activeProject.extraImg2}
                                            alt={`${activeProject.name} Gallery 2`}
                                            className="w-full h-full object-cover"
                                        />
                                    </a>
                                )}

                                {activeProject.extraImg3 && (
                                    <a
                                        href={activeProject.link3 || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] hover:border-blue-400 group/img"
                                    >
                                        <img
                                            src={activeProject.extraImg3}
                                            alt={`${activeProject.name} Gallery 3`}
                                            className="w-full h-full object-cover"
                                        />
                                    </a>
                                )}
                            </div>

                            <div className="w-full bg-black/40 p-4 rounded-lg backdrop-blur-xs mb-2">
                                <p className="text-gray-300 text-sm md:text-base">
                                    {activeProject.desc2 || "No additional description available."}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveProject(null)}
                            className="absolute top-4 right-4 text-4xl text-white/80 hover:text-red-500 transition duration-200 z-20"
                        >
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Page1;
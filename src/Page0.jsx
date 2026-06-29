import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Page0 = (props) => {
    const { bio } = props;
    return <div className="flex relative min-h-screen w-full justify-center items-start bg-[#bcdeff] p-4">
        <div className="flex flex-col items-center w-full max-w-7xl mt-12 md:mt-20 border border-purple-400 p-4">
            {/*<img className="w-75 h-75 object-cover mb-10 rounded-full" src={bio.image} alt="Profile picture " />*/}
            <img className="w-[clamp(80px,15vw,200px)] h-[clamp(80px,15vw,200px)] object-cover mb-10 rounded-full" src={bio.image} alt="Profile picture" />

            <div className="text-4xl text-[#142857]">
                {bio.message}
            </div>
            <div className="flex p-8">
                <div className="text-4xl font-semibold">
                    <span className="text-[#009cf8] ml-5"> {bio.text1} </span>
                    <span className="text-[#f2faff]"> + </span>
                    <span className="text-[#00c6b4]"> {bio.text2} </span>
                </div>
            </div>

            <div className="text-3xl text-[#f2faff]">
                {bio.desc}
            </div>

            <div className="flex-1 min-w-50 max-w-full h-auto p-6 m-10 bg-white rounded-xl shadow-md">
                {/* Fluid Image */}
                <img
                    src="https://picsum.photos"
                    alt="Fluid Example"
                    className="w-full h-auto object-cover rounded-lg mb-4"
                />

                {/* Fluid Text */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">Fluid Card Title</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    This element resizes seamlessly alongside other items when placed inside a flex-wrap container.
                </p>
            </div>

            <div className=" flex border border-amber-600 mt-4">
                <button className="m-5 rounded-md bg-[#58aeff] text-[#142857] border-[#318cff] px-3 py-2">
                    <FontAwesomeIcon icon={faGithub}/>
                    <a href="https://github.com/drlogan42" target="_blank" className="ml-1.5">
                        {bio.linkName1}
                    </a>
                </button>

                <button className="m-5 rounded-md bg-[#58aeff] text-[#142857] border-[#318cff] px-3 py-2">
                    <FontAwesomeIcon icon={faGithub}/>
                    <a href="https://github.com/drlogan42" target="_blank" className="ml-1.5">
                        {bio.linkName2}
                    </a>
                </button>
            </div>

            <div className="mt-4 flex p-8 border border-red-400">
                <div
                    className="m-4 px-20 py-15 rounded-2xl font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                    {bio.infoBlockNum1}
                    <div className="m-4 font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                        {bio.infoBlock1}
                    </div>
                </div>
                <div
                    className="m-4 px-20 py-15 rounded-2xl font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                    {bio.infoBlockNum2}
                    <div className="m-4 font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                        {bio.infoBlock2}
                    </div>
                </div>
                <div
                    className="m-4 px-20 py-15 rounded-2xl font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                    {bio.infoBlockNum3}
                    <div className="m-4 font-bold bg-[#8dcaff] text-[#142857] border border-red-400">
                        {bio.infoBlock3}
                    </div>
                </div>
            </div>

        </div>

    </div>
};
export default Page0;
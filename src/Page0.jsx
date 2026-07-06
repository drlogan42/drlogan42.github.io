import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";


const Page0 = (props) => {
    const { bio } = props;
    return   <div className="flex w-full justify-center items-start bg-[#bcdeff] p-4">
        <div className="flex flex-col items-center w-full max-w-7xl mt-12 md:mt-20 p-4">
            <img className="w-[clamp(100px,25vw,200px)] h-[clamp(100px,25vw,200px)] object-cover mb-10 rounded-full" src={bio.image} alt="Profile picture" />
            <div className="text-[clamp(1.5rem,5vw,2rem)] text-[#142857]">
                {bio.message}
            </div>

            <div className="flex p-2 m-5 text-[clamp(1.5rem,5vw,2rem)] text-shadow-md bg-[#bcd9f5] rounded-xl shadow-md">
                <div className="text-[#009cf8] m-2 font-semibold ">
                    {bio.text1}
                </div>
                <div className="text-[#f2faff] m-3 font-bold">
                    +
                </div>
                <div className="text-[#9e83b4] m-2 font-semibold">
                    {bio.text2}
                </div>
            </div>


            <div className="p-2 mr-10 ml-10 text-[clamp(1rem,2vw,1.5rem)] text-shadow-md bg-[#bcd9f5] rounded-xl shadow-md text-[#142857]">
                {bio.desc}
            </div>

            <div className="flex justify-center mt-4 w-[clamp(350px,30vw,700px)] h-[clamp(50px,20vw,70px)]">
                <button className="shadow-2xl mx-[max(2vw,4px)] rounded-md p-1 bg-[#58aeff] text-[#142857] border-[#318cff]">
                    <a href="https://github.com/drlogan42" target="_blank">
                        <FontAwesomeIcon icon={faGithub}/>
                        {bio.linkName1}
                    </a>
                </button>

                <button className="shadow-2xl mx-[max(2vw,4px)] rounded-md p-1 bg-[#58aeff] text-[#142857] border-[#318cff]">
                    <a href="https://linkedin.com/in/shaffer-logan" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin}/>
                        {bio.linkName2}
                    </a>
                </button>

                <button className="shadow-2xl mx-[max(2vw,4px)] rounded-md p-1 bg-[#58aeff] text-[#142857] border-[#318cff]">
                    <a href="mailto:loganshaffer42@gmail.com" target="_blank">
                        <FontAwesomeIcon icon={faEnvelope}/>
                        {bio.linkName3}
                    </a>
                </button>

                <button className="shadow-2xl mx-[max(2vw,4px)] rounded-md p-1 bg-[#58aeff] text-[#142857] border-[#318cff]">
                    <a href="/assets/files/LoganShafferResume.pdf" download>
                        <FontAwesomeIcon icon={faFileArrowDown}/>
                        {bio.linkName4}
                    </a>
                </button>
            </div>

            <div className="mt-4 flex text-[#142857] justify-center items-center w-[clamp(350px,50vw,1150px)] h-[clamp(50px,20vw,350px)]">

                <div className="shadow-2xl p-2 mx-[max(1vw,4px)] bg-[#adc0ea] border-[#318cff] rounded-2xl flex flex-col">
                    <div className="text-[clamp(1rem,2vw,2rem)] text-center font-bold">
                        {bio.infoBlockNum1}
                    </div>
                    <div className="text-[clamp(0.75rem,1vw,1.5rem)] text-center">
                        {bio.infoBlock1}
                    </div>
                </div>

                <div className="shadow-2xl p-2 mx-[max(1vw,4px)] bg-[#adc0ea] border-[#318cff] rounded-2xl flex flex-col">
                    <div className="text-[clamp(1rem,2vw,2rem)] text-center font-bold">
                        {bio.infoBlockNum2}
                    </div>
                    <div className="text-[clamp(0.75rem,1vw,1.5rem)] text-center">
                        {bio.infoBlock2}
                    </div>
                </div>

                <div className="shadow-2xl p-2 mx-[max(1vw,4px)] bg-[#adc0ea] border-[#318cff] rounded-2xl flex flex-col">
                    <div className="text-[clamp(1rem,2vw,2rem)] text-center font-bold">
                        {bio.infoBlockNum3}
                    </div>
                    <div className="text-[clamp(0.75rem,1vw,1.5rem)] text-center">
                        {bio.infoBlock3}
                    </div>
                </div>

                <div className="shadow-2xl p-2 mx-[max(1vw,4px)] bg-[#adc0ea] border-[#318cff] rounded-2xl flex flex-col">
                    <div className="text-[clamp(1rem,2vw,2rem)] text-center font-bold">
                        {bio.infoBlockNum4}
                    </div>
                    <div className="text-[clamp(0.75rem,1vw,1.5rem)] text-center">
                        {bio.infoBlock4}
                    </div>
                </div>
            </div>
        </div>
    </div>
};
export default Page0;
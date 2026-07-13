import Page0 from "./Page0.jsx";
import Page1 from "./Page1.jsx";
import Page2 from "./Page2.jsx";
import Page3 from "./Page3.jsx";
import Page4 from "./Page4.jsx";

import PROJECTS from "./projects.jsx";
import EXPERIENCE from "./experience.jsx";
import EDUCATION from "./education.jsx";


const App = () => {
    return (
        // <PageTest/>
        <div className="h-screen flex flex-col">
            <Page0 bio={BIO} />
            <Page1 projects={PROJECTS} />
            <Page2 experience={EXPERIENCE}/>
            <Page3 skills/>
            <Page4 education={EDUCATION}/>
        </div>
    )
}

// Props

const BIO = {
    message: "Hello, I'm Logan",
    image: "/assets/images/NaturalSmile-Edited.jpg",
    text1: "Software Developer",
    text2: "Engineering Physicist",
    desc: "Versatile developer from working in software to web, with a specialty in simulation development." +
        " Extensive experience in full-stack and human-in-the-loop integration. From design to build, I take ideas and turn them into" +
        " a reality with a focus on creating immersive and interactive experiences.",
    linkName1: "GitHub",
    linkName2: "LinkedIn",
    linkName3: "Email",
    linkName4: "Resume",
    infoBlock1: "Years of Experience",
    infoBlockNum1: "2+",
    infoBlock2: "Applications",
    infoBlockNum2: "4",
    infoBlock3: "Engineering Projects",
    infoBlockNum3: "3",
    infoBlock4: "Game Created",
    infoBlockNum4: "1",
    infoBlock5: "Research Projects",
    infoBlockNum5: "2",
};

export default App;
import Page0 from "./Page0.jsx";
import Page1 from "./Page1.jsx";
import Page2 from "./Page2.jsx";
import Page3 from "./Page3.jsx";
import Page4 from "./Page4.jsx";

import PROJECTS from "./projects.jsx";

const App = () => {
    return (
        <div className="h-screen flex flex-col">
        <Page0 bio={BIO} />
            <Page1 projects={PROJECTS} />
            <Page2 />
            <Page3 />
            <Page4 />
        </div>
    )
}

// Props

const BIO = {
    message: "Hello, I'm Logan",
    image: "/assets/images/NaturalSmile-Edited.jpg",
    text1: "Software Developer",
    text2: "Engineering Physicist",
    desc: "I ...",
    linkName1: "GitHub",
    linkURL1: "link1url",
    linkName2: "link2name",
    linkURL2: "link2url",
    infoBlock1: "infoBlock1",
    infoBlockNum1: "infoBlockNum1",
    infoBlock2: "infoBlock2",
    infoBlockNum2: "infoBlockNum2",
    infoBlock3: "infoBlock3",
    infoBlockNum3: "infoBlockNum3",
};



const EXPERIENCE = [
    {
        title: "text",
        company: "text",
        logo: "text",
        time: "text",
        location: "text",
        desc: "text",
        image1: "text",
        link1: "text",
        skills: "text"
    },
    {
        title: "text",
        company: "text",
        logo: "text",
        time: "text",
        location: "text",
        desc: "text",
        image1: "text",
        link1: "text",
        skills: "text"
    },
    {
        title: "text",
        company: "text",
        logo: "text",
        time: "text",
        location: "text",
        desc: "text",
        image1: "text",
        link1: "text",
        skills: "text"
    },
];


const SKILLS = [
    {
        name: "text",
        category: "text",
        logo: "text",
        time: "text",
        projects: "text",
        experience: "text"
    },
    {
        name: "text",
        category: "text",
        logo: "text",
        time: "text",
        projects: "text",
        experience: "text"
    },
    {
        name: "text",
        category: "text",
        logo: "text",
        time: "text",
        projects: "text",
        experience: "text"
    },
    {
        name: "text",
        category: "text",
        logo: "text",
        time: "text",
        projects: "text",
        experience: "text"
    },
];

const EDUCATION = {
    degree: "text",
    university: "text",
    location: "text",
    minor: "text",
    track: "text",
    desc: "text",
};

const AWARDS = [
    {
        name: "text",
        time: "text",
    },
    {
        name: "text",
        time: "text",
    },
    {
        name: "text",
        time: "text",
    },
];

export default App;
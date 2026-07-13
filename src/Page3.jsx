import React from 'react';

const Page3 = () => {
    // Skills data mapping
    const skillData = {
        frontend: [
            { name: 'React', url: 'https://reactjs.org/', img: 'https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg' },
            { name: 'HTML5', url: 'https://en.wikipedia.org/wiki/HTML5', img: 'https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg' },
            { name: 'Tailwind CSS', url: 'https://www.tailwindcss.com/', img: 'https://profilinator.rishav.dev/skills-assets/tailwindcss.svg' },
            { name: 'CSS3', url: 'https://www.w3schools.com/css/', img: 'https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg' },
            { name: 'JavaScript', url: 'https://www.javascript.com/', img: 'https://profilinator.rishav.dev/skills-assets/javascript-original.svg' },
            { name: 'Electron', url: 'https://www.electronjs.org/', img: 'https://profilinator.rishav.dev/skills-assets/electron-original.svg' },
        ],
        backend: [
            { name: 'C#', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/', img: 'https://profilinator.rishav.dev/skills-assets/csharp-original.svg' },
            { name: 'JavaScript', url: 'https://www.javascript.com/', img: 'https://profilinator.rishav.dev/skills-assets/javascript-original.svg' },
            { name: 'Linux', url: 'https://www.linux.org/', img: 'https://profilinator.rishav.dev/skills-assets/linux-original.svg' },
            { name: 'Node.js', url: 'https://nodejs.org/', img: 'https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg' },
            { name: 'Python', url: 'https://www.python.org/', img: 'https://profilinator.rishav.dev/skills-assets/python-original.svg' },
            { name: 'Git', url: 'https://github.com/', img: 'https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg' },
            { name: 'C', url: 'https://www.cprogramming.com/', img: 'https://profilinator.rishav.dev/skills-assets/c-original.svg' },
            { name: 'C++', url: 'https://www.cplusplus.com/', img: 'https://profilinator.rishav.dev/skills-assets/cplusplus-original.svg' },
        ],
        software: [
            { name: 'Unity', url: 'https://unity.com/', img: 'https://profilinator.rishav.dev/skills-assets/unity.png' },
            { name: 'Blender', url: 'https://www.blender.org/', img: 'https://profilinator.rishav.dev/skills-assets/blender_community_badge_white.svg' },
            { name: 'Arduino', url: 'https://www.arduino.cc/', img: 'https://profilinator.rishav.dev/skills-assets/arduino.png' },
            { name: 'LaTeX', url: 'https://www.latex-project.org/', img: 'https://profilinator.rishav.dev/skills-assets/latex.png' },
            { name: 'Raspberry Pi', url: 'https://www.raspberrypi.org/', img: 'https://profilinator.rishav.dev/skills-assets/raspberrypi.png' },
            { name: 'Photoshop', url: 'https://www.adobe.com/in/products/photoshop.html', img: 'https://profilinator.rishav.dev/skills-assets/photoshop-plain.svg' },
        ]
    };

    return (
        <div className="flex flex-col w-full justify-center bg-[#bcdeff]">
            <div className="flex flex-col justify-center items-center  p-6">

                <div className="flex flex-col items-center mb-6">
                    <div className="text-4xl mb-4 font-bold text-[#142857]">
                        My Skill Set
                    </div>
                    <div className="text-2xl text-[#142857]">
                        Technologies and software I work with
                    </div>
                </div>

                {/* New 3-Column Responsive Grid Replacement */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-10 py-5">

                    {/* Column 1: Frontend */}
                    <div className="flex flex-col items-center p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/20">
                        <h3 className="text-xl font-bold mb-4 text-[#142857]">Frontend</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {skillData.frontend.map((skill) => (
                                <a key={skill.name} href={skill.url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                    <img src={skill.img} alt={skill.name} className="h-12 w-auto object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Backend */}
                    <div className="flex flex-col items-center p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/20">
                        <h3 className="text-xl font-bold mb-4 text-[#142857]">Backend</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {skillData.backend.map((skill) => (
                                <a key={skill.name} href={skill.url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                    <img src={skill.img} alt={skill.name} className="h-12 w-auto object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Software */}
                    <div className="flex flex-col items-center p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/20">
                        <h3 className="text-xl font-bold mb-4 text-[#142857]">Software</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {skillData.software.map((skill) => (
                                <a key={skill.name} href={skill.url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                    <img src={skill.img} alt={skill.name} className="h-12 w-auto object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Page3;
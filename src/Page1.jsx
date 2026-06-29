const Page1 = (props) => {
    const { projects } = props;

    return <div className="relative min-h-screen flex flex-col bg-[#bcdeff] border border-green-400">

        <div className="flex flex-col justify-center items-center border border-yellow-400">

            <div className="flex flex-col items-center border border-red-300">

                <div className="text-4xl mb-4 font-bold text-[#142857]">
                    Project Text
                </div>

                <div className="text-2xl  text-[#142857]">
                    Desc
                </div>

            </div>

            <div className="flex justify-around border m-6 border-orange-400">
                <button className="m-2 px-10 py-2 text-[#142857] bg-red-400 rounded-md">
                    1
                </button>
                <button className="m-2 px-10 py-2 text-[#142857] bg-blue-400 rounded-md">
                    2
                </button>
                <button className="m-2 px-10 py-2 text-[#142857] bg-green-400 rounded-md">
                    3
                </button>

            </div>

        </div>

        {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
        {/*    <div className="bg-amber-400 p-4 rounded-4xl">*/}
        {/*        <div className="text-base sm:text-lg md:text-xl lg:text-2xl">*/}
        {/*            jumpy text*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className="bg-green-400  p-4 rounded-4xl">*/}
        {/*        <div className="text-[clamp(1rem,4vw,1.5rem)] leading-relaxed">*/}
        {/*            smooth text*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">*/}
        {/*    {["A", "B", "C", "D"].map((item, index) => (*/}
        {/*        <div*/}
        {/*            key={index}*/}
        {/*            className="bg-indigo-600 text-indigo-100 p-6 rounded-lg shadow font-semibold text-center">*/}
        {/*        Card {item}*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*</div>*/}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {["A", "B", "C", "D"].map((item, index) => (
                <div
                    key={index}
                    className="bg-indigo-400 text-indigo-100 p-6 rounded-lg shadow font-semibold text-center">
                    Card {item}
                </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-4 border border-black">
            <div className="flex-1 min-w-50 border border-black">Item 1</div>
            <div className="flex-1 min-w-50 border border-black">Item 2</div>
            <div className="flex-1 min-w-50 border border-black">Item 3</div>
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


    </div>
}

export default Page1;


// w-20 sm:w-28 md:w-44 lg:w-52 h-96

// grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5

// w-full h-screen prior
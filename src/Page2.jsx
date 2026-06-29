const Page2 = () => {
    return <div className="relative min-h-screen flex flex-col bg-[#bcdeff] border border-green-400">

        <div className="flex flex-col justify-center items-center border border-yellow-400">

            <div className="flex flex-col items-center border border-red-300">

                <div className ="text-4xl mb-4 font-bold text-[#142857]">
                    Experience Text
                </div>

                <div className ="text-2xl  text-[#142857]">
                    Desc
                </div>

            </div>


            <div className="grid grid-cols-1 gap-4 px-10 py-5 border border-blue-700">
                <div>
                    1
                </div>
                <div>
                    2
                </div>
                <div>
                    3
                </div>


            </div>

        </div>

    </div>
}

export default Page2;
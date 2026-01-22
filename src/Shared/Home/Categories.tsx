const Categories = () => {
    return (
        <div className={`global-padding layout flex items-center justify-between gap-8`}>
            <div className={`group h-[300px] w-full flex items-center p-6 relative bg-[url('/banner1.webp')] bg-cover bg-center cursor-pointer`}>
                <div className="z-50">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg leading-[120%]">Big Sale Products</h3>
                        <h2 className="capitalize text-[30px] leading-[100%]">
                            Plants <br />
                            For Interior
                        </h2>
                    </div>
                    <button type="button" className="mt-9 border-b-primary border-b-2 text-sm leading-6 uppercase inline-block font-medium hover:text-primary transition-all duration-300 cursor-pointer">
                        Shop Now
                    </button>
                </div>
                <div className="absolute inset-0 z-40 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className={`group h-[300px] w-full flex items-center p-6 relative bg-[url('/banner2.webp')] bg-cover bg-center cursor-pointer`}>
                <div className="z-50">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg leading-[120%]">Top Products</h3>
                        <h2 className="capitalize text-[30px] leading-[100%]">
                            Plants <br />
                            For Healthy
                        </h2>
                    </div>
                    <button type="button" className="mt-9 border-b-primary border-b-2 text-sm leading-6 uppercase inline-block font-medium hover:text-primary transition-all duration-300 cursor-pointer">
                        Shop Now
                    </button>
                </div>
                <div className="absolute inset-0 z-40 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </div>
    )
}

export default Categories
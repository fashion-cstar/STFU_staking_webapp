import Bg_svg_left from "./bg_svg/Bg_svg_left"

export const YourStake = () => {
    return (
        <div className='w-full'>
            <div className='w-full p-5'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='text-white text-[18px] md:text-[20px] text-center w-full uppercase'>total staked</div>
                    <div className='text-[#6FFF39] text-[28px] md:text-[32px] text-center w-full'>${Number(100000).toLocaleString()}</div>
                    <div className='text-[#7F41E4] text-[18px] md:text-[20px] text-center w-full uppercase'>{`(${Number(1000).toLocaleString()} STFU)`}</div>
                </div>
                <div className='flex flex-col gap-1 w-full mt-[30px]'>
                    <div className='text-white text-[30px] md:text-[34px] xl:text-[36px] w-full uppercase mb-2'>your stake:</div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[18px] md:text-[20px] w-full uppercase min-w-[170px]'>apy</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[18px] md:text-[20px] w-full uppercase'>{Number(666).toLocaleString()}<span className='text-white'>{' '}%</span></div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[18px] md:text-[20px] w-full uppercase min-w-[170px]'>unclaimed</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[18px] md:text-[20px] w-full uppercase'>{`${Number(1235234).toLocaleString()}`}<span className='text-white'>{' '}STFU</span></div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[18px] md:text-[20px] w-full uppercase min-w-[170px]'>staked</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[18px] md:text-[20px] w-full uppercase'>{`${Number(1235234).toLocaleString()}`}<span className='text-white'>{' '}STFU</span></div>
                    </div>
                </div>
            </div>
            <div className='w-full relative overflow-hidden min-h-[300px]'>
                <div className="w-[630px] absolute top-0 right-0">
                    <Bg_svg_left />
                </div>
            </div>
        </div>
    )
}
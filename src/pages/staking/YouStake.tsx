export const YourStake = () => {
    return (
        <div className='w-full'>
            <div className='w-full p-5'>
                <div className='flex flex-col gap-2 w-full mt-[12.5vh] md:mt-0'>
                    <div className='text-white text-[20px] text-center w-full uppercase'>total staked</div>
                    <div className='text-[#6FFF39] text-[32px] text-center w-full'>${Number(100000).toLocaleString()}</div>
                    <div className='text-[#7F41E4] text-[20px] text-center w-full uppercase'>{`(${Number(1000).toLocaleString()} STFU)`}</div>
                </div>
                <div className='flex flex-col gap-1 w-full mt-[30px]'>
                    <div className='text-white text-[36px] w-full uppercase mb-2'>your stake:</div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>apy</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{Number(666).toLocaleString()}<span className='text-white text-[14px]'>{' '}%</span></div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>unclaimed</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${Number(1235234).toLocaleString()}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>staked</div>
                        <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${Number(1235234).toLocaleString()}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
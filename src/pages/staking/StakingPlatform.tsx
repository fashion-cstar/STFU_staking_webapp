import { Button } from "@mui/material"
import { Web3ModalButton } from "src/common/WalletConnect/Web3Modal"
import { useEthers } from '@usedapp/core'
import SubmitTextInput from "src/common/SubmitTextInput"
import { useState } from "react"

export const StakingPlatform = () => {
    const { account } = useEthers()
    const activateProvider = Web3ModalButton()
    const [isBorder, setIsBorder] = useState(false)
    const [submitText, setSubmitText] = useState('')
    const handleFocus = () => {
        setIsBorder(true)
    }

    const handleBlur = () => {
        setIsBorder(false)
    }

    const onChange = (text: string) => {
        setSubmitText(text)
    }

    const onSubmit = () => {

    }

    return (
        <>
            <div className='hidden md:flex absolute w-[200px] pt-4 flex-col gap-1 top-0 left-0'>
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
            </div>
            <div className='md:hidden w-[200px] pl-4 flex gap-1 absolute top-0 left-0'>
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
            </div>
            <div className='w-full max-w-[740px] flex flex-col items-center px-2 md:py-6 md:px-10'>
                <div className='w-full flex flex-col gap-1 md:gap-3 mt-10 md:mt-0'>
                    <div className='w-full text-center md:text-right text-[#6FFF39] text-[26px] md:text-[34px] uppercase'>STFU LABS</div>
                    <div className='w-full text-center md:text-right text-black text-[26px] md:text-[34px] uppercase'>STAKING PLATFORM</div>
                    <div className='flex gap-4 mt-2 mb-4 md:mb-0 md:gap-8 flex-wrap justify-center md:justify-end'>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={activateProvider}
                            sx={{ border: "3px solid #7F41E4", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Buy Token</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activateProvider}
                            sx={{ borderColor: "#6FFF39", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Connect</span>
                        </Button>
                    </div>
                    <div className='w-full border border-b border-[#000000] mb-2' />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='w-full mt-8 text-center text-black text-[18px] md:text-[20px] uppercase'>Staking Information</div>
                    <div className='w-full bg-[#6FFF39] flex py-4 px-4 md:px-8 flex-col gap-4'>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>Total pending rewards</span>
                            <span className='text-white text-[12px] uppercase'>$2341234133</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>Last time reward</span>
                            <span className='text-white text-[12px] uppercase'>3hrs ago</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>staked tokens</span>
                            <span className='text-white text-[12px] uppercase'>12.345.678</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>token contract</span>
                            <span className='text-white text-[12px] uppercase'>0x123...fca</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>staking contract</span>
                            <span className='text-white text-[12px] uppercase'>0x4fg...cas</span>
                        </div>
                        <div className='flex justify-between md:px-10 items-stretch'>
                            <div className='w-full' style={{ border: isBorder ? "1px solid black" : "none" }} >
                                <SubmitTextInput handleFocus={handleFocus}
                                    handleBlur={handleBlur}
                                    onChange={onChange} />
                            </div>
                            <div className='cursor-pointer bg-black text-white text-[12px] w-[100px] uppercase hover:bg-[#101010] flex justify-center items-center' onClick={onSubmit}>
                                Submit
                            </div>                            
                        </div>
                    </div>
                    <div className='w-full mt-4 text-center text-black text-[18px] md:text-[20px] uppercase'>timeline</div>
                    <div className='w-full flex flex-col mb-[50px]'>
                        <div className='w-full bg-black text-white text-[12px] flex h-[50px]'>
                            <div className='basis-1/5 flex justify-center items-center uppercase'>column</div>
                            <div className='basis-1/5 flex justify-center items-center uppercase'>column</div>
                            <div className='basis-1/5 flex justify-center items-center uppercase'>column</div>
                            <div className='basis-1/5 flex justify-center items-center uppercase'>column</div>
                            <div className='basis-1/5 flex justify-center items-center uppercase'>column</div>
                        </div>
                        {[1, 2, 3].map((item) => {
                            return (
                                <div className='w-full bg-white text-black text-[12px] flex h-[50px]'>
                                    <div className='basis-1/5 flex justify-center items-center uppercase'>row</div>
                                    <div className='basis-1/5 flex justify-center items-center uppercase'>data</div>
                                    <div className='basis-1/5 flex justify-center items-center uppercase'>data</div>
                                    <div className='basis-1/5 flex justify-center items-center uppercase'>data</div>
                                    <div className='basis-1/5 flex justify-center items-center uppercase'>data</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='hidden md:flex w-[200px] pb-4 flex-col gap-1 absolute bottom-0 right-0'>
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                    </div>
                </div>
            </div>
        </>
    )
}
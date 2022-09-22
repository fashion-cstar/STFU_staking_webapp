import React, { useMemo, useState, useEffect, useRef } from 'react'
import Modal from 'src/common/Modal'
import StakingInputBox from 'src/common/StakingInputBox'
import Modal_side from 'src/common/svgs/Modal_side'
import Modal_side2 from 'src/common/svgs/Modal_side2'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button } from "@mui/material"
import { useEthers } from '@usedapp/core'
import { useApproveCallback, useTokenAllowance } from 'src/hooks/hooks'
import { AppTokenAddress, StakingContractAddressV2 } from 'src/constants/AppConstants'
import { CHAIN_LABELS, formatEther, getEtherscanLink, maxStakingAmount, parseEther } from 'src/utils'
import { BigNumber } from '@ethersproject/bignumber'
import { debounce } from "lodash"
import { toast } from 'react-toastify'
import { useStakingV2 } from 'src/contexts'
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

interface ModalProps {
    isOpen: boolean
    handleClose: () => void
}

const modalStyle = {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 250px)',
    width: '100%',
    maxWidth: '400px'
}

const SWAP_STAKING_ID = "id_staking_inputV2"

export default function DepositModalV2({ isOpen, handleClose }: ModalProps) {
    const [bgColor, setBgColor] = useState('#7F41E4')
    const [isBorder, setIsBorder] = useState(false)
    const [amount, setAmount] = useState(BigNumber.from(0))
    const { account, chainId } = useEthers()
    const { tokenAllowanceCallback } = useTokenAllowance()
    const { approveCallback } = useApproveCallback()
    const [isWalletApproving, setIsWalletApproving] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isCheckingAllowance, setIsCheckingAllowance] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { depositCallback, updateStakingStats, bnbBalance, stfuBalance } = useStakingV2()
    const [hash, setHash] = useState('')

    const init = () => {
        setIsApproved(false)
        setIsLoading(false)
        setIsWalletApproving(false)
        setHash('')
        setIsCheckingAllowance(false)
        setIsBorder(false)
        setBgColor('#7F41E4')
        setAmount(BigNumber.from(0))
        initInputBox()
    }

    const checkUserApproved = useRef(
        debounce(async () => {
            setIsCheckingAllowance(true)
        }, 500)
    ).current;

    const checkAllowance = async (): Promise<boolean> => {
        try {
            let res = await tokenAllowanceCallback(account, StakingContractAddressV2, AppTokenAddress, 'bsc')
            if (res.gte(amount) && amount.gt(0)) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        const fetch = async () => {
            let res = await checkAllowance()
            if (res) setIsApproved(true)
            setIsCheckingAllowance(false)
        }
        if (isCheckingAllowance) {
            fetch()
        }
    }, [isCheckingAllowance])

    useEffect(() => {
        init()
    }, [account, isOpen])

    useEffect(() => {
        checkUserApproved()
    }, [amount, account, isOpen])

    const onApprove = async () => {
        setIsWalletApproving(true)
        let res = await checkAllowance()
        if (!res) {
            try {
                await approveCallback(StakingContractAddressV2, AppTokenAddress, maxStakingAmount, 'bsc').then((hash: string) => {
                    setIsWalletApproving(false)
                    setIsApproved(true)
                    toast.success('Approved!')
                }).catch((error: any) => {
                    console.log(error)
                    setIsWalletApproving(false)
                    let err: any = error
                    toast.error((err.data?.message || err?.message || err).toString())
                })
            } catch (error) {
                console.log(error)
                setIsWalletApproving(false)
            }
        } else {
            toast.success('Approved!')
            setIsWalletApproving(false)
            setIsApproved(true)
        }
        return null;
    }

    const onDeposit = async () => {
        setIsLoading(true)
        try {
            depositCallback(amount).then((res: any) => {
                if (res.status === 1) {
                    setHash(res.hash)
                    updateStakingStats()
                    setBgColor('#6FFF39')
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsLoading(false)
            }).catch(error => {
                setIsLoading(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
        return null;
    }

    const onClose = () => {       
        console.log(isWalletApproving, isLoading) 
        if (!isWalletApproving && !isLoading) handleClose()        
    }

    const handleFocus = () => {
        setIsBorder(true)
    }

    const handleBlur = () => {
        setIsBorder(false)
    }

    const initInputBox = () => {
        setAmount(BigNumber.from(0))
        let element: any = document.getElementById(SWAP_STAKING_ID)
        if (element) element.value = ""
    }

    const onInputChange = (val: any) => {
        let amount = 0
        if (Number(val) !== NaN) amount = Number(val)
        setAmount(parseEther(amount.toString(), 18))
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                handleClose={onClose}
                bgColor={bgColor}
            >
                <div className='relative overflow-hidden'>
                    <div className='absolute bottom-0 left-0'>
                        {hash ? <Modal_side2 /> : <Modal_side />}
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        {hash ? <Modal_side2 /> : <Modal_side />}
                    </div>
                    <div className="flex flex-row justify-between mt-2 w-full px-8">
                        <div></div>
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-black-400 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                onClick={handleClose}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div style={modalStyle}>
                        <div className='mx-4 md:mx-6 mb-4 md:mb-6 px-5'>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <p className='w-fit text-center text-white md:text-[35px] underline underline-offset-4 decoration-[3px]'>Amount</p>
                                <p className='w-fit text-center text-white md:text-[35px] underline underline-offset-4 decoration-[3px]'>To stake</p>
                            </div>
                            {!isLoading && !hash && (
                                <div className='w-full'>
                                    <div className='w-full mt-5'>
                                        <StakingInputBox
                                            id={SWAP_STAKING_ID}
                                            handleFocus={handleFocus}
                                            handleBlur={handleBlur}
                                            onChange={(val: any) => onInputChange(val)}
                                        />
                                    </div>
                                    <hr className="w-full mt-3 sm:mt-4" style={{ borderTop: "2px solid #6FFF39" }} />
                                    <div className='mt-4 w-full flex flex-col justify-center items-center'>
                                        <span className='text-[12px] text-white uppercase'>BNB Balance:</span>
                                        <span className='text-[12px] text-[#6FFF39] uppercase'>{formatEther(bnbBalance, 18, 3, true)}{' '}BNB</span>
                                    </div>
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <span className='text-[12px] text-white uppercase'>STFU Balance:</span>
                                        <span className='text-[12px] text-[#6FFF39] uppercase'>{formatEther(stfuBalance, 18, 3, true)}{' '}STFU</span>
                                        <span className='text-[12px] text-[#FF8839] uppercase'>{amount.gt(stfuBalance) ? 'Insufficient STFU balance' : ''}</span>
                                    </div>
                                    <div className='mt-8 mb-6 w-full flex flex-col items-center gap-2'>
                                        <LoadingButton
                                            variant="outlined"
                                            sx={{ border: "3px solid #6FFF39", minWidth: '190px', height: '48px', fontFamily: 'agressive' }}
                                            loading={isWalletApproving}
                                            loadingPosition="start"
                                            color="primary"
                                            onClick={onApprove}
                                            disabled={isApproved || isCheckingAllowance || amount.lte(0) || amount.gt(stfuBalance) || !account}
                                        >
                                            <span className='text-[20px] text-white'>{isWalletApproving ? 'Approving ...' : isApproved ? "Approved" : "Approve"}</span>
                                        </LoadingButton>
                                        <Button
                                            variant="contained"
                                            sx={{ minWidth: "190px", height: '50px', fontFamily: 'agressive' }}
                                            color="primary"
                                            onClick={onDeposit}
                                            disabled={!isApproved || amount.lte(0) || amount.gt(stfuBalance) || !account}
                                        >
                                            <span className='text-[20px] text-[#000000]'>Deposit</span>
                                        </Button>
                                    </div>
                                </div>)}
                            {isLoading && !hash && (
                                <div className="w-full flex justify-center items-center flex-col gap-4">
                                    <div className='w-full' style={{ visibility: 'hidden' }}>
                                        <input
                                            className="w-full min-w-[80px] p-4 h-[20px]"
                                        />
                                    </div>
                                    <Fade in={true} style={{ transitionDelay: '800ms' }} unmountOnExit>
                                        <CircularProgress size='5rem' />
                                    </Fade>
                                    <div className='w-full' style={{ marginTop: '40px', marginBottom: '40px' }}>
                                        <div className='w-full text-center text-white text-[20px] uppercase'>
                                            Depositing
                                        </div>
                                        <div className='w-full text-center text-[#6FFF39] text-[20px]'>
                                            {`${formatEther(amount, 18, 3, true)} STFU`}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {hash && (
                                <div className='w-full'>
                                    <div className='w-full' style={{ visibility: 'hidden' }}>
                                        <input
                                            className="w-full min-w-[80px] p-4 h-[20px]"
                                        />
                                    </div>
                                    <div className='w-full flex justify-center py-4'>
                                        <svg width="108" height="84" viewBox="0 0 108 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 44L35 73L102 6" stroke="#7F41E4" strokeWidth="15" />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col gap-2' style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <div className='text-[20px] text-white text-center uppercase'>Successful</div>
                                        <div className='text-[14px] text-white text-center uppercase'>Tx hash</div>
                                        <div className='text-[12px] text-white text-center'>{hash.slice(0, 10) + '...' + hash.slice(56, 65)}</div>
                                        {chainId && (
                                            <a className='text-[14px] mt-4 text-[#7F41E4] underline text-center' target="_blank" rel="noreffer" href={getEtherscanLink(chainId, hash, 'transaction')}>
                                                {chainId && `View on ${CHAIN_LABELS[chainId]}`}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

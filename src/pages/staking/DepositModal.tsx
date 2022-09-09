import React, { useMemo, useState, useEffect, useRef } from 'react'
import Modal from 'src/common/Modal'
import Modal_side from 'src/common/svgs/Modal_side'

interface ModalProps {
    isOpen: boolean
    handleClose: () => void
}

const modalStyle = {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 350px)'
}

export default function DepositModal({ isOpen, handleClose }: ModalProps) {
    const [bgColor, setBgColor] = useState('#7F41E4')

    const onClose = () => {
        handleClose()
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
                        <Modal_side />
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <Modal_side />
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
                    <hr className="w-full mt-1 sm:mt-2" style={{ borderTop: "1px solid #112030" }} />
                    <div style={modalStyle}>
                        <div className='m-4 md:m-6 w-[250px] md:w-[420px]'>

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

import React, { useMemo, useState, useEffect } from 'react'
import { Button } from "@mui/material"
import { useEthers } from "@usedapp/core"
import localforage from "localforage"
import { Web3ModalButton } from "./WalletConnect/Web3Modal"

function Disconnect({ isMobile }: { isMobile: boolean }) {
    const { deactivate, connector } = useEthers()

    const handleDisconnect = async () => {
        await localforage.setItem("connectionStatus", false)
        deactivate()
        if (connector) {
            (connector as any)?.deactivate()
        }
    }

    return (
        <Button
            variant="outlined"
            onClick={handleDisconnect}
            sx={{ border: "3px solid #6FFF39", width: isMobile ? '100%' : '210px', height: isMobile ? '40px' : '48px', fontFamily: 'agressive' }}
            className="relative">
            <span className="text-[16px] md:text-[20px] text-white uppercase">Disconnect</span>
        </Button>
    )
}

export default function Wallet({ isMobile }: { isMobile: boolean }) {
    const { account } = useEthers()
    const activateProvider = Web3ModalButton()
    const isConnected = !!account

    return (
        <div className="flex justify-center">
            {!isConnected && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={activateProvider}
                    sx={{ border: "3px solid #6FFF39", width: isMobile ? '100%' : '180px', height: isMobile ? '40px' : '48px', fontFamily: 'agressive' }}
                >
                    <span className="text-[16px] md:text-[20px] text-white uppercase">Connect</span>
                </Button>
            )}
            {isConnected && <Disconnect isMobile={isMobile} />}
        </div>
    )
}
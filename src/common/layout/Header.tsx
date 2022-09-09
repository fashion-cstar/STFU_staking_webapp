/* eslint-disable react/jsx-pascal-case */
import { Portal } from "@mui/base"
import { useState } from "react"
import Logo from "../svgs/Logo"
import Wallet from "../Wallet"
import {
  SIDEBAR_ITEMS,
  SIDEBAR_ROUTES,
} from "./LayoutConstants"
import {
  Tooltip
} from "@mui/material"
import Logo_mobile from "../svgs/Logo_mobile"
import NavIcon_mobile from "../svgs/NavIcon_mobile"
import { useNavigate, useLocation } from 'react-router-dom'
import LogoText from "../svgs/LogoText"
import LogoText_mobile from "../svgs/LogoText_mobile"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const routeMatch = (path: string) => {
    return location.pathname.includes(path)
  }

  const NavMenu = () => {
    return (
      <div className='flex gap-8 lg:gap-10'>
        {Object.keys(SIDEBAR_ITEMS).map((key, index) => {
          const isActive = routeMatch(SIDEBAR_ROUTES[key])
          const isComingSoon = SIDEBAR_ROUTES[key] === "/coming-soon"
          return (
            <div key={key}>
              <Tooltip
                title={
                  isComingSoon
                    ? `${SIDEBAR_ITEMS[key]} (Coming Soon)`
                    : SIDEBAR_ITEMS[key]
                }
                placement="bottom"
              >
                <div className={`${isActive ? '' : 'cursor-pointer'}`} onClick={() => onClickMenu(SIDEBAR_ROUTES[key], isActive)}>
                  <span className='text-[20px] text-white font-medium'>{SIDEBAR_ITEMS[key]}</span>
                  <div className={`bg-[#7F41E4] h-0.5 w-full ${isActive ? 'block' : 'hidden'}`}></div>
                </div>
              </Tooltip>
            </div>
          )
        })}
      </div>
    )
  }

  const onClickMenu = (path: string, isActive: boolean) => {
    if (isActive) return
    navigate("/" + path)
    setIsNavOpen(false)
  }

  const SideMenu = () => {
    return (
      <div className={`w-full mt-4 pt-6 pb-2 px-16 ${isNavOpen ? 'block' : 'hidden'}`}>
        <div className='flex flex-col gap-5'>
          {Object.keys(SIDEBAR_ITEMS).map((key, index) => {
            const isActive = routeMatch(SIDEBAR_ROUTES[key])
            const isComingSoon = SIDEBAR_ROUTES[key] === "/coming-soon"
            return (
              <div key={key}>
                <Tooltip
                  title={
                    isComingSoon
                      ? `${SIDEBAR_ITEMS[key]} (Coming Soon)`
                      : SIDEBAR_ITEMS[key]
                  }
                  placement="bottom"
                >
                  <div className={`${isActive ? '' : 'cursor-pointer'}`} onClick={() => onClickMenu(SIDEBAR_ROUTES[key], isActive)}>
                    <span className={`text-[18px] ${isActive ? 'text-[#7F41E4]' : 'text-white'} text-white font-medium`}>{SIDEBAR_ITEMS[key]}</span>
                  </div>
                </Tooltip>
              </div>
            )
          })}
        </div>
        <div className="mt-6 w-full">
          <Wallet isMobile={true} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ zIndex: 2 }}>
      <div className="hidden lg:block fixed top-0 left-0 py-3 w-full items-center bg-[#000000] shadow-lg">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full bg-[#6FFF39] h-[10px] mb-2" />
          <div className="flex w-full px-10 max-w-[1440px] items-center justify-between">
            <div className="flex items-center gap-12">
              <a href="/"><Logo /></a>
              <LogoText />
            </div>
            <div>
              <NavMenu />
            </div>
            <div>
              <Wallet isMobile={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block lg:hidden fixed top-0 left-0 py-3 w-full items-center bg-[#000000] shadow-lg">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full bg-[#6FFF39] h-[10px] mb-2" />
          <div className="flex px-8 w-full items-center justify-between">
            <div className="flex items-center gap-10">
              <a href="/"><Logo /></a>
              <LogoText />
            </div>
            <div>
              <Wallet isMobile={false} />
            </div>
          </div>
          <div>
            <NavMenu />
          </div>
        </div>
      </div>
      <div className="md:hidden fixed top-0 left-0 py-3 w-full items-center bg-[#000000] shadow-lg">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full bg-[#6FFF39] h-[10px] mb-2" />
          <div className="flex w-full px-6 items-center justify-between">
            <div className="flex items-center gap-4 mt-2">
              <a href="/"><Logo_mobile /></a>
              <LogoText_mobile />
            </div>
            <div className='cursor-pointer' onClick={() => setIsNavOpen((v) => !v)}>
              {isNavOpen &&
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
              {!isNavOpen &&
                <NavIcon_mobile />}
            </div>
          </div>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

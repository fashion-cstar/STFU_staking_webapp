// eslint-disable-next-line react/jsx-pascal-case
import { PropsWithChildren } from "react"
import Header from "./Header"

export default function Layout({ children }: PropsWithChildren<{}>) {

  return (
    <>
      <div className='' style={{ minHeight: '100vh' }}>
        <div className="w-full min-h-screen pt-[84px] md:pt-[165px] lg:pt-[133px] md:pb-[40px] md:px-[40px] bg-[#FFFFFF] flex justify-center relative bg-[url('./assets/bg.svg')] bg-fixed bg-repeat">
          <div className="flex w-full h-full justify-center max-w-[1440px] md:border md:border-4 md:border-[#000000] bg-[#FFFFFF]">
            {children}
          </div>
        </div>
      </div>
      <Header />
    </>
  );
}

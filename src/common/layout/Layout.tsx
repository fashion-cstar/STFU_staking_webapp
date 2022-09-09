// eslint-disable-next-line react/jsx-pascal-case
import { PropsWithChildren } from "react"
import Header from "./Header"

export default function Layout({ children }: PropsWithChildren<{}>) {

  return (
    <>
      <div className='' style={{ height: '100vh' }}>
        <div className="w-full h-full md:p-10 bg-[#FFFFFF] flex justify-center relative bg-[url('./assets/bg.svg')] bg-fixed bg-repeat">
          <div className="flex w-full mt-[84px] md:mt-[125px] lg:mt-[93px] h-fit justify-center max-w-[1440px] md:border md:border-4 md:border-[#000000] bg-[#FFFFFF]">
            {children}
          </div>
        </div>
      </div>
      <Header />
    </>
  );
}

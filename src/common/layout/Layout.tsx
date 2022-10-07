// eslint-disable-next-line react/jsx-pascal-case
import { PropsWithChildren } from "react"
import Header from "./Header"

export default function Layout({ children }: PropsWithChildren<{}>) {

  return (
    <>
      <div className='' style={{ minHeight: '100vh' }}>
        <div className="w-full min-h-screen pt-[100px] md:pt-[124px] lg:pt-[92px] bg-[#FFFFFF] flex justify-center relative">
          <div className="flex w-full h-full justify-center bg-[#FFFFFF]">
            {children}
          </div>
        </div>
      </div>
      <Header />
    </>
  );
}

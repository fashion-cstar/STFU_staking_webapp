// eslint-disable-next-line react/jsx-pascal-case
import { PropsWithChildren } from "react"
import Bg_svg_lt from "./bg_svg/LeftTop"
import Bg_svg_rb from "./bg_svg/RightBottom"
import Bg_svg_rt from "./bg_svg/RightTop"
import Bg_svg_lb from "./bg_svg/LeftBottom"
import Header from "./Header"

export default function Layout({ children }: PropsWithChildren<{}>) {

  return (
    <div className='relative' style={{ minHeight: '100vh' }}>
      <div className="absolute top-0 left-0" style={{ zIndex: 0 }}>        
        <Bg_svg_lt />
      </div>
      <div className="absolute bottom-0 left-0" style={{ zIndex: 0 }}>        
        <Bg_svg_lb />
      </div>
      <div className="absolute top-0 right-0" style={{ zIndex: 0 }}>
        <Bg_svg_rt />
      </div>
      <div className="absolute bottom-0 right-0" style={{ zIndex: 0 }}>
        <Bg_svg_rb />
      </div>
      <Header />
      <div className="w-full h-full md:p-10 bg-[#FFFFFF] flex justify-center">
        <div className="flex w-full mt-[84px] md:mt-[125px] lg:mt-[93px] h-full justify-center max-w-[1440px] md:border md:border-4 md:border-[#000000] bg-[#FFFFFF]" style={{ zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

import { Dispatch, ReactNode, SetStateAction } from "react"
import Image from 'next/image'
import close from "../../public/close.svg"

type Props = {
    children: ReactNode,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Popup : React.FC<Props> = ({ children, isOpen, setIsOpen }) => {
  return (
    <div className={`h-screen w-full fixed flex items-center justify-center top-0 left-0 z-50 bg-black/70 ${(isOpen) ? 'flex' : 'hidden'}`}>
        <div className="w-full flex items-center justify-center">
          <div onClick={() => {setIsOpen(false)}} className="absolute top-3 right-4 w-fit cursor-pointer">
            <Image height={30} width={30} src={close} className="" onClick={() => {setIsOpen(false)}} alt="#" />
          </div>
            {children}
        </div>
    </div>
  )
}

export default Popup
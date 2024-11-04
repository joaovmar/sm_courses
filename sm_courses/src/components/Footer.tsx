import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { Logo } from "./Logo";
import { BiSupport } from "react-icons/bi";
import { IoEnterSharp } from "react-icons/io5";
import { FcContacts } from "react-icons/fc";
import { MdWork } from "react-icons/md";

export function Footer () {
    return(
        <div className="flex items-center gap-4 bg-slate-900 text-white p-4">
            <ul className="flex flex-col gap-4 text-gray-400 border-r border-slate-500 px-4 py-2 cursor-pointer">
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                    <BiSupport />
                    <p>Suporte</p>
                </li>
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                    <FcContacts />
                    <p>Sobre nós</p>
                </li>
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                    <MdWork />
                    <p>Trabalhe conosco</p>
                </li>
            </ul>
            <ul className="flex flex-col gap-4 text-gray-400 border-r border-slate-500 px-4 py-2 cursor-pointer">
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                    <BsYoutube />
                    <p>Youtube</p>
                </li>
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                <BsInstagram />
                    <p>Instagram</p>
                </li>
                <li className="flex gap-3 items-center hover:underline hover:text-white">
                    <BsTwitterX />
                    <p>Twitter - X</p>
                </li>
            </ul>
            {/* <div className="flex">
                <p><BsInstagram />  Instagram</p>
                <p>&copy; 2024 brioAnalytics. Todos os direitos reservados.</p>
            </div> */}
            <Logo className={`ml-auto w-1/12`}/>
        </div>
    )
}
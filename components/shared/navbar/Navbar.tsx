
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from '../search/GlobalSearch';


export default function Navbar(){
    return <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
        <Link href='/' className="flex items-center gap-2">
            <Image
                src='/assets/icons/sitelogo.ico'
                alt="ico"
                width={30}
                height={30}
            />
            <p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">Dev<span className="text-primary-500">Overflow</span></p>
        </Link>
        <GlobalSearch />
        <div className="flex-between gap-5">
            <Theme />
            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: 'h-7 w-7' 
                        },
                        variables: {
                            colorPrimary: '#ff7000'
                        }
                    }}
                />
            </SignedIn>
            <MobileNav />
        </div>
        
    </nav>
}
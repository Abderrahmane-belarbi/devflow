'use client'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"


export default function MobileNav() {
    return <Sheet>
        <SheetTrigger asChild>
            <Image
                className="invert-colors sm:hidden"
                src='/assets/icons/hamburger.svg'
                width={36}
                height={36}
                alt="menu"
            />
        </SheetTrigger>
        <SheetContent side='left' className="background-light900_dark200 border-none">
            <Link href='/' className="flex items-center gap-2">
                <Image
                    src='/assets/icons/sitelogo.ico'
                    alt="ico"
                    width={30}
                    height={30}
                />
                <p className="h2-bold text-dark100_light900 font-spaceGrotesk">Dev<span className="text-primary-500">Overflow</span></p>
            </Link>
            <div>
                <SheetClose asChild>
                    <NavContent />
                </SheetClose>

                <SignedOut>
                    <div className="flex flex-col gap-3">
                        <SheetClose>
                            <Link href='/sign-in'>
                                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                    <span className="primary-text-gradient">Login</span>
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose>
                            <Link href='/sign-up'>
                                <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
                                    Sign Up
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </SignedOut>
            </div>
        </SheetContent>
    </Sheet>
}

function NavContent() {
    const pathname = usePathname();
    return (
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                return (
                    <SheetClose key={item.route}>
                        <Link 
                            className={`${isActive ? 
                                'primary-gradient rounded-lg text-light-900' : 
                                'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
                            href={item.route}>
                            <Image src={item.imgURL} alt={item.label} width={20} height={20} />
                            <p>{item.label}</p>
                        </Link>
                    </SheetClose>
                )
            })}
        </section>
    )
}
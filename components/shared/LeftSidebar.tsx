'use client'
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function LeftSidebar() {
  const pathname = usePathname();
  return (
    <section className="
            background-light900_dark200
            light-border sticky left-0 top-0
            h-screen flex flex-col justify-between
            overflow-y-auto border-r p-6
            pt-36 shadow-light-300
            dark:shadow-none max-sm:hidden lg:w-[266px]
            custom-scrollbar">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
          return (
            <Link
              key={item.route}
              className={`${isActive ?
                'primary-gradient rounded-lg text-light-900' :
                'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
              href={item.route}>
              <Image className={`${isActive ? '' : 'invert-colors'}`} src={item.imgURL} alt={item.label} width={20} height={20} />
              <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href='/sign-in'>
            <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
              <Image // this is login icon and it will show up if the screen is meduim other wise it will dispeare
                className="invert-colors lg:hidden"
                src='/assets/icons/account.svg'
                alt="login"
                width={20}
                height={20}
              />
              <span className="primary-text-gradient max-lg:hidden">Login</span>
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
              <Image // this is login icon and it will show up if the screen is meduim other wise it will dispeare
                className="invert-colors lg:hidden"
                src='/assets/icons/sign-up.svg'
                alt="signup"
                width={20}
                height={20}
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  )
}
'use client'
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface CostumInputProps{
  route: string,
  iconPosition: string,
  imgSrc: string,
  placeholder: string,
  otherClasses?: string
}

export default function LocalSearchbar({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses
} : CostumInputProps) {

  return <div className={`background-light800_darkgradient flex min-h-[56px] glow items-center gap-4 rounded-xl px-4 ${otherClasses}`}>
    {
      iconPosition === 'left' && (
        <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      /> )
    }
    
    <Input
      type="text"
      placeholder={placeholder}
      value=''
      onChange={() => {}}
      className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
    />

    {
      iconPosition === 'right' && (
        <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      /> )
    }
  </div>
}
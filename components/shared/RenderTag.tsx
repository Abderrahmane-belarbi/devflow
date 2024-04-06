import Link from "next/link"
import { Badge } from "@/components/ui/badge" // install it from shadcn


interface Props {
  _id: string,
  name: string,
  totalQuestions?: number,
  showCount?: boolean,
  xPadding?: string,
  yPadding?: string,
  textsize?: string
}

export default function RenderTag({ _id, name, totalQuestions, showCount, xPadding='px-4', yPadding='py-2', textsize='subtle-medium'}: Props) {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between items-center gap-2">
      <Badge className={`${textsize} background-light800_dark300 text-light400_light500 rounded-md border-none ${xPadding} ${yPadding} uppercase`}>{name}</Badge>
      {showCount &&
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>}
    </Link>

  )
}
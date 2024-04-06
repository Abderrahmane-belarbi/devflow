import Link from "next/link"
import RenderTag from "../shared/RenderTag"
import Metric from "../shared/Metric"
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils"

interface QuestionProps{
  _id:string,
  title:string,
  tags:{
    _id:string,
    name:string,
  }[],
  author:{
    _id:string,
    name:string,
    picture:string
  },
  upvotes:number,
  views:number,
  answers:Array<Object>,
  createdAt:Date,
}

export default function QuestionCard({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps){
  return<div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
    <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
      <div>  
        <span className="subtle-regular text-dark400_light700 line-clamp-1 lg:hidden flex">
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 lg-line-clamp-1 flex-1">{title}</h3>
        </Link>
      </div>
      {/* if signed in add Edit Delete actions */}
    </div>
    {/* Tags */}
    <div className="mt-3.5 flex flex-wrap gap-2">
      {
        tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} xPadding="px-4 max-sm:px-2" yPadding="py-2 max-sm:py-1" textsize='subtle-medium max-sm:subtle-small'/>
        ))
      }
    </div>
    {/* Likes , Anwser , Views */}
    <div className="flex-between mt-6 w-full flex-wrap gap-3">
      <Metric 
        imgUrl='/assets/icons/avatar.svg'
        alt='avatar'
        value= {author.name}
        title={` • asked ${getTimestamp(createdAt)}`}
        textStyles='body-medium text-dark400_light700'
        href={`/profile/${author._id}`}
        isAuther
      />
      <div className="flex gap-2 lg:gap-7">
      <Metric 
        imgUrl='/assets/icons/like.svg'
        alt='upvote'
        value= {formatAndDivideNumber(upvotes)}
        title=' Votes'
        textStyles='small-medium text-dark400_light800'
      />
      <Metric 
        imgUrl='/assets/icons/message.svg'
        alt='message'
        value= {formatAndDivideNumber(answers.length)}
        title=' Answers'
        textStyles='small-medium text-dark400_light800'
      />
      <Metric 
        imgUrl='/assets/icons/eye.svg'
        alt='eye'
        value= {formatAndDivideNumber(views)}
        title=' Views'
        textStyles='small-medium text-dark400_light800'
      />
      </div>
    </div>
  </div>
}
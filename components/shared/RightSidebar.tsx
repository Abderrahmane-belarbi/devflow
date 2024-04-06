import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const hQ = [
  { _id: '1', title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?' },
  { _id: '2', title: 'Is it only me or the font is bolder than necessary?' },
  { _id: '3', title: 'Can I get the course for free?' },
  { _id: '4', title: 'Redux Toolkit Not Updating State as Expected' },
  { _id: '5', title: 'Async/Await Function Not Handling Errors Properly' },
];
const tags = [
  { _id: '1', name: "javascript", totalQuestions: 68 },
  { _id: '2', name: "react", totalQuestions: 4 },
  { _id: '3', name: "nextjs", totalQuestions: 22 },
  { _id: '4', name: "css", totalQuestions: 8 },
  { _id: '5', name: "html", totalQuestions: 6 },
];
export default function RightSidebar() {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex flex-col w-full gap-[30px]">
          {hQ.map((qst) => (
            <Link className="flex cursor-pointer items-center justify-between gap-7" key={qst._id} href={'/'}>
              <p className="body-medium text-dark500_light700">{qst.title}</p>
              <Image
                src='/assets/icons/chevron-right.svg'
                alt='rightarrow'
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}

        </div>
      </div>
    </section>
  )
}
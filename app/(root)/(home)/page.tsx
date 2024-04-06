import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/questions/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

/* const questions = [
  {
    _id: "q11",
    title: "What are the advantages of using MongoDB as a database?",
    tags: [
      {
        _id: "t11",
        name: "Databases"
      },
      {
        _id: "t12",
        name: "MongoDB"
      }
    ],
    author: {
      _id: "a11",
      name: "Sophie Turner",
      picture: "https://example.com/sophieturner.jpg"
    },
    upvotes: 70,
    views: 400,
    answers: [],
    createdAt: new Date("2024-03-31T14:30:00.000Z")
  },
  {
    _id: "q12",
    title: "How can you efficiently handle large datasets in Python?",
    tags: [
      {
        _id: "t13",
        name: "Python"
      },
      {
        _id: "t14",
        name: "Data_Science"
      }
    ],
    author: {
      _id: "a12",
      name: "Ethan Johnson",
      picture: "https://example.com/ethanjohnson.jpg"
    },
    upvotes: 75,
    views: 420,
    answers: [],
    createdAt: new Date("2022-08-15T05:20:00.000Z")
  },
  {
    _id: "q13",
    title: "What are the best practices for responsive web design?",
    tags: [
      {
        _id: "t15",
        name: "Web_Development"
      },
      {
        _id: "t16",
        name: "CSS"
      }
    ],
    author: {
      _id: "a13",
      name: "Ava Thompson",
      picture: "https://example.com/avathompson.jpg"
    },
    upvotes: 80,
    views: 450,
    answers: [],
    createdAt: new Date("2023-10-07T20:45:00.000Z")
  },
  {
    _id: "q14",
    title: "How do you ensure code quality in a team environment?",
    tags: [
      {
        _id: "t17",
        name: "Software_Development"
      },
      {
        _id: "t18",
        name: "Code_Quality"
      }
    ],
    author: {
      _id: "a14",
      name: "Liam Roberts",
      picture: "https://example.com/liamroberts.jpg"
    },
    upvotes: 85,
    views: 480,
    answers: [],
    createdAt: new Date("2024-03-01T10:15:00.000Z")
  },
  {
    _id: "q15",
    title: "What are the key features of Angular framework?",
    tags: [
      {
        _id: "t19",
        name: "Angular"
      },
      {
        _id: "t20",
        name: "JavaScript"
      }
    ],
    author: {
      _id: "a15",
      name: "Mia Wilson",
      picture: "https://example.com/miawilson.jpg"
    },
    upvotes: 90,
    views: 500,
    answers: [],
    createdAt: new Date("2024-03-30T08:05:00.000Z")
  },
  {
    _id: "q16",
    title: "How can you effectively manage project timelines?",
    tags: [
      {
        _id: "t21",
        name: "Project_Management"
      },
      {
        _id: "t22",
        name: "Time_Management"
      }
    ],
    author: {
      _id: "a16",
      name: "Noah Martinez",
      picture: "https://example.com/noahmartinez.jpg"
    },
    upvotes: 95,
    views: 520,
    answers: [],
    createdAt: new Date("2022-06-11T15:40:00.000Z")
  },
  {
    _id: "q17",
    title: "What are the advantages of using cloud computing?",
    tags: [
      {
        _id: "t23",
        name: "Cloud_Computing"
      },
      {
        _id: "t24",
        name: "Technology"
      }
    ],
    author: {
      _id: "a17",
      name: "Oliver Clark",
      picture: "https://example.com/oliverclark.jpg"
    },
    upvotes: 100,
    views: 550,
    answers: [],
    createdAt: new Date("2023-08-25T19:55:00.000Z")
  },
  {
    _id: "q18",
    title: "How do you secure a RESTful API?",
    tags: [
      {
        _id: "t25",
        name: "API"
      },
      {
        _id: "t26",
        name: "Security"
      }
    ],
    author: {
      _id: "a18",
      name: "Charlotte White",
      picture: "https://example.com/charlottewhite.jpg"
    },
    upvotes: 105,
    views: 580,
    answers: [],
    createdAt: new Date("2023-01-18T13:25:00.000Z")
  },
  {
    _id: "q19",
    title: "What are the differences between Scrum and Kanban?",
    tags: [
      {
        _id: "t27",
        name: "Agile"
      },
      {
        _id: "t28",
        name: "Project_Management"
      }
    ],
    author: {
      _id: "a19",
      name: "Henry Garcia",
      picture: "https://example.com/henrygarcia.jpg"
    },
    upvotes: 110,
    views: 600,
    answers: [],
    createdAt: new Date("2023-02-22T11:10:00.000Z")
  },
  {
    _id: "q20",
    title: "How do you handle errors and exceptions in Python?",
    tags: [
      {
        _id: "t29",
        name: "Python"
      },
      {
        _id: "t30",
        name: "Error_Handling"
      }
    ],
    author: {
      _id: "a20",
      name: "Amelia Taylor",
      picture: "https://example.com/ameliataylor.jpg"
    },
    upvotes: 115,
    views: 620,
    answers: [],
    createdAt: new Date("2022-10-30T06:35:00.000Z")
  }
]; */


export default async function Home() {
  const result = await getQuestions({})
  console.log(result.questions);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900 sm:items-center">All Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href='/ask-question'>
          <Button className="primary-gradient min-h-[46px px-4 py-4 !text-light-900]">Ask Question</Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
        />
        {/* Filter of selector displays in med and small devices */}
        <Filter
          filters={HomePageFilters}
          containerClasses='max-w-[170px] hidden max-lg:flex'
          otherClasses='min-h-[56px] sm:min-w-[155px] sm:text-red'
        />
      </div>

      {/* Filter Display on larger device */}
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping thorugh questions */}
        
        {
          result.questions.length > 0 ? 
            result.questions.map((qst) => (

              <QuestionCard
                key={qst._id}
                _id={qst._id}
                title={qst.title}
                tags={qst.tags}
                author={qst.author}
                upvotes={qst.upvotes}
                views={qst.views}
                answers={qst.answers}
                createdAt={qst.createdAt}
              />

            ) ) : 
            <NoResult 
              title='There`s no question to show'
              description='Be the first to break the silence! Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!'
              link='/ask-question'
              linkTitle='Ask a Question'
            /> 
        }

      </div>
    </>
  )
}
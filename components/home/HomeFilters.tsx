'use client'
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";


export default function HomeFilters(){
  const selectedFilter = 'newest';
  return (
    <div className="mt-10 flex-wrap gap-3 hidden lg:flex"> {/* going to be earher hidden or flex on larg devices */}
      {HomePageFilters.map((filter) => (
        <Button key={filter.value} onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${selectedFilter === filter.value
          ? 'bg-primary-100 dark:bg-dark-400 text-primary-500'
          : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400'
        }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}
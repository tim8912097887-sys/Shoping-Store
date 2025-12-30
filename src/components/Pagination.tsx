import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { Link } from "react-router"
import { useSearchFilter } from "../hooks/useSearchFilter"

type Props = {
  totalPages: number
}

const Pagination = ({ totalPages }: Props) => {

  const { page,getNewParams } = useSearchFilter();

  const currentPage = Number(page) || 0;

  const firstButton = Math.max(0,currentPage-1);
  const lastButton = Math.min(currentPage+1,totalPages-1);

  return (
    <div className="flex items-center gap-2 my-4">
       {/* Display as plain text on the first page */}
       {
        currentPage>0?
          <Link data-testid="previous-link" to={{
            pathname: "/",
            search: getNewParams({ page: (currentPage-1).toString() })
          }} className="text-2xl flex items-center px-5 py-3 gap-2.5 cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">
            <FaAngleLeft />
            <span>Previous</span>
          </Link>
        :
          <div data-testid="disable-previous" className="text-2xl rounded flex items-center px-5 py-3 gap-2.5 text-gray-400">
            <FaAngleLeft />
            <span>Previous</span>
          </div>
       }
       {/* Only display first button alone when the center buttons can't reach first one */}
       {
         currentPage>1 &&
         <Link to={{
           pathname: '/',
           search: getNewParams({ page: "0" })
         }} className="w-8 h-8 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">1</Link>
       }
       {/* Only display first part of dot when the center buttons can't reach third one */}
       {
        currentPage>3 && 
        <p data-testid="first-dot" className="text-2xl text-gray-400">...</p>
       }
       {/* Only display second button alone when the interval between current page and total page is two */}
       {currentPage===3 && 
         <Link to={{
           pathname: '/',
           search: getNewParams({ page: "1" })
         }} className="w-8 h-8 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">2</Link>
       }
       {/* Center buttons */}
       {
         Array.from({ length: lastButton-firstButton+1 },(_,i) => i).map((_,index) => {
            
            const pageIdx = firstButton+index;
            const isActive = pageIdx===currentPage;

            return (isActive?
              <div data-testid="current-page" key={currentPage}>
                {currentPage+1}
              </div>
            : 
            <Link key={firstButton+index} to={{
                  pathname: '/',
                  search: getNewParams({ page: (firstButton+index).toString() })
            }} className="w-8 h-8 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">{firstButton+index+1}</Link>)
         })
       }
       {/* Only display last second button alone when the interval between current page and total page is two */}
       {currentPage===(totalPages-4) && 
         <Link to={{
           pathname: '/',
           search: getNewParams({ page: (totalPages-2).toString() })
         }} className="w-8 h-8 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">{totalPages-1}</Link>
       }
       {/* Only display last part of dot when the center buttons can't reach last third one */}
       {
        currentPage<(totalPages-4) && 
        <p data-testid="last-dot" className="text-2xl text-gray-400">...</p>
       }
       {/* Only display last button alone when the center buttons can't reach last one */}
       {
         currentPage<(totalPages-2) &&
         <Link to={{
           pathname: '/',
           search: getNewParams({ page: (totalPages-1).toString() })
         }} className="w-8 h-8 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">{totalPages}</Link>
       }
       {/* Display as plain text on the last page */}
       {
         currentPage===(totalPages-1)?
           <div data-testid="disable-next" className="text-2xl flex items-center px-5 py-3 gap-2.5 text-gray-400 rounded">
            <FaAngleRight />
            <span>Next</span>
           </div>
         :
           <Link data-testid="next-link" to={{
              pathname: "/",
              search: getNewParams({ page: (currentPage+1).toString() })
            }} className="text-2xl flex items-center px-5 py-3 gap-2.5 cursor-pointer hover:bg-gray-500 transition-all duration-200 rounded">
              <FaAngleRight />
              <span>Next</span>
            </Link>
       }
    </div>
  )
}

export default Pagination
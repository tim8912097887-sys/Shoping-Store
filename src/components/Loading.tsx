import { FaSpinner } from "react-icons/fa"

const Loading = () => {
  return (
    <div className="w-dvw h-dvh flex justify-center">
       <div>
         <FaSpinner className="text-6xl"/>
       </div>
    </div>
  )
}

export default Loading
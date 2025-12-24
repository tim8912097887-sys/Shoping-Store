import RegisterForm from "../components/RegisterForm"

const Signup = () => {
  return (
    <div className="w-dvw flex justify-center py-8">
       <RegisterForm isLogin={false} />
    </div>
  )
}

export default Signup
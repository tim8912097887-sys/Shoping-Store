import RegisterForm from "../components/RegisterForm"

const Login = () => {

  return (
    <div className="w-dvw flex justify-center py-8">
      <RegisterForm isLogin={true} />
    </div>
  )
}

export default Login
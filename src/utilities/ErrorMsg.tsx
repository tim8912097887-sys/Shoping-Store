
type Props = {
    msg: string
}

const ErrorMsg = ({ msg }: Props) => {
  return (
    <p className="text-red-500 text-[1rem]">{msg}</p>
  )
}

export default ErrorMsg
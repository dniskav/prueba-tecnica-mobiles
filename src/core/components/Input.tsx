export const Input = ({ type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="input-wrapper">
      <input type="text" {...props} />
    </div>
  )
}

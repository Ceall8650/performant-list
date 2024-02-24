type CardBaseProps = {
  title: string,
  description?: string,
}

type Props = CardBaseProps & React.HTMLAttributes<HTMLDivElement>

function CardBase({ title, description, className }: Props) {
  let rootClasses = "bg-white rounded-md"

  if (className) {
    rootClasses = `${rootClasses} ${className}`
  }

  return (
    <div className={rootClasses}>
      <div className="px-5 py-3 text-lg font-semibold">{title}</div>
      <div className="px-5 py-3">{description}</div>
    </div>
  )
}

export default CardBase

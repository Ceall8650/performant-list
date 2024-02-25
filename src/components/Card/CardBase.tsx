import { forwardRef } from 'react';

type CardBaseProps = {
  title: string,
  description?: string,
  dataKey?: number,
}

type Ref = HTMLDivElement;

type Props = CardBaseProps
  & React.HTMLAttributes<HTMLDivElement>

const CardBase = forwardRef<Ref, Props>(({ title, description, className, dataKey }: Props, ref) => {
  let rootClasses = "bg-white rounded-md h-[125px]"

  if (className) {
    rootClasses = `${rootClasses} ${className}`
  }

  return (
    <div ref={ref} className={rootClasses} data-key={dataKey}>
      <div className="px-5 py-3 text-lg font-semibold">{title}</div>
      <div className="px-5 py-3">{description}</div>
    </div>
  )
})

export default CardBase

import { forwardRef } from 'react';
import useMedia from 'use-media';
import mediaSize from 'utils/mediaSize';

type CardBaseProps = {
  title: string,
  description?: string,
  dataKey?: number,
}
type Ref = HTMLDivElement;
type Props = CardBaseProps
  & React.HTMLAttributes<HTMLDivElement>

const CardBase = forwardRef<Ref, Props>(({ title, description, className, dataKey }: Props, ref) => {
  const isTablet = useMedia({ maxWidth: mediaSize.tablet })
  let rootClasses = "bg-white rounded-md h-[150px]"
  let descriptionClasses = "px-5 py-3"

  if (className) {
    rootClasses = `${rootClasses} ${className}`
  }

  if (!isTablet) {
    descriptionClasses = `${descriptionClasses} truncate`
    rootClasses = `${rootClasses} h-[125px]`
  }

  return (
    <div ref={ref} className={rootClasses} data-key={dataKey}>
      <div className="px-5 py-3 text-lg font-semibold">{title}</div>
      <div title={description} className={descriptionClasses}>{description}</div>
    </div>
  )
})

export default CardBase

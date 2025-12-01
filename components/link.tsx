import { cn } from '@/lib/utils'

export function Link({
  className,
  label,
  url,
}: {
  className?: string
  label: string
  url: string
}) {
  return (
    <span
      className={cn(
        'text-blue-500 cursor-pointer ml-1 underline hover:text-blue-700',
        className,
      )}
      onClick={() => browser.tabs.create({ url })}
    >
      {label}
    </span>
  )
}

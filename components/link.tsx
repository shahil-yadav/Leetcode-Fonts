import { cn } from "@/lib/utils"

export function Link({
  url,
  label,
  className
}: {
  url: string
  label: string
  className?: string
}) {
  return (
    <span
      onClick={() => browser.tabs.create({ url })}
      className={cn("text-blue-500 cursor-pointer ml-1 underline hover:text-blue-700", className)}
    >
      {label}
    </span>
  )
}

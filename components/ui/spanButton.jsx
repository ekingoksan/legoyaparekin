import React from 'react'
import { cn } from "@/lib/utils"

const SpanButton = ({text, children, className}) => {
  return (
    <span className={cn(
        "bg-primary text-primary-foreground shadow hover:bg-primary/90 px-5 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {text}
      {children}
    </span>
  )
}

export default SpanButton

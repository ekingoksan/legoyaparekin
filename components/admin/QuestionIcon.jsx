import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from 'react'

const QuestionIcon = ({text}) => {
  return (
    <HoverCard>
        <HoverCardTrigger>
            <i className='bi bi-question-circle'></i>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="bg-gray-800 text-white border-gray-800">
            {text}
        </HoverCardContent>
    </HoverCard>
  )
}

export default QuestionIcon

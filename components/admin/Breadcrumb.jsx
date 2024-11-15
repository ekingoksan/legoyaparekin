import Link from 'next/link'
import React from 'react'

function Breadcrumb({ data}) {
  return (
    <div className="flex items-center justify-start w-full text-black text-sm">
      <ul className="flex w-full justify-end">
        {data.map((item, index) => (
          <li key={index}>
            {index !== data.length - 1 ? (
                <Link href={`${item.link}`}>
                    <span>{item.title}</span>
                    <i className="bi-chevron-right"></i>
                </Link>
            ) : (
                <Link href={`${item.link}`} className="font-bold">{item.title}</Link>
            )}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Breadcrumb
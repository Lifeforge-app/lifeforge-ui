import React from 'react'

function ContentWrapperWithSidebar({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-full flex-1 flex-col lg:ml-6">{children}</div>
}

export default ContentWrapperWithSidebar

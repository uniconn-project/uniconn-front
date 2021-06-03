import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Links({ project }) {
  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return <div className="p-2">Links</div>
}

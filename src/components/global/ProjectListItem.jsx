import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import CommentIcon from '@material-ui/icons/Comment'
import { MyProfileContext } from '../../contexts/MyProfile'
import { AuthContext } from '../../contexts/Auth'

export default function ProjectListItem({
  project,
  setStarsModal,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [starred, setStarred] = useState(false)
  const [starCount, setStarCount] = useState(project.stars.length)

  useEffect(() => {
    if (!myProfile) return

    setStarred(
      project.stars.map(star => star.profile.id).includes(myProfile.id)
    )
    setStarCount(project.stars.length)
  }, [myProfile, project])

  const starProject = async e => {
    e.stopPropagation()
    setStarCount(starCount + 1)
    setStarred(true)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/star-project/${project.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount - 1)
          setStarred(false)
        }
      })
  }

  const unstarProject = async e => {
    e.stopPropagation()
    setStarCount(starCount - 1)
    setStarred(false)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/unstar-project/${project.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount + 1)
          setStarred(true)
        }
      })
  }

  return (
    <Link href={`/project/${project.id}`}>
      <div className="w-full mb-4 rounded-md shadow-lg cursor-pointer bg-transparent bg-hover">
        <div className="flex justify-between px-4 pt-4">
          <div style={{ maxWidth: '60%' }}>
            <h4 className="break-words">{project.name}</h4>
          </div>
          <div className="flex items-center">
            {project.members_profiles.slice(0, 3).map(profile => (
              <Link href={`/user/${profile.user.username}`} key={profile.id}>
                <Tooltip
                  title={profile.user.username}
                  className="bg-light"
                  arrow
                >
                  <img
                    src={profile.photo}
                    className="profile-img-sm mx-0.5 cursor-pointer"
                  />
                </Tooltip>
              </Link>
            ))}
          </div>
        </div>
        <div className="b-bottom-transparent px-4 pb-4">
          <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden mb-2">
            {project.slogan}
          </p>
          <img
            src={project.image}
            className="w-80 h-52 rounded-md object-cover mb-2"
          />
          <div className={`text-sm px-2 w-max color-${project.category.value}`}>
            {project.category.readable}
          </div>
        </div>
        <div className="p-2 flex items-center">
          <Tooltip title="Curtidas" placement="bottom" arrow>
            <div className="flex mr-2 cursor-pointer">
              {starred ? (
                <StarIcon
                  className="icon-sm mr-1 color-primary"
                  onClick={unstarProject}
                />
              ) : (
                <StarBorderIcon
                  className="icon-sm mr-1 color-primary-hover"
                  onClick={starProject}
                />
              )}{' '}
              <span
                className="hover:underline"
                onClick={e => {
                  e.stopPropagation()
                  setStarsModal({
                    isOpen: true,
                    profiles: project.stars.map(star => star.profile)
                  })
                }}
              >
                {starCount}
              </span>
            </div>
          </Tooltip>
          <Tooltip title="Discussões" placement="bottom" arrow>
            <div>
              <CommentIcon className="icon-xs" /> {project.discussions_length}
            </div>
          </Tooltip>
        </div>
      </div>
    </Link>
  )
}

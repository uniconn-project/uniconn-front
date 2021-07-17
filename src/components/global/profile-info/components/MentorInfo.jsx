import React, { useContext, useEffect } from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import useFetch from '../../../../hooks/useFetch'
import { MyProfileContext } from '../../../../contexts/MyProfile'
import { mutate } from 'swr'

export default function MentorInfo({ profile }) {
  const { myProfile } = useContext(MyProfileContext)

  const { data: markets } = useFetch(
    `profiles/get-mentor-markets/${profile.user.username}`
  )

  useEffect(() => {
    if (myProfile.id !== profile.id) return

    mutate(`profiles/get-mentor-markets/${myProfile.user.username}`)
  }, [myProfile]) // eslint-disable-line

  if (!markets) {
    return <CircularProgress size={20} />
  }

  return (
    <>
      {profile.linkedIn && (
        <li className="pb-2 break-all">
          <a
            href={`https://www.linkedin.com/in/${profile.linkedIn}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="color-paragraph hover:underline">
              <LinkedInIcon className="icon-sm" /> {profile.linkedIn}
            </div>
          </a>
        </li>
      )}
      <li className="pb-2">
        <div className="w-full flex items-center mb-1">
          <span>
            <AssignmentIcon className="icon-sm" /> Expertises:
          </span>
        </div>
        <ul className="max-h-24 overflow-y-auto">
          {markets.map(market => (
            <li key={market.id}>
              <ArrowRightAltIcon className="color-primary icon-sm" />{' '}
              {market.name}
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'
import Logout from '../../helpers/Logout'

export default function DesktopMenu() {
  const { myProfile } = useContext(MyProfileContext)

  const [isOpen, setIsOpen] = useState(false)

  const anchorRef = useRef(null)

  return (
    <div className="flex">
      {myProfile !== null ? (
        <img
          ref={anchorRef}
          src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
          className="profile-img-sm mr-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <CircularProgress size={30} />
      )}
      <Badge
        badgeContent={5}
        className="cursor-pointer color-paragraph color-hover"
      >
        <NotificationsIcon />
      </Badge>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        className="z-20"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <MenuList>
                  <Link href="/profile">
                    <MenuItem onClick={() => setIsOpen(false)}>Perfil</MenuItem>
                  </Link>
                  <MenuItem onClick={() => setIsOpen(false)}>
                    <Logout />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
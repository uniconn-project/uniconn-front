import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person'
import SchoolIcon from '@material-ui/icons/School'
import { makeStyles } from '@material-ui/core'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
  button: {
    width: 175,
    margin: 10
  }
}))

export default function Signup() {
  const classes = useStyles()

  return (
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center pt-40">
        <div className="m-10">
          <h1>Uniconn</h1>
        </div>
        <div>
          <Link href="/signup/mentor">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<PersonIcon />}
            >
              Sou mentor
            </Button>
          </Link>
          <Link href="/signup/student">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SchoolIcon />}
            >
              Sou aluno
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  )
}

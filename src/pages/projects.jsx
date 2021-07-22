import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import ProjectList from '../components/global/ProjectList'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import ProjectsFilter from '../components/pages/home/ProjectsFilter'
import useFetch from '../hooks/useFetch'
import { MyProfileContext } from '../contexts/MyProfile'

export default function Projects() {
  const { myProfile } = useContext(MyProfileContext)

  const { data: projects } = useFetch('projects/get-projects-list')

  const [renderedProjects, setRenderedProjects] = useState(null)

  useEffect(() => {
    if (renderedProjects !== null) return

    setRenderedProjects(projects)
  }, [projects]) // eslint-disable-line

  if (!myProfile) {
    return (
      <Page title="Projetos | Uniconn" page="projects" loginRequired header>
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page title="Projetos | Uniconn" page="projects" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectsFilter
              projects={projects}
              setRenderedProjects={setRenderedProjects}
            />
            <div className="w-full flex flex-col items-center px-2">
              <ProjectList projects={renderedProjects} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
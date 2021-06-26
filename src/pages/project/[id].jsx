import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Page from '../../components/Page'
import ProjectInfo from '../../components/pages/project/ProjectInfo'
import ProjectHeader from '../../components/pages/project/ProjectHeader'
import Description from '../../components/pages/project/subpages/description/Description'
import Discussions from '../../components/pages/project/subpages/discussions/Discussions'
import Links from '../../components/pages/project/subpages/links/Links'
import Members from '../../components/pages/project/subpages/members/Members'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getServerSideProps = async context => {
  const project = await fetcher(`projects/get-project/${context.params.id}`)

  if (!project || !project.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project: project
    }
  }
}

export default function Project(props) {
  const [project, setProject] = useState(null)
  const [page, setPage] = useState('description')
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    value: ''
  })

  const { data: fetchedProject } = useFetch(
    `projects/get-project/${props.project.id}`,
    {
      initialData: props.project
    }
  )

  useEffect(() => {
    setProject(fetchedProject)
  }, [fetchedProject])

  if (!project) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }

  async function refetchProject(action) {
    setProject(null)
    const updatedProject = await fetcher(`projects/get-project/${project.id}`)
    setProject(updatedProject)

    switch (action) {
      case 'edit':
        setSuccessMsg({
          isOpen: true,
          value: 'Projeto editado com sucesso!'
        })
        break

      case 'edit-description':
        setSuccessMsg({
          isOpen: true,
          value: 'Descrição editada com sucesso!'
        })
        break

      case 'invite-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Convites enviados!'
        })
        break

      case 'uninvite-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Convite removido!'
        })
        break

      case 'add-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link adicionado!'
        })
        break

      case 'delete-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link removido!'
        })
        break

      case 'remove-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Usuário removido!'
        })
        break

      case 'ask-to-join-project':
        setSuccessMsg({
          isOpen: true,
          value: 'Solicitação enviada!'
        })
        break

      case 'add-discussion':
        setSuccessMsg({
          isOpen: true,
          value: 'Discussão criada!'
        })
        break
    }
  }

  return (
    <Page
      title={`${project.name} | Uniconn`}
      page="project"
      loginRequired
      header
    >
      <div className="w-full h-full flex flex-col justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProjectInfo
                project={project}
                setPage={setPage}
                refetchProject={refetchProject}
              />
              <Snackbar
                open={successMsg.isOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessMsg({ isOpen: false, value: '' })}
              >
                <Alert severity="success">{successMsg.value}</Alert>
              </Snackbar>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectHeader page={page} setPage={setPage} />
            {page === 'description' && (
              <Description project={project} refetchProject={refetchProject} />
            )}
            {page === 'discussions' && (
              <Discussions project={project} refetchProject={refetchProject} />
            )}
            {page === 'links' && (
              <Links project={project} refetchProject={refetchProject} />
            )}
            {page === 'students' && (
              <Members
                type="student"
                project={project}
                refetchProject={refetchProject}
              />
            )}
            {page === 'mentors' && (
              <Members
                type="mentor"
                project={project}
                refetchProject={refetchProject}
              />
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}

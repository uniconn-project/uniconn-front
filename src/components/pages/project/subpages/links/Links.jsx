import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ListAltIcon from '@material-ui/icons/ListAlt'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import LinkIcon from '@material-ui/icons/Link'
import InfoModal from './components/InfoModal'
import AddLinkModal from './components/AddLinkModal'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Links({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  const publicLinks = project.links.filter(link => link.is_public)
  const privateLinks = project.links.filter(link => !link.is_public)

  const isProjectMember = project.students
    .concat(project.mentors)
    .map(profile => profile.id)
    .includes(myProfile.id)

  const handleDelete = async linkId => {
    if (window.confirm('Remover link?')) {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/projects/delete-link`, {
        method: 'DELETE',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          link_id: linkId,
          project_id: project.id
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('delete-link')
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
  }

  return (
    <div className="p-2">
      <div className="sticky top-24 w-full mb-4 sm:top-32">
        <div className="w-full flex justify-between items-center bg-light h-14 rounded-md shadow-lg p-2">
          <span>Links do projeto</span>
          <InfoModal />
        </div>
      </div>
      <div>
        {publicLinks.map(link => (
          <div
            key={link.id}
            className="flex bg-transparent rounded-md shadow-lg mb-4 bg-hover"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="no-underline flex-grow"
            >
              <div className="flex items-center p-4 color-paragraph">
                <PublicIcon className="icon-sm mr-2" />
                <div className="break-all">{link.name}</div>
              </div>
            </a>
            {isProjectMember && (
              <div
                className="cursor-pointer p-2"
                onClick={() => handleDelete(link.id)}
              >
                <DeleteIcon className="icon-sm color-red-hover" />
              </div>
            )}
          </div>
        ))}
      </div>
      {isProjectMember && (
        <>
          <div>
            {privateLinks.map(link => (
              <div
                key={link.id}
                className="flex bg-transparent rounded-md shadow-lg mb-4 bg-hover"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline flex-grow"
                >
                  <div className="flex items-center p-4 color-paragraph">
                    <LockIcon className="icon-sm mr-2" />
                    <div>{link.name}</div>
                  </div>
                </a>
                <div
                  className="cursor-pointer p-2"
                  onClick={() => handleDelete(link.id)}
                >
                  <DeleteIcon className="icon-sm color-red-hover" />
                </div>
              </div>
            ))}
          </div>
          <AddLinkModal project={project} refetchProject={refetchProject}>
            <div>
              <div className="flex items-center w-full">
                <ListAltIcon className="color-primary mr-2" />
                <strong className="color-primary">
                  Adicionar gerenciador de tarefas
                </strong>
              </div>
              <span className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                architecto quidem totam a facere, voluptates laborum nam
                consequatur vero et officiis repellendus amet eius recusandae
                dignissimos pariatur nobis cum! Asperiores.
              </span>
            </div>
          </AddLinkModal>
          <AddLinkModal project={project} refetchProject={refetchProject}>
            <div>
              <div className="flex items-center w-full">
                <CreateNewFolderIcon className="color-primary mr-2" />
                <strong className="color-primary">Adicionar nuvem</strong>
              </div>
              <span className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                architecto quidem totam a facere, voluptates laborum nam
                consequatur vero et officiis repellendus amet eius recusandae
                dignissimos pariatur nobis cum! Asperiores.
              </span>
            </div>
          </AddLinkModal>
          <AddLinkModal project={project} refetchProject={refetchProject}>
            <div>
              <div className="flex items-center w-full">
                <LinkIcon className="color-primary mr-2" />
                <strong className="color-primary">Adicionar link</strong>
              </div>
            </div>
          </AddLinkModal>
        </>
      )}
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}

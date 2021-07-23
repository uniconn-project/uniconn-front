import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getStaticProps = async () => {
  const universities = await fetcher('universities/get-universities-name-list')
  const majors = await fetcher('universities/get-majors-name-list')
  const skills = await fetcher('profiles/get-skills-name-list')

  return {
    props: {
      universities,
      majors,
      skills
    },
    revalidate: 60 * 60 // 1 hour
  }
}

export default function StudentBaseForm(props) {
  const [postData, setPostData] = props.usePostData()

  const { data: universities } = useFetch(
    'universities/get-universities-name-list',
    {
      initialData: props.universities
    }
  )

  const { data: majors } = useFetch('universities/get-majors-name-list', {
    initialData: props.majors
  })

  const { data: skills } = useFetch('profiles/get-skills-name-list', {
    initialData: props.skills
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!universities || !majors || !skills) {
    return <CircularProgress />
  }

  return (
    <>
      <div
        className={`w-full flex justify-center items-center mb-4 ${
          props.className ? props.className : ''
        }`}
      >
        <FormControl className="w-2/5" style={{ marginRight: '.5rem' }}>
          <InputLabel id="university-input-label">Universidade</InputLabel>
          <Select
            labelId="university-input-label"
            data-cy="student-university-select"
            value={postData.university}
            onChange={handleChange('university')}
          >
            {universities.map(university => (
              <MenuItem key={university.id} value={university.name}>
                {university.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="w-2/5" style={{ marginLeft: '0.5rem' }}>
          <InputLabel id="major-input-label">Curso</InputLabel>
          <Select
            labelId="major-input-label"
            data-cy="student-major-select"
            value={postData.major}
            onChange={handleChange('major')}
          >
            {majors.map(major => (
              <MenuItem key={major.id} value={major.name}>
                {major.name[0].toUpperCase()}
                {major.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-4/5">
        <FormControl className="w-full" style={{ marginBottom: '1rem' }}>
          <InputLabel id="student-skills-select-label">
            Quais são suas habilidades?
          </InputLabel>
          <Select
            data-cy="student-skills-select"
            labelId="student-skills-select-label"
            multiple
            value={postData.skills}
            onChange={handleChange('skills')}
            renderValue={selected => (
              <div className="overflow-x-auto">
                {selected.map(value => (
                  <Chip key={value} label={value} className="b-primary mr-1" />
                ))}
              </div>
            )}
          >
            {skills.map(skill => (
              <MenuItem key={skill.id} value={skill.name}>
                {skill.name[0].toUpperCase()}
                {skill.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  )
}

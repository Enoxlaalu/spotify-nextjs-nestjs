import Button from '@/components/Button/Button'
import StepsWrapper from '@/components/StepsWrapper/StepsWrapper'
import Layout from '@/layouts/Layout'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import FileUpload from '@/components/FileUpload/FileUpload'
import useInput from '@/hooks/useInput'
import Input from '@/components/Input/Input'
import { useRouter } from 'next/router'

const Create = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(1)
  const [image, setImage] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const trackName = useInput('')
  const artist = useInput('')
  const comment = useInput('')

  const goBack = () => setActiveStep(activeStep - 1)
  const goForward = () => {
    if (activeStep === 3) {
      const formData = new FormData()
      formData.append('name', trackName.value)
      formData.append('artist', artist.value)
      formData.append('comment', comment.value)
      formData.append('picture', image as Blob)
      formData.append('audio', audio as Blob)

      fetch('http://localhost:5000/tracks', {
        method: 'POST',
        body: formData,
      })
        .then(() => router.push('/tracks'))
        .catch((err) => console.log(err))
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <Input id="name" label="Track Name" {...trackName} />
            <Input id="artist" label="Artist Name" {...artist} />
            <Input id="commnent" label="Comment" textarea={3} {...comment} />
          </div>
        )
      case 2:
        return (
          <FileUpload accept="image/*" setFile={setImage}>
            <Button text="Upload cover" />
          </FileUpload>
        )
      case 3:
        return (
          <FileUpload accept="audio/*" setFile={setAudio}>
            <Button text="Upload track" />
          </FileUpload>
        )
    }
  }

  return (
    <Layout>
      <div className={styles.createPage}>
        <StepsWrapper activeStep={activeStep} />
        {renderStep()}
        <div>
          <Button text="Back" onClick={goBack} disabled={activeStep === 1} />
          <Button
            text={activeStep === 3 ? 'Create' : 'Next'}
            onClick={goForward}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Create

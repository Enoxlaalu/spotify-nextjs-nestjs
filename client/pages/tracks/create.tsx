import Button from '@/components/Button/Button'
import StepsWrapper from '@/components/StepsWrapper/StepsWrapper'
import Layout from '@/layouts/Layout'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import FileUpload from '@/components/FileUpload/FileUpload'
import useInput from '@/hooks/useInput'
import Input from '@/components/Input/Input'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/api'

const Create = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const trackName = useInput('')
  const artist = useInput('')
  const comment = useInput('')

  const goBack = () => setActiveStep(activeStep - 1)
  const goForward = () => {
    if (activeStep === 0) {
      if (!trackName.value || !artist.value)
        return alert('Fill in track name and artist')
      setActiveStep(1)
    } else if (activeStep === 1) {
      if (!image) return alert('Please upload a cover image')
      setActiveStep(2)
    } else if (activeStep === 2) {
      if (!audio) return alert('Please upload an audio file')

      const formData = new FormData()
      formData.append('name', trackName.value)
      formData.append('artist', artist.value)
      formData.append('text', comment.value)
      formData.append('picture', image)
      formData.append('audio', audio)

      return fetch(`${API_URL}/tracks`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error('Upload failed')
          router.push('/tracks')
        })
        .catch(() => alert('Failed to create track. Please try again.'))
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Input id="name" label="Track Name" {...trackName} />
            <Input id="artist" label="Artist Name" {...artist} />
            <Input
              id="comment"
              label="Lyrics / Description"
              textarea={4}
              {...comment}
            />
          </div>
        )
      case 1:
        return (
          <FileUpload accept="image/*" setFile={setImage}>
            <Button text="Upload cover" />
          </FileUpload>
        )
      case 2:
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
        <h2>Add new track</h2>
        <StepsWrapper activeStep={activeStep} />
        {renderStep()}
        <div className={styles.actions}>
          <Button text="Back" onClick={goBack} disabled={activeStep === 0} />
          <Button
            text={activeStep === 2 ? '✓ Create track' : 'Next →'}
            onClick={goForward}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Create

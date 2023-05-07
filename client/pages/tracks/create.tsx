import Button from '@/components/Button/Button'
import StepsWrapper from '@/components/StepsWrapper/StepsWrapper'
import TrackInfo from '@/components/TrackInfo/TrackInfo'
import Layout from '@/layouts/Layout'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import FileUpload from '@/components/FileUpload/FileUpload'

const Create = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [image, setImage] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)

  const goBack = () => setActiveStep(activeStep - 1)
  const goForward = () => setActiveStep(activeStep + 1)

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <TrackInfo />
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
          <Button text="Next" onClick={goForward} disabled={activeStep === 3} />
        </div>
      </div>
    </Layout>
  )
}

export default Create

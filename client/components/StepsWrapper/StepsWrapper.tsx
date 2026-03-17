import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

interface IStepsWrapper {
  activeStep: number
}

const steps = ['Track info', 'Cover upload', 'Track upload']

const StepsWrapper: React.FC<IStepsWrapper> = ({ activeStep }) => {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        background: 'transparent',
        '& .MuiStepIcon-root': { color: '#2a2a2a' },
        '& .MuiStepIcon-root.Mui-active': { color: '#1db954' },
        '& .MuiStepIcon-root.Mui-completed': { color: '#1db954' },
        '& .MuiStepLabel-label': { color: '#b3b3b3', fontSize: '13px' },
        '& .MuiStepLabel-label.Mui-active': {
          color: '#ffffff',
          fontWeight: 600,
        },
        '& .MuiStepLabel-label.Mui-completed': { color: '#1db954' },
        '& .MuiStepConnector-line': { borderColor: '#2a2a2a' },
      }}
    >
      {steps.map((step, index) => (
        <Step key={index} completed={activeStep > index}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default StepsWrapper

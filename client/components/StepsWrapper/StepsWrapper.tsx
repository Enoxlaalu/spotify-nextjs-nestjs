import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

interface IStepsWrapper {
  activeStep: number
  //   children: React.ReactNode
}

const steps = ['Track info', 'Cover upload', 'Track upload']

const StepsWrapper: React.FC<IStepsWrapper> = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => {
        return (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default StepsWrapper

import styles from './Stepper.module.scss';
import React from 'react';
import cn from 'classnames';

interface StepperProps {
  currentStep: number;
  numbersOfStep: number;
}

const Stepper = ({ currentStep, numbersOfStep }: StepperProps) => {
  const activeColor = (index: number) => (currentStep >= index ? true : false);
  const isFinalStep = (index: number) => index === numbersOfStep - 1;

  return (
    <div className={styles.stepper}>
      {Array.from({ length: numbersOfStep }).map((valueIgnored, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(styles.stepper__circle, {
              [styles['stepper__circle--active']]: activeColor(index),
            })}
          >
            {index + 1}
          </div>
          {isFinalStep(index) ? null : (
            <span
              className={cn(styles.stepper__line, {
                [styles['stepper__line--active']]: activeColor(index),
              })}
            ></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;

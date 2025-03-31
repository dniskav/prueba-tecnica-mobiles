import React from 'react'
import styles from './Specs.module.css'

interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

interface SpecsProps {
  specs: ProductSpecs
  className?: string
}

export const Specs: React.FC<SpecsProps> = ({ specs, className = '' }) => {
  const specEntries = Object.entries(specs)

  const specLabels: Record<string, string> = {
    screen: 'SCREEN',
    resolution: 'RESOLUTION',
    processor: 'PROCESSOR',
    mainCamera: 'MAIN CAMERA',
    selfieCamera: 'SELFIE CAMERA',
    battery: 'BATTERY',
    os: 'OS',
    screenRefreshRate: 'SCREEN REFRESH RATE'
  }

  return (
    <div className={`${styles.specs} ${className}`}>
      <h2 className={styles.title}>SPECIFICATIONS</h2>
      <div className={styles.specsTable}>
        {specEntries.map(([key, value]) => (
          <React.Fragment key={key}>
            <div className={styles.specLabel}>{specLabels[key] || key.toUpperCase()}</div>
            <div className={styles.specValue}>{value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

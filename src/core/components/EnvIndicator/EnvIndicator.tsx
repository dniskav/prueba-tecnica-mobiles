import { environment } from '../../infrastructure/environment'
import styles from './envIndicator.module.css'

export function EnvIndicator() {
  // Solo mostrar en entorno de desarrollo
  if (environment.isProduction) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.badge}>{environment.mode.toUpperCase()}</div>
    </div>
  )
}

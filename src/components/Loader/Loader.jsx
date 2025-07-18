import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.css'
function Loader() {
  return (
    <div className={styles.loaderContainer}>

        <CircularProgress/> <span>Loading</span>
      
    </div>
  )
}

export default Loader

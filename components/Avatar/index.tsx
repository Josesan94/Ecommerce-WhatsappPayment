import React from "react"
import styles from './styles.module.css'

const Avatar = ({alt, src}) => {
  return (
  <div className={styles.container} >
      <img className={styles.avatar} alt={alt} src={src}/>
  </div>)
}

export default Avatar

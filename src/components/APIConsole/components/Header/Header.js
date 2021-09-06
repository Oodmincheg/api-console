import React from 'react'
import AccountInfo from './components/AccountInfo'
import Logout from './components/Logout'
import FullScreenToggler from './components/FullScreenToggler'
import styles from './Header.module.css'

export default function Header() {
    return (
        <div className={styles.header}>
            <p>Logo API-консолька</p>
            <AccountInfo />
            <Logout />
            <FullScreenToggler />
        </div>
    )
}

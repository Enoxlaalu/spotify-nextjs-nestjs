import React from "react"
import styles from "./styles.module.css"
import Layout from "@/layouts/Layout"

const Index = () => {
    return (
        <Layout>
            <div className={styles.body}>
                <h1>Welcome!</h1>
                <h3>
                    This this the collection of the best track in the whole
                    world!
                </h3>
            </div>
        </Layout>
    )
}

export default Index

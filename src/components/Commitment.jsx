import React from 'react'

const Commitment = () => {
  return (
    <div>


        <div className={styles.commitmentSection}>
        <div className={styles.commitmentContent}>
          <h3 className={styles.commitmentTitle}>Our Unwavering Commitment</h3>
          <p className={styles.commitmentText}>
            These values are not just words on a page—they are the living principles that guide 
            every decision, every partnership, and every product we create. They represent our 
            promise to our stakeholders and our pledge to future generations.
          </p>
          <div className={styles.signatureBadge}>
            <span>Seven Sisters Trade & Distilleries</span>
            <div className={styles.badgeGlow}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commitment
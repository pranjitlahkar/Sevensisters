'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { directors } from '@/data/directors';
import styles from './directorpage.module.css'


export default function DirectorsPage() {
  const router = useRouter();

  return (
    <section className={styles.directorsSection}>
      <div className={styles.headerWrap}>
        <h2 className={styles.title}>Board of Directors</h2>
        <p className={styles.subtitle}>
          Meet the visionaries shaping the future of our company
        </p>
      </div>

      <div className={styles.directorsGrid}>
        {directors.map((director) => (
          <div key={director.slug} className={styles.directorCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={director.image}
                alt={director.name}
                width={300}
                height={400}
                className={styles.directorImage}
              />
            </div>

            <div className={styles.infoWrapper}>
              <h3 className={styles.directorName}>{director.name}</h3>
              <p className={styles.position}>{director.position}</p>
              <p className={styles.education}>{director.education}</p>

              <button
                className={styles.readMoreBtn}
                onClick={() => router.push(`/directors/${director.slug}`)}
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

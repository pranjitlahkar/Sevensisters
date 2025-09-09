'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { managers } from '@/data/managers';
import styles from '@/css/managerialsection.module.css';


export default function ManagerialSection() {
  const router = useRouter();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Our Management</h2>
        <p className={styles.subtitle}>
          Meet the leaders shaping the future of our distillery
        </p>
      </div>

      <div className={styles.grid}>
        {managers.map((manager) => (
          <div key={manager.slug} className={styles.card}>
            {/* Manager Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={manager.image}
                alt={manager.name}
                width={300}
                height={400}
                className={styles.image}
                priority={false}
              />
            </div>

            {/* Info */}
            <div className={styles.info}>
              <h3 className={styles.name}>{manager.name}</h3>
              <p className={styles.position}>{manager.position}</p>
              <p className={styles.education}>{manager.education}</p>

              <button
                className={styles.readMoreBtn}
                onClick={() => router.push(`/managerial/${manager.slug}`)}
                aria-label={`Read more about ${manager.name}`}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { directors } from '@/data/directors';
import styles from './board.module.css';

export default function DirectorDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const director = directors.find((d) => d.slug === slug);

  if (!director) {
    return <p>Director not found.</p>;
  }

  return (
    <div className={styles.directorNote}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.push('/directors')}>
        ← Back to Directors
      </button>

      {/* Director Profile */}
      <div className={styles.directorProfile}>
        <div className={styles.imageContainer}>
          <Image
            src={director.image}
            alt={director.name}
            width={300}
            height={400}
            className={styles.directorImage}
          />
        </div>

        <div className={styles.profileInfo}>
          <h1 className={styles.directorName}>{director.name}</h1>
          <p className={styles.position}>{director.position}</p>
          <p className={styles.education}>{director.education}</p>
          <p className={styles.awards}>{director.awards}</p>
        </div>
      </div>

      {/* Director's Note */}
      <section className={styles.noteSection}>
        <h2>Director’s Message</h2>
        {director.note.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <div className={styles.signature}>
          <p>{director.signature}</p>
          <p>{director.position}</p>
          <p>{director.date}</p>
        </div>
      </section>

      {/* Achievements */}
      <section className={styles.achievements}>
        <h3>Key Achievements</h3>
        <ul>
          {director.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      {/* Vision */}
      <section className={styles.vision}>
        <h3>Vision Statement</h3>
        <p>{director.vision}</p>
      </section>
    </div>
  );
}

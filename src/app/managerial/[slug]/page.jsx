import Image from 'next/image';
import { managers } from '@/data/managers';
import styles from './managerdetails.module.css';

export default function ManagerDetail({ params }) {
  const manager = managers.find((m) => m.slug === params.slug);

  if (!manager) {
    return <div className={styles.notFound}>Manager not found</div>;
  }

  return (
    <section className={styles.detailSection}>
      <div className={styles.detailWrapper}>
        <Image
          src={manager.image}
          alt={manager.name}
          width={400}
          height={500}
          className={styles.detailImage}
        />
        <div className={styles.detailInfo}>
          <h2 className={styles.detailName}>{manager.name}</h2>
          <p className={styles.detailPosition}>{manager.position}</p>
          <p className={styles.detailEducation}>{manager.education}</p>
          <p className={styles.detailBio}>{manager.bio}</p>
          <blockquote className={styles.detailNote}>
            “{manager.note}”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

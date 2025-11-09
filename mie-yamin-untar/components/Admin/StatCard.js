import React from 'react';
import styles from '../../styles/Admin.module.css';

export default function StatCard({ title, value, percentage }) {
  return (
    <div className={styles.statCard}>
      <h3>{title}</h3>
      <div className={styles.value}>{value}</div>
      {percentage && (
        <div className={styles.percentage}>
          {percentage}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Button, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Default Button</Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}

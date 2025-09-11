import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              <span className={styles.heroTitleAccent}></span>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroButtons}>
              <Link
                className={styles.primaryButton}
                to="/docs/intro">
                <span>Getting Started Now</span>
                <span className={styles.buttonIcon}>🚀</span>
              </Link>
              <Link
                className={styles.secondaryButton}
                to="https://github.com/ChenReuven/cyberark-ai-spec-os">
                <span>View on GitHub</span>
                <span className={styles.buttonIcon}>↗</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={styles.cardContent} style={{ textAlign: 'center' }}>
                <div className={styles.codeLine}>
                  <span className={styles.codeVariable}>Build Smarter</span>
                  <span className={styles.codeKeyword}> Not Harder</span>
                </div>
                <div className={styles.codeLine} style={{ textAlign: 'center' }}>
                  <span className={styles.codeOperator}><br /></span>
                  <span className={styles.codeString}>'AI Spec OS'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gradientOrb}></div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Build smarter, high-quality software with AI`}
      description="Transform AI coding agents from confused interns into productive developers with Spec-Driven Development. Build your way, not their way.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to revolutionize your development workflow?</h2>
              <p className={styles.ctaDescription}>
                Join the future of AI-powered development with CyberArk AI Spec OS
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  className={styles.ctaPrimaryButton}
                  to="/docs/intro">
                  Start Building Today
                </Link>
                <Link
                  className={styles.ctaSecondaryButton}
                  to="https://github.com/ChenReuven/cyberark-ai-spec-os">
                  Explore on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

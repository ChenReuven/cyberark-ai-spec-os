import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  icon: string;
  gradient: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Spec-Driven Development',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        An effort to allow organizations to focus on product scenarios rather than 
        writing undifferentiated code with the help of Spec-Driven Development.
      </>
    ),
    icon: '📋',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Build Your Way, Not Their Way',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        A system to make AI coding agents build your way, not their way. 
        CyberArk Agentic Spec Driven Development transforms AI coding agents from confused interns into productive developers.
      </>
    ),
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    title: 'Quality Code on First Try',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        With structured workflows that capture your standards, your stack, and the unique 
        details of your codebase, CyberArk Agentic Spec Driven Development gives your agents the specs they need to ship 
        quality code on the first try—not the fifth.
      </>
    ),
    icon: '✨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

function Feature({title, Svg, description, icon, gradient}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} style={{ background: gradient }}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureSvg}>
          <Svg role="img" />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Why Use CyberArk Agentic Spec Driven Development?</h2>
          <p className={styles.featuresSubtitle}>
            Transform your development workflow with AI-powered tools that understand your needs
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

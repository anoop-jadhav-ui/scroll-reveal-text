import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Paragraph.module.css';

const Paragraph = ({ value }: { value: string }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = value.split(' ');

  return (
    <p ref={elementRef} className={styles.paragraph}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={index}
            range={[start, end]}
            progress={scrollYProgress}
            value={word}
          />
        );
      })}
    </p>
  );
};

const Word = ({
  value,
  range,
  progress,
}: {
  value: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={styles.word}>
      <span className={styles.shadow}>{value}</span>
      <motion.span
        style={{
          opacity,
        }}
      >
        {value}
      </motion.span>
    </span>
  );
};

export default Paragraph;

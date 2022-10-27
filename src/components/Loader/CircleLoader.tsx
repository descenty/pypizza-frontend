import styles from "./CircleLoader.module.css";

interface ICircleLoaderProps {
    isLoading: boolean;
}

const CircleLoader = ({isLoading}: ICircleLoaderProps) => {
  return (
    <section className={`${styles.back} ${isLoading ? styles.opened : styles.closed}`}>
      <div className={styles.ldsring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </section>
  );
};

export default CircleLoader;

import styles from "./Advertisments.module.css";

const Advertisments = () => {
  return (
    <section className={styles.advertisments}>
      <div>
        <img src="cupcake.png" alt="cupcake" />
        <div>
          <h3>All deserts</h3>
          <h1>20% OFF</h1>
          <span>Deserts</span>
        </div>
      </div>
      <div className={styles.orange}>
        <img src="burger.png" alt="burger" />
        <div>
          <h3>Big burgers</h3>
          <h1>50% OFF</h1>
          <span>Burgers</span>
        </div>
      </div>
    </section>
  );
};

export default Advertisments;

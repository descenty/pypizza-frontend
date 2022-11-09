import styles from "./Advertisments.module.css";

const Advertisments = () => {
  return (
    <section className={styles.advertisments}>
      <img src="coffee.webp" alt="" />
      <img src="snacks.webp" alt="" />
      <img src="rolls.webp" alt="" />
      {/* <div>
        <img src="cupcake.png" alt="cupcake" />
        <div>
          <h3>Скидка 10% по промокоду</h3>
          <h1>МИРЭА</h1>
          <span>Акция действует до 25.12.2022</span>
        </div>
      </div>
      <div className={styles.orange}>
        <img src="burger.png" alt="burger" />
        <div>
          <h3>Big burgers</h3>
          <h1>50% OFF</h1>
          <span>Burgers</span>
        </div>
      </div> */}
    </section>
  );
};

export default Advertisments;

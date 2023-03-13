import notFoundImage from "../../shared/images/404.jpg";
import styles from "./styles.module.scss";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <img
        className={styles.notFound__image}
        src={notFoundImage}
        alt="Not found page"
      />
    </div>
  );
}

export default NotFound;

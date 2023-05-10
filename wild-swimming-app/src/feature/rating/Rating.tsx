import { useEffect } from "react";
import styles from "./rating.module.css";
import { useRequest } from "../../hooks/useRequest";

import { ReactComponent as DropIcon } from "../../svgs/raindrop.svg";

const Rating = (id: any) => {
  const { sendRequest, isLoading, isError, errorMsg } = useRequest();

  // useEffect(() => {
  //   const res = (data: any) => {
  //     console.log(data);
  //   };

  //   sendRequest(
  //     "GET",
  //     `https://splash-wild-swimming-be.onrender.com/api/ratings/${id.id}`,
  //     res
  //   );
  // }, []);

  return (
    <div>
      {isLoading && !isError && <span>Loading...</span>}
      {isError && <span>{errorMsg}</span>}

      <div className={styles.rating_list}>
        <DropIcon className={styles.droplet} />

        <DropIcon className={styles.droplet} />
        <DropIcon className={styles.droplet} />
        <DropIcon className={styles.droplet} />
        <DropIcon className={styles.droplet} />
      </div>
    </div>
  );
};

export default Rating;

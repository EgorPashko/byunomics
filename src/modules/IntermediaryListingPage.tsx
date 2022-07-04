import Button from "components/common/Button";
import { api } from "components/Form/api";
import queryClient from "lib/api/queryClient";
import useRequest from "lib/hooks/useRequest";
import { useCallback } from "react";
import { useNavigation } from "routes/useNavigation";

import styles from "./styles.module.css";

const IntermediaryListingPage = () => {
  const { goToCreateIntermediary, goToEditIntermediary } = useNavigation();
  const intermediaries =
    useRequest(["intermediaries"], () => api.getIntermediaries(), {
      suspense: true,
    }) || [];
  const remove = useCallback(async (id = "") => {
    await api.removeIntermediary(id);
    await queryClient.refetchQueries(["intermediaries"]);
  }, []);

  // TODO: Create normal table :) and extract it to base components.
  return (
    <div className={styles.layout}>
      <Button className={styles.buttons} htmlType="button" type="primary" onClick={goToCreateIntermediary}>
        Create new Intermediary
      </Button>
      {intermediaries.length === 0 ? (
        <>No Rows</>
      ) : (
        <div className={styles.listing}>
          <div>Created At</div>
          <div>Name</div>
          <div>Order</div>
          <div> </div>
        </div>
      )}
      {intermediaries?.map((x) => (
        <div key={x.id} className={styles.listing}>
          <div>{x.createdAt}</div>
          <div>{x.name}</div>
          <div>{x.order}</div>
          <div className={styles.buttons}>
            <Button htmlType="button" type="primary" onClick={() => goToEditIntermediary(x.id)}>
              Edit
            </Button>
            <Button htmlType="button" type="primary" onClick={() => remove(x.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntermediaryListingPage;

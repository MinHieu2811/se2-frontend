import React from "react";
import Layout from "../ui-component/shared/Layout";
import Helmet from "../ui-component/shared/Helmet";
import { REMOVE_ALL_AND_ADD } from "../ui-component/toast";
import { useToastContext } from "../ui-component/toast/ToastContext";
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const { toastDispatch } = useToastContext()
  const [keyword, setLocalStorageData] = useLocalStorage<string>("string", "abc")

  const handleChange = (e: any) => {
    setLocalStorageData(e.target.value as string)
  }
  return (
    <Layout>
      <>
        <Helmet title="Home" />
        <div className="container height-full">
          <button onClick={() => toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
              type: 'is-danger',
              content: `Please login!`
            }
          })} style={{marginTop: '100px'}}>Toast</button>
          <input type="text" onClick={handleChange} />
          <p>{keyword}</p>
        </div>
      </>
    </Layout>
  );
};

export default Home;

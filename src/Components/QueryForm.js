import React, { useEffect, useState } from "react";
import TextInput from "./Common/TextInput";
import TransactionList from "./TransactionList.js";

function QueryForm(props) {
  const [blockNum, setblockNum] = useState("");
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputError, setInputError] = useState({});
  const [trans, setTrans] = useState({});

  useEffect(() => {
    if (loading === true) {
      setTrans({});
      setErrorMsg("");
      setInputError({});
    }
  }, [loading]);

  function handleChange(jsevent) {
    if (jsevent.target.name === "blockNum") {
      setblockNum(jsevent.target.value.trim());
    }
    if (jsevent.target.name === "addr") {
      setAddr(jsevent.target.value.trim());
    }
    setErrorMsg("");
  }

  function formIsValid() {
    const _error = {};

    if (blockNum.length === 0 || !/^[0-9\b]+$/.test(blockNum)) {
      _error.blockNum = "Block Number should be positive number";
    }
    if (addr.length === 0 || !/^0x[0-9a-f]+$/.test(addr.toLowerCase())) {
      _error.addr = "Address should be hex number start with 0x";
    }
    setInputError(_error);
    return Object.keys(_error).length === 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setLoading(true);

    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    fetch(
      `http://localhost:7777/api/blocknum/${blockNum}/address/${addr}`,
      requestOptions
    )
      .then(async (response) => {
        if (!response.ok) {
          setErrorMsg("Please Check Your Input.");
          setTrans({});
        } else {
          let data = await response.json();
          if (data.length === 0) {
            setErrorMsg("Oops.... No transactions are found.");
          }
          setTrans(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Oops.... network request failed.");
        console.error("There was an network error!", error);
        setLoading(false);
      });
  }
  return (
    <>
      <div className="container">
        <div className="row row-centered">
          <div className="col-md-6 col-centered">
            <form onSubmit={handleSubmit}>
              <fieldset disabled={loading}>
                <TextInput
                  id="blockNum"
                  name="blockNum"
                  onChange={handleChange}
                  value={blockNum}
                  error={inputError.blockNum}
                  uiDisplay="Block Number"
                />
                <TextInput
                  id="addr"
                  name="addr"
                  onChange={handleChange}
                  value={addr}
                  error={inputError.addr}
                  uiDisplay="Address"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {loading ? "Loading..." : "Search"}
                </button>
              </fieldset>
            </form>
            <b>{errorMsg}</b>
          </div>
        </div>
      </div>
      <h2 className="d-inline ml-3">Transaction Detail</h2>
      <h4 className="d-inline ml-3">
        {trans.length > 0 ? `Total of ${trans.length} record(s)` : ``}
      </h4>
      <div className="ml-3">
        <TransactionList transactions={trans} />
      </div>
    </>
  );
}

export default QueryForm;

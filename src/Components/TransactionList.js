import React from "react";
import Table from "react-bootstrap/Table";

function TransactionList(props) {
  return (
    <>
      <Table striped bordered hover size="sm" className="table">
        <thead>
          <tr>
            <th>Block Hash</th>
            <th>Block Number</th>
            <th>Gas</th>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.length>0 && props.transactions.map((item) => {
            return (
              <tr key={item.hash}>
                <td>{item.blockNumber}</td>
                <td>
                {item.blockHash}
                </td>
                <td>{item.gas}</td>
                <td>{item.hash}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TransactionList;

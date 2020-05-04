import React from "react";
import PropTypes from "prop-types";

function formatDate(date) {
  let formattedDate = new Date(date);
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  let monthIndex = formattedDate.getMonth();
  let year = formattedDate.getFullYear();
  return ' ' + monthNames[monthIndex] + ' ' + year;
}

function getDateSuperScript(dateString){
  let date =  new Date(dateString).getDate();
  if(date === 1){
    return 'st'
  }
  if(date === 2){
    return 'nd'
  }
  return 'th'
}

export default function TransactionRow(props) {
  let amountId = 'credit-amount';
  if (props.transaction.type.toUpperCase() === 'DEBIT') {
    amountId = 'debit-amount'
  }

  return( <tr className={"z-depth-1"}>
        <td className="border" id={"date"}>{new Date(props.transaction.date).getDate()}<sup>{getDateSuperScript(props.transaction.date)}</sup> {formatDate(props.transaction.date)}</td>
    <td className="border" id={"type"}>{props.transaction.type}</td>
    <td className="border" id={amountId}>{props.transaction.amount}</td>
    <td className="border" id={"remarks"}>{props.transaction.remarks}</td>
  </tr>
  );
}

TransactionRow.propTypes = {
  transactions: PropTypes.array
};




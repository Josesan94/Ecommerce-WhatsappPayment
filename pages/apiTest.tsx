import React from 'react'

export default function ApiTest({userName}){
  return (
    <div>API info: {userName}</div>
  )
}

ApiTest.getInitialProps = () => {
    return {userName: "jose"}
    // return fetch('http://localhost:3000/api/hello')
    //         .then(res => res.json)
    //         .then(response => {
    //             console.log(response)
    //             return response;
    //         })
}
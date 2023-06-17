import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "..";

import { format, formatISO, formatISO9075 } from "date-fns";
import extractToken from "../utils/GetToken";


const ViewFull = () => {
  const { id } = useParams();

  const [data, setData] = useState("");

  useEffect(() => {
    if (id && extractToken())
      axios(`${server}/readpost/${id}`, {
        method: "GET",
      }).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, [id]);
  return (
    <>
      <div className="p-5">
        {data ? (
          <div className="border-2">
            <h1>{data?.title}</h1>
            <p>{data?.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            <p>{format(new Date (data?.createdAt),'d MMM, yyyy h:mm')}</p>
          </div>
        ) : (
          <p className="text-white text-3xl">Loading...</p>
        )}
      </div>
    </>
  );
};

export default ViewFull;

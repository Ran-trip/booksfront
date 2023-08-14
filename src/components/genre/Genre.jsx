import React from "react";
import { useParams } from "react-router-dom";

const Genre = () => {
  const { id } = useParams();

  return <div>Genre {id}</div>;
};

export default Genre;

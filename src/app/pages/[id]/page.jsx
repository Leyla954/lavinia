"use client";
import { useParams } from "next/navigation";
import Detail from "@/app/components/_detail/Detail";

const DetailPage = () => {
  const { id } = useParams();
  console.log("Current Product ID:", id);

  return <Detail id={id} />;
};

export default DetailPage;

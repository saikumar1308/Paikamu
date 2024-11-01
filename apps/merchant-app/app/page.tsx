"use client"
import {useBalance} from "@repo/store/useBalance";

export default function Home() {
  const balance = useBalance();
  return (
    <div>
      My balance is : {balance}
    </div>
  );
}

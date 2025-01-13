"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Comic: React.FC = () => {
  return (
    <Link
      href={"https://www.hs.fi/sarjakuvat/fokit/"}
      className="flex flex-col justify-center items-center w-screen"
    >
      <div>
        <Image
          alt="Fok it"
          src={
            "https://images.sanoma-sndp.fi/dd24e58b55e2495aca29cb2dcbc56c58/normal/1920.jpg"
          }
          height={200}
          width={567}
        />
        <div className="flex justify-between">
          <span>Fok_It</span>
          <span>©Joonas Rinta-Kanto</span>
        </div>
      </div>
    </Link>
  );
};

export default Comic;

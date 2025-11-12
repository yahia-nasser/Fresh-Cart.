import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="mx-auto flex justify-center items-center h-screen">
      <Image src="/assets/404.jpg" alt="Not Found" width={800} height={800} />
    </div>
  );
};

export default NotFound;

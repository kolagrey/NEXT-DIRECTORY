"use client";

import Image from "next/image";
import Link from "next/link";

export default function BuyMeCoffeeButton() {
  return (
    <div className="flex flex-col md:items-end">
      <Link
        href="https://www.buymeacoffee.com/kolagrey"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/bmc-button.png"
          width={200}
          height={60}
          alt="Buy me a coffee"
        />
        <span className="sr-only">Buy me a coffee</span>
      </Link>
    </div>
  );
}

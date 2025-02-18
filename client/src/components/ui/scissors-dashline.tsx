import { ScissorsIcon } from "lucide-react";

const ScissorsDashLine = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <ScissorsIcon className="w-24 text-black" />

      <img
        className="-ml-10"
        width={200}
        height={200}
        src="https://static.thenounproject.com/png/1729059-200.png"
        alt=""
      />
      <img
        width={200}
        height={200}
        className="-ml-4"
        src="https://static.thenounproject.com/png/1729059-200.png"
        alt=""
      />
      <img
        width={200}
        height={200}
        className="-ml-4"
        src="https://static.thenounproject.com/png/1729059-200.png"
        alt=""
      />
      <img
        width={200}
        height={200}
        className="-ml-4"
        src="https://static.thenounproject.com/png/1729059-200.png"
        alt=""
      />
    </div>
  );
};

export default ScissorsDashLine;
import { useNavigate } from "@remix-run/react";
import { FC } from "react";

interface ButtonProps {
  name: string;
  clickURL: string;
}

const Button: FC<ButtonProps> = ({ name, clickURL }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-80 h-36 bg-biceblue border-charcoal border-8 text-honeydew text-4xl rounded-lg px-4 py-2"
      onClick={() => {
        navigate(clickURL);
      }}
    >
      {name}
    </button>
  );
};

export default Button;

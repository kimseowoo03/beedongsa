import { Provider } from "jotai";

interface JotaiConfigsProps {
  children: React.ReactNode;
}

export default function JotaiConfigs({ children }: JotaiConfigsProps) {
  return <Provider>{children}</Provider>;
}

import { Navigate } from "react-router-dom";

type Props = {};

export default function RedirectRoute({}: Props) {
  return <Navigate to="/" />;
}

import { createRoot } from "react-dom/client";
import { Router } from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.querySelector("#root")).render(<Router />);

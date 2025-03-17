import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LoadingSpinner = ({ size = 24, color = "currentColor", }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "spinner", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", opacity: "0.25" }), _jsx("path", { d: "M12 2a10 10 0 0 1 10 10" })] }));
export default LoadingSpinner;

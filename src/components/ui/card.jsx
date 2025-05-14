export function Card({ children, ...props }) {
    return <div className="border rounded shadow p-4" {...props}>{children}</div>;
}
export function CardContent({ children, ...props }) {
    return <div {...props}>{children}</div>;
}

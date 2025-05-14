import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, ...props }: CardProps) {
    return <div {...props}>{children}</div>;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardContent({ children, ...props }: CardContentProps) {
    return <div {...props}>{children}</div>;
}

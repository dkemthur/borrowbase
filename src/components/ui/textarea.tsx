import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TextareaProps) {
    return <textarea {...props} />;
}

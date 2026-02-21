'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ClientForm({
    action,
    successMessage = "Saved successfully!",
    errorMessage = "An error occurred",
    children,
    resetOnSuccess = false,
    style,
    className,
    ...props
}) {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    async function handleAction(formData) {
        setLoading(true);
        const toastId = toast.loading('Saving...');

        try {
            const res = await action(formData);

            if (res?.error) {
                toast.error(res.error, { id: toastId });
            } else {
                toast.success(successMessage, { id: toastId });
                if (resetOnSuccess && formRef.current) {
                    formRef.current.reset();
                }
            }
        } catch (error) {
            // Next.js redirects throw an error internally. We must re-throw it so the redirect works!
            if (error.message && error.message.includes('NEXT_REDIRECT')) {
                toast.dismiss(toastId);
                toast.success(successMessage); // Show success before redirecting
                throw error;
            }
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form ref={formRef} action={handleAction} style={style} className={className} {...props}>
            {typeof children === 'function' ? children({ loading }) : children}
        </form>
    );
}

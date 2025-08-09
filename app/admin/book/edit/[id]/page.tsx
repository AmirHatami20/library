'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import BookForm from '@/components/admin/BookForm';

export default function EditBookPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    return <BookForm bookId={id}/>;
}

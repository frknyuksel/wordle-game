import React from 'react';
import Link from 'next/link';
import '../public/style.css'

export default function App() {
    return (
        <div className='container'>
            <h1>Wordle</h1>
            <Link href="/en">
                <div>Go to English Wordle</div>
            </Link>
            <br />
            <Link href="/tr">
                <div>Türkçe Kelime Oyunu</div>
            </Link>
        </div>
    );
}

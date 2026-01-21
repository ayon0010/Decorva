import { Lora, Rubik } from 'next/font/google';

// Configure the font
export const rubik = Rubik({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    variable: '--font-rubik',
    display: 'swap',
});


export const lora = Lora({
    subsets: ['latin', 'latin-ext', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-lora',
    display: 'swap',
});
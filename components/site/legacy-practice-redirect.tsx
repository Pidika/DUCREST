'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import data from '@/lib/content.json';
export function LegacyPracticeRedirect(){const router=useRouter();useEffect(()=>{const slug=window.location.hash.slice(1);router.replace(data.services.some(s=>s.id===slug)?`/practice-areas/${slug}/`:'/practice-areas/')},[router]);return null}

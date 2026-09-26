'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Entrance({children,className=''}:{children:ReactNode;className?:string}) {
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={false} animate={{y:0}} whileInView={reduced?undefined:{y:[12,0]}} viewport={{once:true,amount:0.1}} transition={{duration:0.55,ease:[0.22,1,0.36,1]}}>{children}</motion.div>;
}

'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Entrance({children,className=''}:{children:ReactNode;className?:string}) {
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={false} whileInView={reduced?undefined:{opacity:[.4,1],y:[35,0]}} viewport={{once:true,amount:0.15}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}}>{children}</motion.div>;
}

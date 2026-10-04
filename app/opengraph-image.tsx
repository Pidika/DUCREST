import {ImageResponse} from 'next/og';

export const alt='Ducrest Partners — Proven Expertise with Global Perspective';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function Image(){
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',background:'#351623',color:'#fff',padding:'74px 82px',position:'relative',fontFamily:'Georgia, serif'}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
        <div style={{display:'flex',alignItems:'center',gap:24}}><div style={{width:72,height:72,borderRadius:36,background:'#fff',color:'#641b2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:42}}>D</div><div style={{fontSize:36,letterSpacing:'0.02em'}}>DUCREST PARTNERS</div></div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}><div style={{fontSize:76,lineHeight:1}}>Proven Expertise</div><div style={{fontSize:68,lineHeight:1,color:'#ddc6a1',fontStyle:'italic'}}>with Global Perspective</div></div>
        <div style={{fontSize:22,color:'#d8cbd0',fontFamily:'Arial, sans-serif'}}>Intellectual Property · Technology · Commercial Law</div>
      </div>
      <div style={{position:'absolute',right:0,top:0,width:18,height:'100%',background:'#b79b68'}}/>
    </div>,size
  );
}

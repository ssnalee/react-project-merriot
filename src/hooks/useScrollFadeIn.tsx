import { useRef, useEffect, useCallback } from 'react';

// interface IFade{
//   direction : any;
//   duration : any;
//   delay : any;
// }
// 스크롤하면 페이드인 하는 애니메이션
const useScrollFadeIn = (direction:string, duration:number, delay:number)  => {
// 해당 컴포넌트 가져오기
const element = useRef()
// direction 선택
const hanldeDirection = (name : string) => {
	switch (name) {
    	case "up":
        	return "translate3d(0, 50%, 0)"
        case "down": return "tranlate3d(0, -50%, 0)"
        case "left": return "translate3d(50%, 0, 0)"
        case "right": return "translate3d(-50%, 0, 0)"
        default:
        return;
    }
}

// 설정해둔 컴포넌트를 만날때마다 함수가 재실행되도록 callback하기
const onScroll = useCallback(([entry]:any)=>{
	const { current } : any= element
    if(entry.isIntersecting) {
    	current.style.tansitionProperty = 'all'
        current.style.transitionDuration = `${duration}s`
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)"
        current.style.opacity = 1;
        current.style.tranform = "translate3d(0, 0, 0)"
    }
}, [delay, duration])

// intersection-observer로 컴포넌트 위치 observe하기
useEffect(()=>{
	let observer : any
    
    if(element.current) {
    	observer = new IntersectionObserver(onScroll, {threshold: 0.7})
        observer.observe(element.current)
        }
        
        return() => observer && observer.disconnect()
}, [onScroll])

return{ref: element, style: { opacity: 0, transform: hanldeDirection(direction) } }
}
export default useScrollFadeIn;

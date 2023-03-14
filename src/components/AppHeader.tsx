import { useEffect, useState } from "react";

type AppHeaderProps = {
    title: string,
    year?: number
}

function AppHeader({title, year}: AppHeaderProps) {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        console.log('use effect AppHeader ทำครั้งแรกและทุกครั้งที่ re-render');
    });

    useEffect(() => {
        console.log('use effect AppHeader 2 ทำครั้งแรกและครั้งเดียวเท่านั้น');
    }, [] );

    useEffect(() => {
        console.log('use effect AppHeader 3 ทำครั้งแรกและทำก็ต่อเมื่อ isShow อัปเดตค่าเท่านั้น');
    }, [isShow] );

    const mouseOver = () => {
        setIsShow(!isShow); // toggle
    }

    return (
        <> 
        <h1 onMouseOver={mouseOver}>{title} {year}</h1>
        {isShow && <p>Hello App Header</p>}
        </>
    );
}

export default AppHeader;
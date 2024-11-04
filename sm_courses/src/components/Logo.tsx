interface LogoProps {
    className?: String;
}

export function Logo({className}: LogoProps) {
    return (
        <img src="./src/assets/images/smCourses_logo.svg" alt="" className={`${className}`}/>
    )
}
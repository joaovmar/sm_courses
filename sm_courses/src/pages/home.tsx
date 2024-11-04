import { ContainerContentCourses, ContainerPrincipal } from "../components/Container"
import { CursoCard } from "../components/CursoCard"
import { Footer } from "../components/Footer"
import { Menu } from "../components/Menu"

const Home: React.FC = () => {

    return (
        <ContainerPrincipal className="bg-slate-800">
            <Menu />
            <ContainerContentCourses>
                <CursoCard />
            </ContainerContentCourses>
            <Footer />
        </ContainerPrincipal>
    )
}

export default Home
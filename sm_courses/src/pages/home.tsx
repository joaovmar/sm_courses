import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContentCourses, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// Componentes para setas personalizadas
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full hover:bg-blue-700"
        >
            <BsArrowLeft />
        </button>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-blue-500 bg-opacity-70 p-2 rounded-full hover:bg-blue-700"
        >
            <BsArrowRight />
        </button>
    );
};

const Home = () => {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get("http://localhost:8000/cursos/");
                setCursos(response.data);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        };
        fetchCursos();
    }, []);

    const handleView = (id) => {
        navigate(`/Curso/${id}`);
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000, // 7 segundos
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <ContainerPrincipal className="bg-slate-800">
            <Slider {...carouselSettings} className="carousel-container my-4 w-11/12 mx-auto">
                <div className="flex justify-center">
                    <img
                        src="./src/assets/images/1.svg"
                        alt="Bem-vindo"
                        className="w-[93%] h-[320px] object-cover"
                    />
                </div>
                <div className="flex justify-center">
                    <img
                        src="https://via.placeholder.com/1200x400.png?text=Aprenda+com+os+melhores+professores"
                        alt="Aprenda com os melhores"
                        className="w-[93%] h-[320px] object-cover"
                    />
                </div>
                <div className="flex justify-center">
                    <img
                        src="https://via.placeholder.com/1200x400.png?text=Certificados+personalizados"
                        alt="Certificados personalizados"
                        className="w-[93%] h-[320px] object-cover"
                    />
                </div>
            </Slider>

            <ContainerContentCourses>
                {cursos.map((curso) => (
                    <CursoCard
                        key={curso.id}
                        nome={curso.nome}
                        descricao={curso.descricao}
                        professor={curso.professor.nome}
                        onView={() => handleView(curso.id)}
                    />
                ))}
            </ContainerContentCourses>
        </ContainerPrincipal>
    );
};

export default Home;
